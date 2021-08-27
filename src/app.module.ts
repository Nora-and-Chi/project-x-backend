import { Module } from '@nestjs/common';
import { AppController, CatsController } from './app.controller';
import { AppService } from './app.service';
import { DogsController } from './dogs/dogs.controller';
@Module({
  imports: [],
  controllers: [AppController, CatsController, DogsController],
  providers: [AppService],
})
export class AppModule {}
