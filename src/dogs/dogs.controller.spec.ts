import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DogsService, DogsController, Dog, DogDTO } from '.';

describe('DogsController', () => {
  let controller: DogsController;
  const allDogs = [
    {
      name: 'Chelsea',
      breed: 'German Shepard',
      birthday: '01/01/2020',
    },
  ];

  beforeEach(async () => {
    const DogServiceProvider = {
      provide: getRepositoryToken(Dog),
      useValue: {
        create: jest.fn((dog: DogDTO) =>
          Promise.resolve({ id: 'uuid-dog', ...dog }),
        ),
        save: jest.fn((dog: DogDTO) => {
          return Promise.resolve({ id: 'uuid-dog', ...dog });
        }),
        find: jest.fn().mockResolvedValue(allDogs),
        update: jest.fn((updatedDog) => {
          return Promise.resolve(updatedDog);
        }),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
      providers: [DogsService, DogServiceProvider],
    }).compile();

    controller = module.get<DogsController>(DogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDogs', () => {
    it('should get and return all dogs', async () => {
      await expect(controller.getDogs()).resolves.toEqual(allDogs);
    });

    it('should create a dog', async () => {
      const dog: DogDTO = allDogs[0];

      await expect(controller.createDog(dog)).resolves.toEqual({
        id: 'uuid-dog',
        ...dog,
      });
    });

    it('should update dog', async () => {
      const updatedDog = {
        id: '1',
        ...allDogs[0],
      };

      await expect(controller.updateDog(updatedDog)).resolves.toEqual({
        id: updatedDog.id,
      });
    });
  });
});
