import nodemailer, { SentMessageInfo } from "nodemailer";

const config = require('./mymailConfig')

async function mailer(email:string, username:string){
   
  let transporter = config.transporter
 
var mailOption = config.mailOption(email, "Registration Confirmation", `Welcome ${username} your email is ${email}`)

      const ola = new Promise((resolve, reject) => {
        transporter.sendMail(mailOption, function (error: Error | null, info: SentMessageInfo): void {
          if (error) {
           reject(error);
          } else {
            console.log("Email sent: " + info.response);
            resolve(info);
          }
        });
      });

      console.log(await ola);
}

export{
    mailer
}