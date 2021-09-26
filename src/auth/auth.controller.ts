import { Body, Controller, Get, Post, Param } from '@nestjs/common';
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
  verifyMagicLink(@Param() login_token): boolean {
    return this.authService.verifyJwtToken(login_token);
  }
}
