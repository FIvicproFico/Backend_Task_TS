import nodemailer from 'nodemailer';

import env from '../config/env-config';

interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

/* Uses @types/nodemailer. */
const transporter = nodemailer.createTransport({
  service: env.mailService,
  auth: {
    user: env.mailAdress,
    pass: env.appSpecificPassword,
  },
});

class EmailService {
  sendEmail = (mailOptions: IMailOptions): void => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  };
}

export default new EmailService();
