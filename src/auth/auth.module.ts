import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule, UsersService } from '../users';
import { EmailModule, EmailService } from '../email';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: configService.get('JWT_EXPIRATION') },
        };
      },
      inject: [ConfigService],
    }),
    UsersModule,
    EmailModule,
  ],
  providers: [AuthService, UsersService, EmailService],
  controllers: [AuthController],
})
export class AuthModule {}
