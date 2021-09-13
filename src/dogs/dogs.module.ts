import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { Dog } from './dogs.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dog])],
  providers: [DogsService],
  controllers: [DogsController],
})
export class DogsModule {}
