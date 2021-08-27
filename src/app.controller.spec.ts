import { Test, TestingModule } from '@nestjs/testing';
import { AppController, CatsController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController, CatsController],
      providers: [AppService],
    }).compile();
  });

  it('should return "This is general app controller"', () => {
    const appController = app.get<AppController>(AppController);
    expect(appController.getHello()).toBe('This is general app controller');
  });

  it('should call catsController', () => {
    const catsController = app.get<CatsController>(CatsController);
    expect(catsController.findAll()).toBe('This is a string of all cats');
  });
});
