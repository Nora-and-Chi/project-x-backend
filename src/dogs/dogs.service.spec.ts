import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DogsService, DogsController, Dog, DogDTO } from '.';

describe('DogsService', () => {
  let service: DogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
      providers: [
        DogsService,
        {
          provide: getRepositoryToken(Dog),
          useValue: {
            create: jest.fn().mockImplementation((dog: DogDTO) => {
              Promise.resolve({ id: 'uuid-dog', ...dog });
            }),
            find: jest.fn().mockResolvedValue([
              {
                name: 'Chelsea',
                breed: 'German Shepard',
                birthday: '01/01/2020',
              },
            ]),
          },
        },
      ],
    }).compile();

    service = module.get<DogsService>(DogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
