const { get } = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const userSignUp = async(req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({error: "Email and password are required"});
    }

    const user = await User.findOne({email});

    if(user){
        return res.status(400).json({error: "Email already exists"});
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        email,
        password:hashPassword
    })

    let token = jwt.sign({email: newUser.email,id: newUser._id}, process.env.SECRET_KEY);

    return res.status(200).json({token,user:newUser})
}

const userLogin = async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({error: "Email and password are required"});
    }
    const user = await User.findOne({email});
    if(user && await bcrypt.compare(password,user.password)){
        let token = jwt.sign({email: user.email,id: user._id}, process.env.SECRET_KEY);
        return res.status(200).json({token, user});
    }else{
        return res.status(400).json({error: "Invalid email or password"});
    }
}

const getUser = async(req,res)=>{
    const user  = await User.findById(req.params.id);
    res.json({email:user.email})
}

module.exports = {getUser, userSignUp, userLogin};