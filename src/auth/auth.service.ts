import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  generateToken(payload) {
    return this.jwtService.sign(payload);
  }

  saveUserInfo(user): Promise<User> {
    const login_token = this.generateToken(user);
    const newUser = { login_token, ...user };
    return this.userService.saveUser(newUser);
  }
}
