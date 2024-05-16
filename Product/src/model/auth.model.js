import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken'
const authSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmPassword :{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    accessToken:{
        type:String,
    },
    refreshToken:{
        type:String,
    
    }
},{
    timestamps:true
})

authSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    if(!this.isModified("confirmPassword")) return next();

    this.password = await bcrypt.hash(this.password,10)
    this.confirmPassword = await bcrypt.hash(this.confirmPassword,10)
})

authSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

authSchema.methods.generateAccessToken = async function(){
    return JWT.sign({
        _id:this._id,
        email:this.email,
    },"darshilpatel",{expiresIn:"1d"})
}

authSchema.methods.generateRefreshtoken = async function(){
    return JWT.sign({
        _id:this._id,
    },"darshilpatel",{expiresIn:"10d"})
}


export const Auth = mongoose.model('Auth',authSchema);