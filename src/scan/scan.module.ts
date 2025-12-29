import { Module } from '@nestjs/common';
import { ScanService } from './scan.service';
import { ScanController } from './scan.controller';
import { ScanGateway } from './scan.gateway';
import { ScanStreamService } from './scan-stream.service';

@Module({
  controllers: [ScanController],
  providers: [ScanService, ScanGateway, ScanStreamService],
  // exports: [ScanService],
})
export class ScanModule {}
