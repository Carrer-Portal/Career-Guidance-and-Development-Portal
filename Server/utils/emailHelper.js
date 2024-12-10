import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "kaveeshapathiranawiley@gmail.com",
    pass: "knho bbvw ptbm wgdz"
  }
});

const sendEmail = async (options) => {
  const mailOptions = {
    from: "kaveeshapathiranawiley@gmail.com",
    to: options.email,
    subject: options.subject,
    html: options.body
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info.accepted.length>0;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default sendEmail;