const mongoose=require('mongoose')

const TaskSchema= new mongoose.Schema({
    title: {type:String , required:true , trim:true },
    description: {type:String , required:true , trim:true },
    Complete: {type:Boolean , default :false   , trim:true },
    Incomplete: {type:Boolean , default :false , trim:true },
    

}) 

module.exports= mongoose.model(' TaskData',TaskSchema)