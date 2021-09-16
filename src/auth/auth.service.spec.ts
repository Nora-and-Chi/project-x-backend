import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, mockJwtService],
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
    expect(token.split('.')).toHaveLength(3); // verifies that it's a jsonwebtoken
  });
});
