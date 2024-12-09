import { genSalt, hash, compare } from "bcrypt";
import validations from "../utils/validations.js";
import db from "../controllers/index.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/emailHelper.js";

const { validateLogin, validateCreateUser } = validations;
const undergraduate = db.undergraduates;
const department = db.department;

const undergraduatelogin = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({
        error: true,
        message: error.details[0].message,
      });
    }

    const user = await undergraduate.findOne({
      where: { universityEmail: req.body.userName },
    });
    if (!user) {
      return res
        .status(400)
        .json({
          error: true,
          message: "Invalid email address,user doesn't exists",
        });
    }
    const validPassword = await compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: true, message: "Invalid password" });
    }
    const authToken = await user.generateAuthToken();
    res.status(200).json({
      accessToken: authToken,
      message: "User Logged successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const undergraduateRegister = async (req, res) => {
  try {
    const { error } = validateCreateUser(req.body);
    if (error) {
      console.log(error);
      return res.status(400).json({
        error: true,
        message: error.details[0].message,
      });
    }
    console.log(req.body);
    const user = await undergraduate.findOne({
      where: { universityEmail: req.body.universityEmail },
    });
    console.log(user);
    if (user) {
      return res
        .status(400)
        .json({ error: true, message: "User Already Exists" });
    }

    const salt = await genSalt(Number(process.env.SALT));
    const hashPassword = await hash(req.body.password, salt);
    // const lowerUserName =(req.body.universityEmail).toLowerCase();

    await undergraduate.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const whoAmI = async (req, res) => {
  try {
    const user = await undergraduate.findOne(
      {
        include: [
          {
            model: department,
            as: "department",
          },
        ],
      },
      { where: { undergraduateId: req.body.undergraduateId } }
    );
    console.log(user);
    res.status(200).json({
      message: "User fetched successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const user = await undergraduate.findOne({
      where: { universityEmail: req.body.userName },
    });
    if (!user) {
      return res
        .status(400)
        .json({
          error: true,
          message: "Invalid email address,user doesn't exists",
        });
    }
    const token = jwt.sign({ id: user.undergraduateId }, "resetCGDPassword", {
      expiresIn: "5min",
    });
    const options = {
      email: user.universityEmail,
      subject: "Reset Password",
      body: `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #333;">Password Reset Request</h2>
                <p style="color: #555;">
                    You have requested to reset your password. Please click on the link below to reset your password. This link will expire in 5 minutes.
                </p>
                <a 
                    href="http://localhost:8070/api/v1/resetpassword/${token}" 
                    style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;"
                >
                    Reset Password
                </a>
                <p style="color: #555;">
                    If you did not request this, please ignore this email.
                </p>
                <p style="color: #555;">
                    Thank you,<br>
                    CGD | USJ
                </p>
            </div>
            `
    };
    const emailSent = await sendEmail(options);
    console.log(emailSent)
    if(emailSent){
        res.status(200).json({
            message: "Reset Link sent successfully",
            status: true,
          });
    }
    else{
        res.status(500).json({
            message: "Unexpected Error Occured,Try Again",
            status: false,
          });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

export { undergraduatelogin, undergraduateRegister, whoAmI, forgetPassword };
