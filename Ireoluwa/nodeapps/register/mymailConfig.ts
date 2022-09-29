import nodemailer, { SentMessageInfo } from "nodemailer";
require('dotenv').config()

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    },
  });
 function mailOption(email:string, subject:string, message:string){

   var mailOption = {
    from: process.env.USER,
    to: email,
    subject: subject,
    text: message
  };

  return mailOption
}

 export{
    transporter,
    mailOption
 }