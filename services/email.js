const sendgrid = require('@sendgrid/mail');
const Mailgen = require('mailgen');
require('dotenv').config();

class EmailService {
  #sender = sendgrid;
  #GenerateTemplate = Mailgen;
  constructor(env) {
    switch (env) {
      case 'development':
        this.link = 'http://localhost:3000';
        break;
      case 'production':
        this.link = 'Link for production';
        break;
      default:
        this.link = 'http://localhost:3000';
        break;
    }
  }
  #createTemplateVerifyEmail(verifyToken, name) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: 'salted',
      product: {
        name: 'System contacts',
        link: this.link,
      },
    });
    const email = {
      body: {
        name,
        intro: 'Hello there! We are happy to seeing you',
        action: {
          instructions:
            'To verify that it is realy you? please click on the button below',
          button: {
            color: '#22BC66',
            text: 'Confirm your account',
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
      },
    };
    const emailBody = mailGenerator.generate(email);
    return emailBody;
  }

  async sendVerifyEmail(verifyToken, email, name) {
    this.#sender.setApiKey(process.env.MAIL_TOKEN);

    const msg = {
      to: email,
      from: 'nastya.boiko.api@gmail.com',
      subject: 'Verify email',
      html: this.#createTemplateVerifyEmail(verifyToken, name),
    };

    this.#sender.send(msg);
  }
}

module.exports = EmailService;
