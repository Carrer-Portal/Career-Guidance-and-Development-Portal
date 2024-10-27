import { genSalt, hash, compare } from "bcrypt";
import validations from '../utils/validations.js';
import db from "../controllers/index.js";

const { validateLogin, validateCreateUser } = validations;
const undergraduate = db.undergraduates;

    const undergraduatelogin = async(req, res) =>
    {
        try {
            const { error } = validateLogin(req.body);
            if (error) {
                console.log(error);
                return res
                    .status(400)
                    .json({ 
                        error: true, 
                        message: error.details[0].message 
                    });
            }

            const user = await undergraduate.findOne({ where: {universityEmail: req.body.userName} });
            if (!user) {
                return res
                    .status(400)
                    .json({ error: true, message: "Invalid email address,user doesn't exists" });
            }
            const validPassword = await compare(req.body.password,user.password);
            if(!validPassword){
                return res
                    .status(400)
                    .json({ error: true, message: "Invalid password" });
            }
            const authToken = await user.generateAuthToken()
            res.status(200).json({ 
                accessToken : authToken,
                message: "User Logged successfully" });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ error: true, message: "Internal Server Error" });
        }
    }

    const undergraduateRegister = async (req, res) =>
        {
        try {
            const { error } = validateCreateUser(req.body);
            if (error) {
                console.log(error);
                return res
                    .status(400)
                    .json({ 
                        error: true, 
                        message: error.details[0].message 
                    });
            }

            const user = await undergraduate.findOne({ userName: req.body.userName });
            if (user) {
                return res
                    .status(400)
                    .json({ error: true, message: "User Already Exists" });
            }

            const salt = await genSalt(Number(process.env.SALT));
            const hashPassword = await hash(req.body.password, salt);
            // const lowerUserName =(req.body.universityEmail).toLowerCase();

            await undergraduate.create({ ...req.body,password: hashPassword });
            res.status(201).json({ 
                message: "User created successfully" });
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ error: true, message: "Internal Server Error" });
        }
    }

export {
    undergraduatelogin,
    undergraduateRegister
};
