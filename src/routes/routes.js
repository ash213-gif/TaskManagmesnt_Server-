const express=require('express');
const {UserCreate ,UserLogin ,VerifyOtp ,Userget }=require('../Controller/User')
const {AuthUser ,AuthLogin   } =require('../Middleware/UserAuth')
const route=express.Router();

route.post('/registration', AuthUser, UserCreate )
route.post('/login', AuthLogin , UserLogin )
route.post('/verifyOtp/:Userid' , VerifyOtp)

    
route.get('/getUser', Userget )

module.exports=route;