import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController, CatsController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      // autoLoadEntities: true,
      host: 'localhost',
      port: 5432,
      username: 'chi',
      password: 'password',
      database: 'db',
      synchronize: true, // use only on DEV
      // logging: false,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      retryAttempts: 2,
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: 'smtp://319b32b90279a2:8d3a4287caf004@smtp.mailtrap.io',
      }),
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
