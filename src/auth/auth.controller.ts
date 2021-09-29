import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { User } from '../users/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signUpUser(@Body() user: User): string {
    // @TODO: validate payload
    this.authService.saveUserInfo(user);
    return 'User signed up. Authenticated required';
  }

  @Get('session')
  async verifyMagicLink(@Query('login_token') login_token): Promise<void> {
    const isTokenValid = this.authService.verifyJwtToken(login_token);
    const isUserPresent = await this.authService.isUserPresent(login_token);

    if (isTokenValid && isUserPresent) {
      console.log('token is valid, yaay');
    } else {
      console.log('token is not valid');
    }

    // if it's valid, return auth information
  }
}
