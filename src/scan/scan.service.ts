import { Injectable } from '@nestjs/common';
import * as os from 'node:os';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import si from 'systeminformation';

const execFileAsync = promisify(execFile);

type LocalPort = {
  proto: 'tcp' | 'udp';
  port: number;
  address?: string;
  pid?: number;
  process?: string;
  state?: string; 
};

@Injectable()
export class ScanService {
  async scanLocal() {
    const timestamp = new Date().toISOString();

    const [
      osInfo,
      system,
      cpu,
      mem,
      disks,
      graphics,
      netIfaces,
    ] = await Promise.all([
      si.osInfo(),
      si.system(),
      si.cpu(),
      si.mem(),
      si.fsSize(),
      si.graphics(),
      si.networkInterfaces(),
    ]);
    // console.log(timestamp);
    // console.log(osInfo);
    // console.log(system);
    // console.log(cpu);
    // console.log(mem);
    // console.log(disks);
    // console.log(graphics);
    // console.log(netIfaces);
    

    const adapters = netIfaces
      .filter((n) => !n.internal)
      .map((n) => ({
        name: n.iface,
        ip4: n.ip4,
        ip6: n.ip6,
        mac: n.mac,
        speed: n.speed,
        type: n.type,
      }));

    // ---- Local listening ports (on THIS machine only) ----
    const localPorts = await this.getLocalListeningPortsSafe();

    return {
      os: {
        name: osInfo.distro || osInfo.platform,
        version: osInfo.release,
        build: osInfo.build,
        arch: osInfo.arch,
        kernel: osInfo.kernel,
      },
      hardware: {
        system: {
          manufacturer: system.manufacturer,
          model: system.model,
          version: system.version,
        },
        cpu: {
          manufacturer: cpu.manufacturer,
          brand: cpu.brand,
          model: cpu.brand, // keep it simple
          cores: cpu.cores,
          physicalCores: cpu.physicalCores,
          speedGHz: Number(cpu.speed),
        },
        memory: {
          totalGB: Math.round((mem.total / 1024 / 1024 / 1024) * 10) / 10,
          freeGB: Math.round((mem.free / 1024 / 1024 / 1024) * 10) / 10,
        },
        disks: disks.map((d) => ({
          fs: d.fs,
          type: d.type,
          mount: d.mount,
          sizeGB: Math.round((d.size / 1024 / 1024 / 1024) * 10) / 10,
          usedGB: Math.round((d.used / 1024 / 1024 / 1024) * 10) / 10,
          usePercent: d.use,
        })),
        gpu: (graphics.controllers || []).map((g) => ({
          vendor: g.vendor,
          model: g.model,
          vramMB: g.vram,
        })),
      },
      network: {
        hostname: os.hostname(),
        platform: os.platform(),
        adapters,
      },
      localPorts, // LISTEN ports only
      notes: {
        scope: 'local-only',
        timestamp,
      },
    };
  }

  private async getLocalListeningPortsSafe(): Promise<LocalPort[]> {
    const platform = process.platform;

    try {
      if (platform === 'win32') {
        return await this.getPortsWindows();
      }
      if (platform === 'linux') {
        // Prefer ss if available
        const ports = await this.getPortsLinuxSs().catch(async () => this.getPortsUnixLsof());
        return ports;
      }
      // darwin (macOS) and others
      return await this.getPortsUnixLsof();
    } catch {
      // If command not available / permissions, don’t fail scan
      return [];
    }
  }

  // ---- Windows: netstat -ano ----
  private async getPortsWindows(): Promise<LocalPort[]> {
    const { stdout } = await execFileAsync('netstat', ['-ano'], { windowsHide: true, timeout: 8000 });
    const lines = stdout.split(/\r?\n/);

    const results: LocalPort[] = [];
    for (const line of lines) {
      // Example:
      // TCP    0.0.0.0:135      0.0.0.0:0      LISTENING       908
      // UDP    0.0.0.0:1900     *:*                            1234
      const trimmed = line.trim();
      if (!trimmed) continue;
      if (!/^TCP|^UDP/i.test(trimmed)) continue;

      const parts = trimmed.split(/\s+/);
      const proto = parts[0].toLowerCase() as 'tcp' | 'udp';
      const local = parts[1];
      const state = proto === 'tcp' ? parts[3] : undefined;
      const pidStr = proto === 'tcp' ? parts[4] : parts[3];

      // Only LISTENING for TCP. UDP has no LISTENING state; include UDP bound ports if you want.
      if (proto === 'tcp' && state !== 'LISTENING') continue;

      const { address, port } = this.splitHostPort(local);
      if (!port) continue;

      const pid = pidStr ? Number(pidStr) : undefined;

      results.push({
        proto,
        address,
        port,
        pid: Number.isFinite(pid) ? pid : undefined,
        state: state || (proto === 'udp' ? 'BOUND' : undefined),
      });
    }

    // De-dup
    return this.uniquePorts(results);
  }

