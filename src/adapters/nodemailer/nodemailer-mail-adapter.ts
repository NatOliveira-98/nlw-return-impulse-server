import nodemailer from 'nodemailer';

import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '2fc3ca09c153cb',
    pass: '9330b5d9f3c0c5',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Natasha de Oliveira <natasha.n.oliveira@gmail.com>',
      subject,
      html: body,
    });
  }
}
