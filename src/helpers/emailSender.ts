import nodemailer from "nodemailer";
import { config } from "../config";

const emailSender = async (subject: string, email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.app_pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  console.log(
    "calling it and here valuw is",
    config.emailSender.email,
    config.emailSender.app_pass,
  );
  const info = await transporter.sendMail({
    from: '"Meetmax" <rakibulhasansakib33@gmail.com>', // sender address
    to: email, // list of receivers
    subject, // Subject line
    //text: "Hello world?", // plain text body
    html, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

export default emailSender;
