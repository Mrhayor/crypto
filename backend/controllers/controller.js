import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res)=>{
    const {email, password, name} = req.body;
    try{
        if(!email || !password || !name){
            throw new Error("All fields are required");
        }

        const userAlreadyExists = await User.findOne({email});
        console.log("userAlreadyExists", userAlreadyExists)
        if(userAlreadyExists){
            return res.status(400).json({success:false, messages: "User already exists"});
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
       
        const verificationToken = Math.floor(100000 + Math.random() * 90000).toString();

        const user = new User({
            email,
            password:hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now + 24 * 60 * 60 * 1000 //24 hours 
        })

        await user.save();

        //jwt
        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            success: true,
            message: "user created successfully",
            user:{
                ...user._doc,
                password: undefined,
            },
        });

    } catch(error){
        res.status(400).json({success:false, messages: error.message});
    }
}

export const logout = async (req, res)=>{
    res.send("logged out")
}

export const login = async (req, res)=>{
    res.send("logged in")
}