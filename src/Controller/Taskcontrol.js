const User = require('../Module/Schema')
const Task =require('../Module/TaskSchema')

exports.Createtask= async  (req,res)=>{
    try{
        const { title, description } = req.body;
        
       const {_id}=req.headers;
        const newTask = new Task({ title: title, description: description });
        const saveTask = await newTask.save()
        const taskId = saveTask._id
        await User.findByIdAndUpdate(_id, { $push: { tasks: taskId._id } });
        res.status(200).json({ message: "Task Created" });
    }
    catch(e){
        
        return res.status(500).send({ status:false ,msg:e.message })
    }

}