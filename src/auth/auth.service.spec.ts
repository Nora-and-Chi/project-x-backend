import { Test, TestingModule } from '@nestjs/testing';
import { addHours, isBefore } from 'date-fns';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users';
import { EmailService } from '../email';
import { mockEmailService } from '../email/email.service.spec';

jest.mock('date-fns');

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;
  let emailService: EmailService;

  const mockJwtService = {
    provide: JwtService,
    useValue: {
      sign: jest.fn((payload) => {
        const jwtService = new JwtService({ secret: 'TEST123' });
        return jwtService.sign(payload);
      }),
      decode: jest.fn((login_token) => {
        const jwtService = new JwtService({ secret: 'TEST123' });
        return jwtService.decode(login_token);
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

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('generateToken', () => {
    it('should generate a token', () => {
      const payload = { email: 'chi@gmail.com' };
      const token = authService.generateToken(payload);
      expect(token).not.toBeUndefined();
      expect(jwtService.sign).toBeCalled();
      expect(token.split('.')).toHaveLength(3); // verifies that it's a jsonwebtoken
    });
  });

  describe('saveUserInfo', () => {
    let newUser;
    beforeEach(() => {
      (addHours as jest.Mock).mockResolvedValueOnce(1000);
      const user = { email: 'chi@gmail.com' };
      const login_token = authService.generateToken({
        ...user,
        exp_date: 1000,
      });
      newUser = { login_token, ...user };
      authService.saveUserInfo(newUser);
    });

    it('should save user info', async () => {
      expect(userService.saveUser).toBeCalledWith(newUser);
    });

    it('should send magic link to user', () => {
      expect(emailService.sendEmail).toBeCalled();
    });
  });

  describe('verifyJwtToken', () => {
    let login_token;
    beforeEach(() => {
      (addHours as jest.Mock).mockResolvedValueOnce('2021-09-27T06:34:48.236Z');
      const user = { email: 'chi@gmail.com' };
      login_token = authService.generateToken({
        ...user,
        exp_date: '2021-09-27T06:34:48.236Z',
      });
    });

    it('should verify the expiration date of the jwt token is valid', () => {
      (isBefore as jest.Mock).mockReturnValueOnce(true);
      const isMagicLinkValid = authService.verifyJwtToken(login_token);
      expect(jwtService.decode).toBeCalled();
      expect(isMagicLinkValid).toBeTruthy();
    });

    it('should verify the expiration date of the jwt token is invalid', () => {
      (isBefore as jest.Mock).mockReturnValueOnce(false);
      const isMagicLinkValid = authService.verifyJwtToken(login_token);
      expect(jwtService.decode).toBeCalled();
      expect(isMagicLinkValid).toBeFalsy();
    });
  });
});
