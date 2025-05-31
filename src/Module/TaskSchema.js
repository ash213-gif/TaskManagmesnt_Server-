const mongoose=require('mongoose')

const TaskSchema=  mongoose.Schema({
    title: {type:String , required:true ,  unique: false ,  trim:true },
    description: {type:String , required:true ,  unique: false , trim:true },
    IsComplete: {type:Boolean ,  unique: false ,default :false    },

}) 

module.exports= mongoose.model('TaskData',TaskSchema)