
require('dotenv').config();
const jwt=require('jsonwebtoken'); 
const {userModel} =require('../models/usermodel');
const bcrypt = require('bcrypt');

module.exports.authRoute=async function authRoute(req,res,next){
    try{
        if(req.body.token){
    var decoded = jwt.verify(req.body.token,process.env.SECRET_KEY);
     
      let user=await userModel.findById(decoded.id);
      if(user){
      
        req.UserID=user._id;
        req.UserName=user.UserName;
        req.Lastname=user.Lastname;
        req.PhoneNo=user.PhoneNo;
        req.Role=user.UserRole;
        req.UserEmail=user.UserEmail;
        req.UserProperties=user.UserProperties;
        next();
      }
      else{
        res.json({
            message:"LOGIN FIRST"
        });
      }
        }
        else{
            res.json({
                message:"LOGIN FIRST"
            });
        }
    }
    catch(err){
        res.json({
            message:err.message
        });
    }
}


module.exports.authlogin=async function authlogin(req,res,next){
    
  try{
      let user=await userModel.findOne({UserEmail:req.body.UserEmail});
     
      if(user){
        let t=bcrypt.compareSync(req.body.UserPassword,user.UserPassword);
        if(t){
          req.UserID=user._id;
         
        
         
        next();
  
        }
        else{
          res.json({
              message:"Invalid Credentials"
          });
        }
      }else{
          res.json({
              message:"Invalid Credentials"
          });
      }
  
  }catch(err){
      res.json({
          message:err.message
      });
  }
  }




  

