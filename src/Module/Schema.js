const mongoose=require('mongoose')

const Schema= new mongoose.Schema({
    UserImg: {type:String , required:false , trim:true },
    FullName: {type:String , required:true , trim:true },
    Email: {type:String , required:true , unique:true , trim:true },
    Passord: {type:String , required:true , trim:true },
    IsDelete:{type:Boolean, trim:true, default:false},
    IsVerify:{type:Boolean, trim:true, default:false},
    IsActive :{type:Boolean, trim:true, default:true}
  
})

module.exports= mongoose.model(' ServerData',Schema)