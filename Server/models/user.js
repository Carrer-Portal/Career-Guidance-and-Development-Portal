const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        userName : {
            type : String,
            required : true
        },
        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String,
            required : true
        },
        contactNumber : {
            type : String,
            required : true
        },
        regNumber : {
            type : String,
            required : true
        },
        faculty : {
            type : String,
            required : true
        },
        department : {
            type : String,
            required : true
        }
        ,
        password : {
            type : String,
            required : true
        }
    }
);
userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("User",userSchema)

module.exports= User;