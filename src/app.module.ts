import { Module } from '@nestjs/common';
import { ScanModule } from './scan/scan.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScanModule, ScheduleModule.forRoot()],
})
export class AppModule {}
