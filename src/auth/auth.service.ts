import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { User as UserDTO } from '../users/dto/user.dto';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';

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
    const login_token = this.generateToken(user);
    const newUser = { login_token, ...user };
    this.emailService.sendEmail(user.email, login_token);
    return this.userService.saveUser(newUser);
  }
}
