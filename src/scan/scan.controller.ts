import { Controller, Get } from '@nestjs/common';
import { ScanService } from './scan.service';

@Controller('api')
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @Get('scan')
  async scan() {
    return this.scanService.scanLocal();
  }
}
