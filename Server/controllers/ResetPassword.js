const User = require("../models/User");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");
require("dotenv").config();

//reset Password token
exports.resetPasswordToken=async (req,res)=>{
    try{
        //get email from req body
        const email=req.body.email;
        //checkuser for this email,email validation
        const user=await User.findOne({email:email});
        if(!user){
            return res.json({
                success:false,
                message:'Your Email is not registered with us'
            });
        }
        //generate token
        const token= crypto.randomBytes(20).toString("hex");
        //update user by adding token and expiration time
        const updatedDetails=await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires:Date.now()+5*60*1000,
            },
            {new:true}
        );
        //create url
        const url=`http://localhost:3000/update-password/${token}`
        //send mail containing the url
        await mailSender(email,"Password Reset Link",
                        `Password Reset Link : ${url}`
                        );
        //return response
        return res.json({
            success:true,
            message:'Email sent successfully,please check email and change password',
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:'Something went wrong while reset password'
        })
    }
    
}


//reset password
exports.resetPassword=async (req,res)=>{
    try
    {
        //data fetch
        const {password,confirmPassword,token}=req.body;
        //validation
        if(password !== confirmPassword){
            return res.json({
                success:false,
                message:'Password do not match',
            });
        }
        //get userdetails from db using token
        const userDetails=await User.findOneAndUpdate({token:token});
        //if no entry- invalid token
        if(!userDetails)
        {
            return res.json({
                success:false,
                message:'Token is invalid',
            });
        }
        //token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:'Token is expired,please regenerate your token',
            });
        }
        //hash pwd
        const hashedPassword=await bcrypt.hash(password,10);

        //password update
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true},
        );
        //return response
        return res.status(200).json({
            success:true,
            message:'Password reset successfully'
        })
    }
    catch(error)
    {
        return res.status().json({
            success:false,
            message:"Error while resetting the password"
        })
    }

}

