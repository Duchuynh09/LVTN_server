import nodemailer from "nodemailer";

const sendMail = async (req, res) => {
  try {
    const { email, subject, content } = req.body;
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOption = {
      from: process.env.USER, // sender address
      to: `${email}`, // list of receivers
      subject: subject, // Subject line
      text: "Xin chào,", // plain text body
      html: `<p>${content}</p>`, // html body
    };
    transporter.sendMail(mailOption, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.status(500).json({ message: "success" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
const sendEmailVerify = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      // text: text,
      html: `<p>Bấm <a href="${text}` + '">vào đây </a>để xác nhận email</p>',
    });
    console.log("email sent sucessfully");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};
export { sendMail, sendEmailVerify };
