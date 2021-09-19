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
      console.log('err', err);
    }
  }
}
