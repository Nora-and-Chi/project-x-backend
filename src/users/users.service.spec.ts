import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const userMockService = {
    provide: getRepositoryToken(User),
    useValue: {
      create: jest.fn((user) => {
        return Promise.resolve({ id: 'uuid', ...user });
      }),
      save: jest.fn((user) => {
        return Promise.resolve(user);
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, userMockService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should save user info in user relation', () => {
    const user = { email: 'chi@test.com' };
    service.saveUser(user);
    expect(userMockService.useValue.create).toBeCalledWith(user);
    expect(userMockService.useValue.save).toHaveBeenCalled();
  });
});
