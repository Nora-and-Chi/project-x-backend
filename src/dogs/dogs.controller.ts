import { Controller, Get } from '@nestjs/common';

@Controller('dogs')
export class DogsController {
  @Get()
  returnAll(): string {
    return 'This is a class of dogs';
  }
}
