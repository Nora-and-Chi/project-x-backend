import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    provide: AuthService,
    useValue: {
      saveUserInfo: jest.fn(),
      verifyJwtToken: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [mockAuthService],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('/signup', () => {
    it('should sign up a user', () => {
      const user = controller.signUpUser({ email: 'chi@test.com' });
      expect(authService.saveUserInfo).toBeCalled();
      expect(user).toBe('User signed up. Authenticated required');
    });
  });

  describe('/sessions', () => {
    it('should verify magic link', () => {
      const login_token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1lcmN5Z3JhY2VAZ21haWwuY29tIiwiZXhwX2RhdGUiOiIyMDIxLTA5LTI3VDA2OjM0OjQ4LjIzNloiLCJpYXQiOjE2MzI2ODEyODgsImV4cCI6MTYzMjY4NDg4OH0.7FHL0ju2WNV8QEFmtT9zkC_hKz36an6hDgSeltWOG2c';
      controller.verifyMagicLink(login_token);
      expect(authService.verifyJwtToken).toBeCalled();
    });
  });
});
