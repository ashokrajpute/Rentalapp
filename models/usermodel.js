require('dotenv').config();
const mongoose =require( "mongoose");

mongoose.connect(process.env.DATABASE);


let userSchema=mongoose.Schema({
    UserName:{
        type:String,
        required:true,
        maxLength: 20
    },
    UserLastName:{
        type:String,
        required:true,
        maxLength: 20
    },
    UserRole:{
        type:String,
        required:true,
        maxLength: 20
    },
    UserPhoneNo:{
        type:String,
        required:true,
        maxLength: 20
    },
    UserEmail:{
        type:String,
        required:true
    },
    UserPassword:{
        type:String,
        required:true,
        minLength:8
        
    },
    UserProperties:Array

});

const userModel=mongoose.model('Rentaldb',userSchema);
module.exports={userModel};


