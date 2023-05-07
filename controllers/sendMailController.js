import nodemailer from "nodemailer";

const sendMail = async (req, res) => {
  try {
    const {email,subject,content} = req.body;
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "jemcovintage@gmail.com", // generated ethereal user
        pass: "rbrxdunaxfodyzxf", // generated ethereal password
      },
    });

    const mailOption = {
      from: `jemcovintage@gmail.com`, // sender address
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

export { sendMail };
