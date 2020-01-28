import nodemailer from 'nodemailer';
import { AuthService } from '../services/auth';

export const EmailService = {
  
  send: async (subject: string, to: string, body: string) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS || '',
        pass: process.env.EMAIL_PASSWORD || ''
      }
    });

    // Send email
    await transporter.sendMail({
      from: `"Checked" <info@checked.com>`,
      to,
      subject,
      html: body
    });

    console.log(`EmailService: Sent email to ${to}`);
  },

  generateRegistrationBody: () => {
    const extension: string = AuthService.hashValue(Math.random().toString());
    const body: string =
    `<center>
      <img src="https://i.imgur.com/SdU9VF4.png" style="width: 300px; height: 300px;"></img>
      <h2>Please verify your email by clicking the link below</h2>
      <br/>
      <h3>
        <a href="https://i.imgur.com/xn4cYl4.png">verification.checked.com/${extension}</a>
      </h3>
    </center>`
    ;

    return body.replace(' ', '').replace(/\n/g, '');
  },

};