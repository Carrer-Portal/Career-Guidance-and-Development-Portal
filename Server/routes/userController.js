const router = require("express").Router();
const bcrypt = require("bcrypt");
const {validateLogin,validateCreateUser} = require("../utils/validations")
const User = require("../models/user");

router.post("/signup", async (req, res) => {
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

        const user = await User.findOne({ userName: req.body.userName });
        if (user) {
            return res
                .status(400)
                .json({ error: true, message: "User Already Exists" });
        }

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        const lowerUserName =(req.body.userName).toLowerCase();

        await new User({ ...req.body,userName: lowerUserName, password: hashPassword }).save();
        res.status(201).json({ 
            message: "User created successfully" });
    } catch (error) {
        console.log(error);
        return res
            .status(500)
            .json({ error: true, message: "Internal Server Error" });
    }
});

router.post("/login", async (req, res) => {
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

        const user = await User.findOne({ userName: req.body.userName });
        if (!user) {
            return res
                .status(400)
                .json({ error: true, message: "Invalid email address,user doesn't exists" });
        }
        const validPassword = await bcrypt.compare(req.body.password,user.password);
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
});

module.exports = router;
