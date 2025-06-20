const express=require('express');
const {UserCreate ,UserLogin ,VerifyOtp ,Userget ,Userupdate }=require('../Controller/User')
const {AuthUser ,AuthLogin   } =require('../Middleware/UserAuth')
const route=express.Router();

route.post('/registration', AuthUser, UserCreate )
route.post('/login', AuthLogin , UserLogin )
route.post('/verifyOtp/:Userid' , VerifyOtp)  

route.get('/getUser/:Userid', Userget )

route.put('/Userupdate/:Userid' ,Userupdate )

route.get('/', (req, res) => {
  res.send('my routes are working!');
});


module.exports=route;