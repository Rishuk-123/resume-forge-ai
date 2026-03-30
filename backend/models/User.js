const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,

    },
    resumes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Resume' 
    }],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports=mongoose.model('User',UserSchema);