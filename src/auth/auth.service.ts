import { Injectable } from '@nestjs/common';
import { addHours } from 'date-fns';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { User as UserDTO } from '../users/dto/user.dto';
import { UsersService } from '../users';
import { EmailService } from '../email';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  generateToken(payload) {
    return this.jwtService.sign(payload);
  }

  saveUserInfo(user: UserDTO): Promise<User> {
    const expiration = addHours(new Date(), 12);
    const login_token = this.generateToken({ ...user, exp_date: expiration });
    const newUser = { login_token, ...user };
    // send magic link email
    this.emailService.sendEmail(user.email, login_token);
    return this.userService.saveUser(newUser);
  }
}
