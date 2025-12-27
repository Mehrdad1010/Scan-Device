import { Controller, Get, Req } from '@nestjs/common';
import { ScanService } from './scan.service';
import { Request } from 'express';

@Controller('api')
export class ScanController {
  constructor(private readonly scanService: ScanService) {}

  @Get('scan')
  async scan() // @Req() request: Request,
  {
    // console.log(request);

    return this.scanService.scanLocal();
  }
}
