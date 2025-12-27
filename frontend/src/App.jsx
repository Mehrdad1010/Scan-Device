import "./App.css";
import Header from "./components/Header/Header";
import { SystemProvider } from "./context/SystemProvider";

function App() {
  return (
    // <SystemProvider>
    <>
      <Header />

      <div className="grid">
        {/* <!-- Operating System --> */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon">OS</div>
            <h2 className="card-title">Operating System</h2>
          </div>
          <div className="info-row">
            <span className="label">Name</span>
            <span className="value highlight">Microsoft Windows 10 Home</span>
          </div>
          <div className="info-row">
            <span className="label">Version</span>
            <span className="value">10.0.19045</span>
          </div>
          <div className="info-row">
            <span className="label">Build</span>
            <span className="value">19045</span>
          </div>
          <div className="info-row">
            <span className="label">Architecture</span>
            <span className="value">x64</span>
          </div>
          <div className="info-row">
            <span className="label">Kernel</span>
            <span className="value">10.0.19045</span>
          </div>
        </div>

        {/* <!-- Hardware System --> */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon">HW</div>
            <h2 className="card-title">Hardware</h2>
          </div>
          <div className="info-row">
            <span className="label">Manufacturer</span>
            <span className="value highlight">Dell Inc.</span>
          </div>
          <div className="info-row">
            <span className="label">Model</span>
            <span className="value">Precision M6800</span>
          </div>
          <div className="info-row">
            <span className="label">Version</span>
            <span className="value">00</span>
          </div>
        </div>

        {/* <!-- CPU --> */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon">⚡</div>
            <h2 className="card-title">Processor</h2>
          </div>
          <div className="info-row">
            <span className="label">Brand</span>
            <span className="value highlight">Intel Core™ i7-4810MQ</span>
          </div>
          <div className="info-row">
            <span className="label">Manufacturer</span>
            <span className="value">Intel</span>
          </div>
          <div className="info-row">
            <span className="label">Cores (Logical)</span>
            <span className="value">8 cores</span>
          </div>
          <div className="info-row">
            <span className="label">Cores (Physical)</span>
            <span className="value">4 cores</span>
          </div>
          <div className="info-row">
            <span className="label">Speed</span>
            <span className="value">2.8 GHz</span>
          </div>
        </div>

        {/* <!-- Memory --> */}
        <div className="card">
          <div className="card-header">
            <div className="card-icon">💾</div>
            <h2 className="card-title">Memory</h2>
          </div>
          <div className="info-row">
            <span className="label">Total RAM</span>
            <span className="value highlight">15.9 GB</span>
          </div>
          <div className="info-row">
            <span className="label">Free RAM</span>
            <span className="value">8.3 GB</span>
          </div>
          <div className="info-row">
            <span className="label">Used RAM</span>
            <span className="value warning">7.6 GB (47.8%)</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "47.8%" }}></div>
          </div>
        </div>

        {/* <!-- Disks --> */}
        <div className="card section-wide">
          <div className="card-header">
            <div className="card-icon">💿</div>
            <h2 className="card-title">Storage Devices</h2>
          </div>

          <div className="disk-item">
            <div className="info-row">
              <span className="label">Drive</span>
              <span className="value highlight">C: (NTFS)</span>
            </div>
            <div className="info-row">
              <span className="label">Total Size</span>
              <span className="value">118.6 GB</span>
            </div>
            <div className="info-row">
              <span className="label">Used</span>
              <span className="value critical">107.9 GB (91.01%)</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "91.01%" }}></div>
            </div>
          </div>

          <div className="disk-item">
            <div className="info-row">
              <span className="label">Drive</span>
              <span className="value highlight">D: (NTFS)</span>
            </div>
            <div className="info-row">
              <span className="label">Total Size</span>
              <span className="value">698.6 GB</span>
            </div>
            <div className="info-row">
              <span className="label">Used</span>
              <span className="value">319.8 GB (45.78%)</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "45.78%" }}></div>
            </div>
          </div>
        </div>

        {/* <!-- GPU --> */}
        <div className="card section-wide">
          <div className="card-header">
            <div className="card-icon">🎮</div>
            <h2 className="card-title">Graphics Processing</h2>
          </div>

          <div className="gpu-item">
            <div className="info-row">
              <span className="label">Vendor</span>
              <span className="value highlight">Intel Corporation</span>
            </div>
            <div className="info-row">
              <span className="label">Model</span>
              <span className="value">Intel(R) HD Graphics 4600</span>
            </div>
            <div className="info-row">
              <span className="label">VRAM</span>
              <span className="value">1024 MB</span>
            </div>
          </div>

          <div className="gpu-item">
            <div className="info-row">
              <span className="label">Vendor</span>
              <span className="value highlight">NVIDIA</span>
            </div>
            <div className="info-row">
              <span className="label">Model</span>
              <span className="value">NVIDIA Quadro K3100M</span>
            </div>
            <div className="info-row">
              <span className="label">VRAM</span>
              <span className="value">4096 MB</span>
            </div>
          </div>
        </div>

        {/* <!-- Network --> */}
        <div className="card section-wide">
          <div className="card-header">
            <div className="card-icon">🌐</div>
            <h2 className="card-title">Network</h2>
          </div>
          <div className="info-row">
            <span className="label">Hostname</span>
            <span className="value highlight">DESKTOP-8HBSHF4</span>
          </div>
          <div className="info-row">
            <span className="label">Platform</span>
            <span className="value">win32</span>
          </div>

          <h3
            style={{
              marginTop: "25px",
              marginBottom: "15px",
              color: "#00f0ff",
              fontFamily: "Orbitron sansSerif",
              fontSize: "1rem",
            }}
          >
            Network Adapters
          </h3>

          <div className="adapter-item">
            <div className="info-row">
              <span className="label">Name</span>
              <span className="value highlight">Ethernet 2</span>
            </div>
            <div className="info-row">
              <span className="label">IPv4</span>
              <span className="value">192.168.56.1</span>
            </div>
            <div className="info-row">
              <span className="label">IPv6</span>
              <span className="value">fe80::a972:fc0d:1030:ad17</span>
            </div>
            <div className="info-row">
              <span className="label">MAC Address</span>
              <span className="value">0a:00:27:00:00:04</span>
            </div>
            <span className="badge">Speed: 1000 Mbps</span>
            <span className="badge">Type: wired</span>
          </div>

          <div className="adapter-item">
            <div className="info-row">
              <span className="label">Name</span>
              <span className="value highlight">Wi-Fi</span>
            </div>
            <div className="info-row">
              <span className="label">IPv4</span>
              <span className="value">192.168.199.87</span>
            </div>
            <div className="info-row">
              <span className="label">MAC Address</span>
              <span className="value">10:0b:a9:b7:fa:9c</span>
            </div>
            <span className="badge">Speed: 72 Mbps</span>
            <span className="badge">Type: wired</span>
          </div>

          <div className="adapter-item">
            <div className="info-row">
              <span className="label">Name</span>
              <span className="value highlight">vEthernet (WSL)</span>
            </div>
            <div className="info-row">
              <span className="label">IPv4</span>
              <span className="value">172.18.176.1</span>
            </div>
            <div className="info-row">
              <span className="label">IPv6</span>
              <span className="value">fe80::b400:dca9:8670:b201</span>
            </div>
            <div className="info-row">
              <span className="label">MAC Address</span>
              <span className="value">00:15:5d:e3:ad:44</span>
            </div>
            <span className="badge">Speed: 10000 Mbps</span>
            <span className="badge">Type: wired</span>
          </div>

          <div className="adapter-item">
            <div className="info-row">
              <span className="label">Name</span>
              <span className="value highlight">Ethernet</span>
            </div>
            <div className="info-row">
              <span className="label">MAC Address</span>
              <span className="value">f8:ca:b8:64:64:d3</span>
            </div>
            <span className="badge warning">Speed: 0 Mbps (Disconnected)</span>
            <span className="badge">Type: wired</span>
          </div>
        </div>

        {/* <!-- Local Ports --> */}
        <div className="card section-wide">
          <div className="card-header">
            <div className="card-icon">🔌</div>
            <h2 className="card-title">Active Ports</h2>
          </div>
          <p
            style={{
              color: "#8b95a8",
              marginBottom: "15px",
              fontSize: "0.85rem",
            }}
          >
            Monitoring{" "}
            <span style={{ color: "#00f0ff", fontWeight: 600 }}>
              68 active ports
            </span>{" "}
            on the system
          </p>

          <div className="ports-grid">
            <div className="port-item">
              <span className="port-proto">UDP</span> 0.0.0.0:53
              <br />
              <span className="port-state">BOUND · PID 3576</span>
            </div>
            <div className="port-item">
              <span className="port-proto">TCP</span> 0.0.0.0:135
              <br />
              <span className="port-state">LISTENING · PID 640</span>
            </div>
            <div className="port-item">
              <span className="port-proto">TCP</span> [::]:135
              <br />
              <span className="port-state">LISTENING · PID 640</span>
            </div>
            <div className="port-item">
              <span className="port-proto">TCP</span> 0.0.0.0:445
              <br />
              <span className="port-state">LISTENING · PID 4</span>
            </div>
            <div className="port-item">
              <span className="port-proto">TCP</span> 0.0.0.0:3000
              <br />
              <span className="port-state">LISTENING · PID 9408</span>
            </div>
            <div className="port-item">
              <span className="port-proto">TCP</span> [::]:3000
              <br />
              <span className="port-state">LISTENING · PID 9408</span>
            </div>
            <div className="port-item">
              <span className="port-proto">UDP</span> 0.0.0.0:5353
              <br />
              <span className="port-state">BOUND · PID 3192</span>
            </div>
            <div className="port-item">
              <span className="port-proto">TCP</span> 127.0.0.1:8828
              <br />
              <span className="port-state">LISTENING · PID 10016</span>
            </div>
            <div className="port-item">
              <span className="port-proto">TCP</span> 127.0.0.1:50001
              <br />
              <span className="port-state">LISTENING · PID 5992</span>
            </div>
            <div className="port-item">
              <span className="port-proto">UDP</span> 192.168.199.87:137
              <br />
              <span className="port-state">BOUND · PID 4</span>
            </div>
            <div className="port-item">
              <span className="port-proto">TCP</span> 192.168.199.87:139
              <br />
              <span className="port-state">LISTENING · PID 4</span>
            </div>
            <div className="port-item">
              <span className="port-proto">UDP</span> 0.0.0.0:1900
              <br />
              <span className="port-state">BOUND · PID 5264</span>
            </div>
            <div className="port-item">
              <span className="port-proto">TCP</span> 0.0.0.0:5040
              <br />
              <span className="port-state">LISTENING · PID 7272</span>
            </div>
            <div className="port-item">
              <span className="port-proto">UDP</span> 0.0.0.0:5355
              <br />
              <span className="port-state">BOUND · PID 3192</span>
            </div>
            <div className="port-item">
              <span className="port-proto">TCP</span> 0.0.0.0:5357
              <br />
              <span className="port-state">LISTENING · PID 4</span>
            </div>
            <div className="port-item">
              <span className="port-proto">TCP</span> 0.0.0.0:49664
              <br />
              <span className="port-state">LISTENING · PID 688</span>
            </div>
          </div>

          <p
            style={{
              color: "#8b95a8",
              marginTop: "20px",
              fontSize: " 0.75rem",
              textAlign: "center",
            }}
          >
            + 52 additional ports · Scope: local-only
          </p>
        </div>
      </div>
    </>
    // </SystemProvider>
  );
}

export default App;
