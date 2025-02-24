import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'
export const signup =async(req,res)=>{
   const {username,email,password}=req.body;
   const hashedpass=bcryptjs.hashSync(password,10)
   const newUser=new User({username,email,password: hashedpass});
   console.log("Sign up ho gya")
   try{
    await newUser.save();
   //  console.log(newUser)
    res.status(201).json('User created');
   }catch(e){
   res.status(500).json(e.message);
   }
}
export const signin =async(req,res,next)=>{
   const{email,password}=req.body;
   console.log("Sign in has started")
   try{
      const validUser=await User.findOne({email});
      if(!validUser){
         return next(errorHandler(401,'user not found!'));
      }
      const validPassword=bcryptjs.compareSync(password,validUser.password);
      if(!validPassword){
         return next(errorHandler(401,'wrong creds!'));
      }
      console.log("Before jwt")
      const token =jwt.sign({id: validUser._id },'ihacscsjab')
      const {password: pass, ...rest}=validUser._doc;
      res.cookie('access_token',token,{httOnly: true}).status(200).json(rest);
      console.log('user signin');
   }catch(e){
  next(e);
   }
}
export const google = async (req, res, next) => {
   try {
     const user = await User.findOne({ email: req.body.email })
     if (user) {
       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
       const { password: pass, ...rest } = user._doc;
       res
         .cookie('access_token', token, { httpOnly: true })
         .status(200)
         .json(rest);
         
     } else {
       const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
       const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email: req.body.email, password: hashedPassword, avatar: req.body.photo });
       await newUser.save();
       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
       const { password: pass, ...rest } = newUser._doc;
       res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
       
     }
   } catch (error) {
     next(error)
   }
 }
