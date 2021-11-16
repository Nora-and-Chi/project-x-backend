import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { User as UserDTO } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async saveUser(payload: UserDTO) {
    try {
      const createdUser = this.userRepository.create(payload);
      return await this.userRepository.save(createdUser);
    } catch (err) {
      console.error('error saving user', payload);
    }
  }

  async findUser(payload: UserDTO) {
    try {
      const userFound = await this.userRepository.find(payload);
      return !!userFound;
    } catch (err) {
      console.error('error finding user', payload);
    }
  }
}
