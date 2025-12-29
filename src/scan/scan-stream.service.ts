import { Injectable, Logger } from '@nestjs/common';
import { ScanService } from './scan.service';
import { ScanGateway } from './scan.gateway';

@Injectable()
export class ScanStreamService {
  private readonly logger = new Logger(ScanStreamService.name);
  private timer?: NodeJS.Timeout;
  private isStreaming = false;
  private intervalMs = 1000;

  constructor(
    private readonly scanService: ScanService,
    private readonly gateway: ScanGateway,
  ) {}

  async start(intervalMs = 1000) {
    if (this.isStreaming) {
      this.logger.debug('Scan stream already running, skipping start.');
      return;
    }
    this.intervalMs = intervalMs;
    this.isStreaming = true;
    this.logger.log('Scan stream started.');

    const loop = async () => {
      if (!this.isStreaming) return;
      try {
        const payload = await this.scanService.scanLocal();
        this.gateway.emitScanUpdate(payload);
      } catch (error) {
        this.logger.error('Scan loop failed', error);
      } finally {
        if (this.isStreaming) {
          this.timer = setTimeout(loop, this.intervalMs);
        }
      }
    };

    this.timer = setTimeout(loop, 0);
  }

  stop() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = undefined;
    }
    if (this.isStreaming) {
      this.logger.log('Scan stream stopped.');
    }
    this.isStreaming = false;
  }

  get running() {
    return this.isStreaming;
  }
}
