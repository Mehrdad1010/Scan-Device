import { Controller, Get, Query } from '@nestjs/common';
import { ScanService } from './scan.service';
import { ScanStreamService } from './scan-stream.service';

@Controller('scan')
export class ScanController {
  constructor(
    private readonly scanService: ScanService,
    private readonly scanStreamService: ScanStreamService,
  ) {}

  @Get()
  async scanOnce(@Query('liveIntervalMs') liveIntervalMs?: string) {
    const numericInterval = liveIntervalMs ? Number(liveIntervalMs) : undefined;

    const snapshot = await this.scanService.scanLocal();

    setImmediate(() => {
      this.scanStreamService.start(numericInterval ?? 1000);
    });

    return snapshot;
  }
}