  // ---- Linux: ss -lntuap ----
  private async getPortsLinuxSs(): Promise<LocalPort[]> {
    // -l listening, -n numeric, -t tcp, -u udp, -p process, -a all
    const { stdout } = await execFileAsync('ss', ['-lntuap'], { timeout: 8000 });
    const lines = stdout.split(/\r?\n/);

    // ss output differs; we parse best-effort
    // Example:
    // LISTEN 0 4096 0.0.0.0:22 0.0.0.0:* users:(("sshd",pid=123,fd=3))
    const results: LocalPort[] = [];
    for (const line of lines) {
      const t = line.trim();
      if (!t || t.startsWith('State')) continue;
      if (!t.startsWith('LISTEN') && !t.startsWith('UNCONN')) continue;

      const cols = t.split(/\s+/);
      // protocol is often in col[1] for some versions; but easiest: detect by presence of "tcp"/"udp" earlier
      // Some ss versions: State Recv-Q Send-Q Local Address:Port Peer Address:Port Process
      // Not always explicit proto; but we can infer:
      const isUdp = t.includes(' udp ') || cols.some((c) => c === 'udp');
      const proto: 'tcp' | 'udp' = isUdp ? 'udp' : 'tcp';

      // Find token that looks like "IP:PORT" for local address
      const localToken = cols.find((c) => c.includes(':') && (c.includes('.') || c.includes('[') || c.includes('*') || c.includes('::')));
      if (!localToken) continue;

      const { address, port } = this.splitHostPort(localToken);
      if (!port) continue;

      // Parse pid/process from users:(("name",pid=123,...
      let pid: number | undefined;
      let processName: string | undefined;

      const m = t.match(/users:\(\("([^"]+)",pid=(\d+)/);
      if (m) {
        processName = m[1];
        pid = Number(m[2]);
      }

      // Only include TCP LISTEN; UDP UNCONN is “bound”
      if (proto === 'tcp' && !t.startsWith('LISTEN')) continue;

      results.push({
        proto,
        address,
        port,
        pid: Number.isFinite(pid) ? pid : undefined,
        process: processName,
        state: t.startsWith('LISTEN') ? 'LISTEN' : 'BOUND',
      });
    }

    return this.uniquePorts(results);
  }

  // ---- macOS/Linux fallback: lsof ----
  private async getPortsUnixLsof(): Promise<LocalPort[]> {
    // -n no DNS, -P numeric ports, -i network, -sTCP:LISTEN only TCP listen
    // We'll also try UDP with -iUDP if needed.
    const tcp = await execFileAsync('lsof', ['-nP', '-iTCP', '-sTCP:LISTEN'], { timeout: 8000 }).catch(() => ({ stdout: '' as any }));
    const udp = await execFileAsync('lsof', ['-nP', '-iUDP'], { timeout: 8000 }).catch(() => ({ stdout: '' as any }));

    const results: LocalPort[] = [];
    results.push(...this.parseLsof(tcp.stdout, 'tcp', true));
    results.push(...this.parseLsof(udp.stdout, 'udp', false));

    return this.uniquePorts(results);
  }

  private parseLsof(stdout: string, proto: 'tcp' | 'udp', onlyListen: boolean): LocalPort[] {
    const lines = stdout.split(/\r?\n/).filter(Boolean);
    // Header:
    // COMMAND PID USER FD TYPE DEVICE SIZE/OFF NODE NAME
    // Example NAME:
    // TCP *:3000 (LISTEN)
    // UDP *:5353
    const out: LocalPort[] = [];
    for (const line of lines.slice(1)) {
      const parts = line.trim().split(/\s+/);
      if (parts.length < 9) continue;

      const command = parts[0];
      const pid = Number(parts[1]);
      const name = parts.slice(8).join(' ');

      if (onlyListen && !name.includes('(LISTEN)')) continue;

      // Extract *:3000 or 127.0.0.1:5432 etc
      const hpMatch = name.match(/([^\s]+):(\d+)/);
      if (!hpMatch) continue;

      const address = hpMatch[1].replace(/^\*$/, '0.0.0.0');
      const port = Number(hpMatch[2]);
      if (!Number.isFinite(port)) continue;

      out.push({
        proto,
        address,
        port,
        pid: Number.isFinite(pid) ? pid : undefined,
        process: command,
        state: proto === 'tcp' ? 'LISTEN' : 'BOUND',
      });
    }
    return out;
  }

  private splitHostPort(token: string): { address?: string; port?: number } {
    // Handles:
    // 0.0.0.0:22
    // [::]:80
    // *:1900
    // :::443
    let t = token.trim();

    // remove brackets for ipv6
    t = t.replace(/^\[|\]$/g, '');
    // if token contains spaces from ss, it can be "0.0.0.0:22" already ok

    // Special case: ":::443"
    if (t.startsWith(':::')) t = `::${t.slice(2)}`;

    const lastColon = t.lastIndexOf(':');
    if (lastColon <= 0) return { address: t };

    const address = t.slice(0, lastColon);
    const portStr = t.slice(lastColon + 1);
    const port = Number(portStr);

    return {
      address: address === '*' ? '0.0.0.0' : address,
      port: Number.isFinite(port) ? port : undefined,
    };
  }

  private uniquePorts(list: LocalPort[]): LocalPort[] {
    const seen = new Set<string>();
    const out: LocalPort[] = [];
    for (const p of list) {
      const key = `${p.proto}|${p.address ?? ''}|${p.port}|${p.pid ?? ''}`;
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(p);
    }
    // sort nicely
    out.sort((a, b) => (a.port - b.port) || a.proto.localeCompare(b.proto));
    return out;
  }
}
