import { Body, Controller, Get, Put, Post } from '@nestjs/common';
import { DogsService } from './dogs.service';

@Controller('dogs')
export class DogsController {
  constructor(private dogsService: DogsService) {}

  @Post()
  async createDog(@Body() dog) {
    return this.dogsService.create(dog);
  }

  @Get()
  async getDogs() {
    return this.dogsService.findAll();
  }

  @Put()
  async updateDog(@Body() updatedDog) {
    return this.dogsService.update(updatedDog);
  }
}
