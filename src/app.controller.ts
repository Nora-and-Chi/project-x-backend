import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This is a string of all cats';
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(): string {
    return 'This is general app controller';
  }
}
