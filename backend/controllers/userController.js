const asyncHandler=require("express-async-handler");
const User=require('../models/userModel');
const bcrypt=require("bcryptjs");
const generateToken=require("../config/generateToken")

const registerUser=asyncHandler(async(req,res)=>{
    const {name,phnNo,password}=req.body;
    if(!name || !phnNo || !password){
        res.status(400);
        throw new Error("Please enter all the fields");
    }

    const userExists=await User.findOne({phnNo:phnNo});
    if(userExists){
        res.status(400);
        throw new Error("User already exists");
    }

    const user=await User.create({
        name,
        phnNo,
        password,
        
    });
    if(user){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            phnNo:user.phnNo,
            token:generateToken(user._id),
        })
    }
    else{
        res.status(400);
        throw new Error("Failed to create user");
    }

});

const authUser=asyncHandler(async(req,res)=>{
    const{phnNo,password}=req.body;
    const user=await User.findOne({phnNo});
    if(user && (await bcrypt.compare(password,user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            phnNo:user.phnNo,
            token:generateToken(user._id),
        })
    }
    else{
        res.status(401);
        throw new Error("Invalid PhoneNo or Password");
    }
});
module.exports={registerUser,authUser};