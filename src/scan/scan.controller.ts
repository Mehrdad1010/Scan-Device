import { Controller, Get, Req } from '@nestjs/common';
import { ScanService } from './scan.service';
import express from 'express';

@Controller('api')
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @Get('scan')
  async scan(@Req() request: express.Request) {
    return await this.scanService.scanLocal();
  }
}
