import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';
import { AppController, CatsController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

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
    DogsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, UsersService],
})
export class AppModule {
  constructor(private connection: Connection) {
    this.connection = connection;
  }
}
