import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getVersion() {
    return 'Quotes API V1.0.0';
  }
}
