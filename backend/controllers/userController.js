import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import validator from "validator"
import jwt from "jsonwebtoken"

const createToken = (id) => {
    // Ensuring the 'id' is a simple string
    return jwt.sign({ id }, process.env.JWT_SECRET)   
}

export const loginUser = async(req, res) => {
    const { email, password } = req.body || {};
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ success: false, msg: "user doesn't exist" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, msg: "Invalid Credential" })
        }

        // FIX: Convert _id to string
        const token = createToken(user._id.toString()); 

        res.json({ success: true, msg: "user login", token }) 
    } catch (error) {
        res.status(500).json({ success: false, msg: "Error" })
    }
}

export const registerUser = async(req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await User.findOne({ email })
        if (exists) {
            return res.json({ success: false, msg: "user already exist" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, msg: "Please Enter a valid email" });
        }
        if (password.length < 6) {
            return res.json({ success: false, msg: "Please Enter a strong password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = new User({ name, email, password: hashPassword });
        const user = await newUser.save();

        // FIX: Convert _id to string
        const token = createToken(user._id.toString()); 

        res.status(201).json({ success: true, msg: "User Register Successfully", token }) 
        
    } catch (error) {
        res.status(500).json({ success: false, msg: "User not Register" }) 
    }
}

