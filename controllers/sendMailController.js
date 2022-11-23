import nodemailer from "nodemailer";

const sendMail = async (req, res) => {
  try {
    const payload = req.body;
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
      to: `${payload.email}`, // list of receivers
      subject: "Thông báo về việc đăng ký dự lễ tốt nghiệp ✔", // Subject line
      text: "Xin chào,", // plain text body
      html: "<b>Chúc mừng bạn đã đăng ký thành công</b><p>Quay lại kiểm tra chổ ngồi của bạn sau khi chúng tôi sắp xếp nhé!</p>", // html body
    };
    transporter.sendMail(mailOption, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.status(500).json({ message: "ban da gui mail thanh cong" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export { sendMail };
