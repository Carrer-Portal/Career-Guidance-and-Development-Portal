import { genSalt, hash, compare } from "bcrypt";
import validations from "../utils/validations.js";
import db from "../controllers/index.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/emailHelper.js";
import Joi from "joi";
import bcrypt from "bcrypt";

const { validateLogin, validateCreateUser } = validations;
const undergraduate = db.undergraduates;
const department = db.department;
const faculty = db.faculty;

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
    console.log("coming body",user);
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
      userType: "Student",
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

    const user = await undergraduate.findOne({
      where: { universityEmail: req.body.universityEmail },
    });

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

    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};

const whoAmI = async (req, res) => {
  try {

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: true, message: 'Access Denied. No token provided.' });
    }

    const decoded = jwt.verify(token, "CarrerHubGetInToSeceretZone");
    const undergraduateId = decoded.undergraduateId;

    const user = await undergraduate.findOne(
      { where: { undergraduateId: undergraduateId } ,
        include: [
          {
            model: department,
            as: "department",
            include: [
              {
                model: faculty,
                as: "faculty"
              }
            ]
          },
        ],
      }
      
    );

    const userDto = {
      undergraduateId:user.undergraduateId,
      departmentId:user.department.departmentId,
      facultyId:user.department.faculty.facultyId,
      regNo: user.regNo,
      universityEmail:user.universityEmail,
      firstName:user.firstName,
      lastName:user.lastName,
      contactNumber:user.contactNumber,
      departmentName:user.department.departmentName,
      facultyName:user.department.faculty.facultyName
    }
    res.status(200).json({
      message: "User fetched successfully",
      user: userDto,
    });
  } catch (error) {

    return res
      .status(500)
      .json({ error: true,  message: error.message || 'Internal Server Error'});
  }
};

const forgetPassword = async (req, res) => {
  try {
    console.log(req.body.userName);
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
      body: `<div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden;">
    <div style="background-color: #007bff; color: #fff; padding: 20px; text-align: center;">
        <h1 style="margin: 0;">CGD | USJ</h1>
    </div>
    <div style="padding: 20px;">
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
            CGD | USJ Team
        </p>
    </div>
    <div style="background-color: #f7f7f7; color: #555; padding: 10px 20px; text-align: center;">
        <p style="margin: 0;">&copy; 2023 CGD | USJ. All rights reserved.</p>
        <p style="margin: 0;">Nugegoda, Sri Lanka</p>
    </div>
</div>
            `
    };
    const emailSent = await sendEmail(options);
    console.log(emailSent)
    if(emailSent){
        res.status(200).json({
            message: "Reset Link sent successfully",
            passwordToken: token,
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


const updateUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  regNumber: Joi.string().required(),
  faculty: Joi.number().required(),
  department: Joi.number().required(),
});

const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required()
});

// Update user details
const updateUndegratuateUser = async (req, res) => {
  const { error } = updateUserSchema.validate(req.body);
  if (error) return res.status(400).json({ error: true, message: error.details.map(detail => detail.message).join(', ') });

  try {
    const { firstName, lastName, email, phone, regNumber, faculty, department } = req.body;
    const user = await undergraduate.findByPk(req.params.id);

    if (!user) return res.status(404).json({ error: true, message: 'User not found' });

    user.firstName = firstName;
    user.lastName = lastName;
    user.universityEmail = email;
    user.contactNumber = phone;
    user.regNo = regNumber;
    user.facultyId = faculty;
    user.departmentId = department;

    await user.save();

    res.status(200).json({ message: 'User updated successfully', status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};

// Update user password
const updateUndegratuatePassword = async (req, res) => {
  const { error } = updatePasswordSchema.validate(req.body);
  if (error) return res.status(400).json({ error: true, message: error.details.map(detail => detail.message).join(', ') });

  try {
    const { oldPassword, newPassword } = req.body;
    const user = await undergraduate.findByPk(req.params.id);

    if (!user) return res.status(404).json({ error: true, message: 'User not found' });

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) return res.status(400).json({ error: true, message: 'Invalid old password' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();

    res.status(200).json({ message: 'Password updated successfully', status: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};


const createAdminAccount = async (req, res) => {
  const { firstName, lastName, roleType, contactNumber, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ error: true, message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = await Admin.create({
      firstName,
      lastName,
      roleType,
      contactNumber,
      email,
      password: hashedPassword,
    });

    const token = newAdmin.generateAuthToken();
    res.status(201).json({ message: "Admin created successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).json({ error: true, message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(400).json({ error: true, message: "Invalid email or password" });
    }

    const token = admin.generateAuthToken();
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const updateAdmin = async (req, res) => {
  const { adminId } = req.params;
  const { firstName, lastName, roleType, contactNumber, email } = req.body;

  try {
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ error: true, message: "Admin not found" });
    }

    admin.firstName = firstName || admin.firstName;
    admin.lastName = lastName || admin.lastName;
    admin.roleType = roleType || admin.roleType;
    admin.contactNumber = contactNumber || admin.contactNumber;
    admin.email = email || admin.email;

    await admin.save();
    res.status(200).json({ message: "Admin updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const findAdminById = async (req, res) => {
  const { adminId } = req.params;

  try {
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ error: true, message: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};


export { undergraduatelogin, undergraduateRegister, whoAmI, forgetPassword, updateUndegratuateUser, updateUndegratuatePassword,
  adminLogin, createAdminAccount, updateAdmin, findAdminById
 };
