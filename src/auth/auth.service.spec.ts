import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users';
import { mockEmailService } from '../email/email.service.spec';

describe('AuthService', () => {
  let service: AuthService;

  const mockJwtService = {
    provide: JwtService,
    useValue: {
      sign: jest.fn((payload) => {
        const jwtService = new JwtService({ secret: 'TEST123' });
        return jwtService.sign(payload);
      }),
    },
  };

  const mockUserService = {
    provide: UsersService,
    useValue: {
      saveUser: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        mockJwtService,
        mockUserService,
        mockEmailService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a token', () => {
    const payload = { email: 'chi@gmail.com' };
    const token = service.generateToken(payload);
    expect(token).not.toBeUndefined();
    expect(mockJwtService.useValue.sign).toBeCalled();
    expect(token.split('.')).toHaveLength(3); // verifies that it's a jsonwebtoken
  });

  it('should save user info', async () => {
    const email = 'chi@gmail.com';
    const login_token = service.generateToken({ email });
    const payload = { email, login_token };
    await service.saveUserInfo({ email });

    expect(mockUserService.useValue.saveUser).toBeCalledWith(payload);
  });
});
