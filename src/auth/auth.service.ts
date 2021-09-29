import { Injectable } from '@nestjs/common';
import { addHours, isBefore } from 'date-fns';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { User as UserDTO } from '../users/dto/user.dto';
import { UsersService } from '../users';
import { EmailService } from '../email';
import { DecodedToken } from './dto/auth.dto';

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

  verifyJwtToken(login_token: UserDTO['login_token']): boolean {
    const decodedToken = this.jwtService.decode(login_token) as DecodedToken;
    return isBefore(new Date(), new Date(decodedToken.exp_date));
  }

  async isUserPresent(login_token: UserDTO['login_token']): Promise<boolean> {
    const decodedToken = this.jwtService.decode(login_token) as DecodedToken;
    try {
      const user = await this.userService.findUser({
        email: decodedToken.email,
      });
      return user;
    } catch (err) {
      console.log('error finding if user is present', err);
    }
  }
}
