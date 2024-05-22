const express=require('express');
const jwt=require('jsonwebtoken'); 
const {userModel} =require('../models/usermodel');
const {authRoute,authlogin,delfav}=require("./authRoutes");
const bcrypt = require('bcrypt');


let userRouter=express.Router();

userRouter.get('/',(req,res)=>{
    res.json({
        message:"verfied User"
    });
});

userRouter.post('/ut',authRoute,(req,res)=>{
    res.json({
        message:"verfied User"
    });
});

userRouter.post('/login',authlogin,(req,res)=>{
    //console.log(req.UserID);
   try{ let id=req.UserID;
    var token = jwt.sign({ id }, process.env.SECRET_KEY);
    console.log(token);
    res.cookie('AshokCookie',token,{httpOnly:false});
    res.json({
        message:"Succesfully Logined",
       
    });}
    catch(err){
        res.json({
            message:"Unable to login Please try again"
        });
    }
});


userRouter.post('/register',async (req,res)=>{
    try{
        console.log("register");
    if(req.body.UserName&&req.body.UserEmail&&req.body.UserPassword&&req.body.Role&&req.body.Lastname&&req.body.PhoneNo){

const salt = bcrypt.genSaltSync(10);
   const hash = bcrypt.hashSync(req.body.UserPassword, salt);

    let data={
        UserName:req.body.UserName,
        UserLastName:req.body.Lastname,
        UserRole:req.body.Role,
        UserPhoneNo:req.body.PhoneNo,
        UserEmail:req.body.UserEmail,
        UserPassword:hash
    };
    let user=await userModel.create(data);
 if(user){
 res.json({
        message:"i am registered"
    });}
    else[
        res.json({
            message:"NOT REGISTERED"
        })
    ]
}else{
    res.json({
        message:"Enter All Details"
    });
}
}catch(err){
    res.json({
        message:err.message+' backend'
    })
}
});//agar logined he to register na kar paye

userRouter.get('/logout',async (req,res)=>{
 try{
    res.cookie('AshokCookie','',{ maxAge:1});
    res.json({
        message:'Succesfully logout'
    });
 }
 catch(err){
    res.json({
        message:"Unable to Logout"
    });
 }


});//agar logined nahi he tabhi logout ho paye ya khule

userRouter.post('/isauthenticated',authRoute,(req,res)=>{



    res.json({
        message:"verfied User",
        UserName:req.UserName,
        UserEmail:req.UserEmail,
        Role:req.Role,
        Lastname:req.Lastname,
        PhoneNo:req.PhoneNo,
        UserProperties:req.UserProperties
    });

});


userRouter.post('/addproperty',async (req,res)=>{
 console.log("addproperty",req.body.UserEmail,req.body.properyadd,req.body.bedrooms,req.body.bathrooms);
try{const d={
    Address:req.body.properyadd,
    PhoneNo:req.body.PhoneNo,
    Bedrooms:req.body.bedrooms,
    Bathrooms:req.body.bathrooms
}
let t=await userModel.updateOne(
    { "UserEmail":req.body.UserEmail}, // Query to find the document
    { $push: { UserProperties: d } } // Update operation using $push to add "newItem" to the "items" array
  );
  console.log(t);
  res.json({
    message:"Succesful"
});
}
catch(err){
    res.json({
        message:"Unsuccesful"
    })
}
});
userRouter.post('/deleteproperty',async (req,res)=>{
    console.log("addproperty",req.body.UserEmail,req.body.properyadd,req.body.bedrooms,req.body.bathrooms);
    try{const d={
        Address:req.body.properyadd,
        PhoneNo:req.body.PhoneNo,
        Bedrooms:req.body.bedrooms,
        Bathrooms:req.body.bathrooms
    }
    const result = await userModel.updateOne(
        { "UserEmail":req.body.UserEmail  },
        { $pull: { UserProperties: d } }
      );

      res.json({
        message:"Succesful"
    });

}catch(err){
    res.json({
        message:"Unsuccesful"
    })
}

});









userRouter.get('/allsellerdata',async(req,res)=>{
    try {
        const users = await userModel.find({ UserRole: "seller" }).select('UserName UserLastName UserRole UserPhoneNo UserEmail UserProperties -_id');
        console.log(users);
        res.send(users);
      } catch (err) {
        console.error(err);
        res.send(err);
      }
      


})




module.exports={userRouter};