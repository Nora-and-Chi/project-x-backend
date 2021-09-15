import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DogDTO } from './dto/dog.dto';
import { Dog } from './dogs.entity';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(Dog)
    private dogRepository: Repository<Dog>,
  ) {}

  async create(dog: DogDTO) {
    const newDog = this.dogRepository.create(dog);
    await this.dogRepository.save(newDog);
    return newDog;
  }

  findAll() {
    return this.dogRepository.find();
  }

  async update({ id, ...rest }) {
    try {
      await this.dogRepository.update(id, rest);
      return { id };
    } catch (err) {
      console.error(err);
    }
  }
}
