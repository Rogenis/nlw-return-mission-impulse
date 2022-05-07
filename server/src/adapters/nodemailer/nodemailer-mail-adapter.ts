import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d5ed5bcb9eb099",
    pass: "7809ef8803bee2"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe FeedGet <oi@feedget.com.br>',
      to: 'Rogenis Silva <rogenisp16@gmail.com>',
      subject,
      html: body,
    })
  };
}