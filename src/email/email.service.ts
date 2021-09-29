import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  sendEmail(email: string, login_token?: string) {
    const host = this.configService.get('SERVER_HOST');
    const port = this.configService.get('SERVER_PORT');
    const url = `http://${host}:${port}/auth/session?${
      login_token ? `login_token=${login_token}` : ''
    }`;

    const mailOptions = {
      from: 'chi@project-x.com',
      to: email,
      subject: 'Thanks for signing up',
      html: `<b>Welcome to your ultimate progress tracker.</b> \n Click on the <a href="${url}">link</a> to sign in`,
    };

    this.mailerService
      .sendMail(mailOptions)
      .then(() => {
        console.log('email sent');
      })
      .catch((err) => {
        console.log('err', err);
      });
    return email;
  }
}
