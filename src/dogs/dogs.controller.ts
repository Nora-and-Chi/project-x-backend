import { Body, Controller, Get, Post } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { Dog } from './interfaces';

@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Post()
  async create(@Body() createDog) {
    this.dogsService.create(createDog);
  }

  @Get()
  async returnAll(): Promise<Dog[]> {
    return this.dogsService.findAll();
  }
}
