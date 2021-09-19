import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection } from 'typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController, CatsController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule, UsersService } from './users';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      // autoLoadEntities: true,
      synchronize: true, // use only on DEV
      // logging: false,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      retryAttempts: 2,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const user = configService.get('MAILTRAP_USER');
        const pass = configService.get('MAILTRAP_PASS');

        return {
          transport: `smtp://${user}:${pass}@smtp.mailtrap.io`,
        };
      },
      inject: [ConfigService],
    }),
    DogsModule,
    AuthModule,
    UsersModule,
    EmailModule,
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, UsersService, EmailService],
})
export class AppModule {
  constructor(private connection: Connection) {
    this.connection = connection;
  }
}
