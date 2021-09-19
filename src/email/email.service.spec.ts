import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';

describe('EmailService', () => {
  let service: EmailService;
  let mailerService: MailerService;

  const mockEmailService = {
    provide: EmailService,
    useValue: {
      sendEmail: jest.fn(),
    },
  };

  const mockMailerService = {
    provide: MailerService,
    useValue: {
      sendMail: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [mockEmailService, mockMailerService],
    }).compile();

    service = module.get<EmailService>(EmailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.skip('should send email to provided email address', () => {
    const email = 'chi@tester.com';
    service.sendEmail(email);
    expect(mailerService.sendMail).toHaveBeenCalled();
  });
});
