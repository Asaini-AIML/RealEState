import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    username:{
        type: String,
        require:true,
        unique:true
    },
    email:{
        type: String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    }, 
    avatar:{
        type: String,
        default: "https://www.flaticon.com/free-icon/avatar_3541871"
    }
},
{timestamps: true}
);
const User=mongoose.model("User", userSchema);
export default User;