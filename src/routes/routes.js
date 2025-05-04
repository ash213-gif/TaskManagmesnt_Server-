const express=require('express');
const {UserCreate ,UserLogin ,VerifyOtp }=require('../Controller/User')
const {AuthUser ,AuthLogin   } =require('../Middleware/UserAuth')
const route=express.Router();

route.post('/registration', AuthUser, UserCreate )
route.post('/login', AuthLogin , UserLogin )
route.post('/verifyOtp/:_id' , VerifyOtp)

module.exports=route;