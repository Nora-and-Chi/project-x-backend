import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  const mockAuthService = {
    provide: AuthService,
    useValue: {
      saveUserInfo: jest.fn(),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, mockAuthService],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sign up a user', () => {
    const user = controller.signUpUser({ email: 'chi@test.com' });
    expect(mockAuthService.useValue.saveUserInfo).toBeCalled();
    expect(user).toBe('User signed up. Authenticated required');
  });
});
