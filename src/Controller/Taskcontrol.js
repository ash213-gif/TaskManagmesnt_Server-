const mongoose = require('mongoose');
const TaskSchema = require('../Module/TaskSchema')

exports.Createtask = async (req, res) => {
    try {
        const id = req.params.UserId
        console.log(id);
        const Task = req.body;
        
        const { title, description } = Task;

        if (!title || !description) {
            return res.status(400).send({ status: false, message : "Title and description are required" });
        }

        const Tasksave = await  TaskSchema.create(Task)
        console.log(Tasksave);
        return res.status(201).send({ status: true, message : "Task created successfully", data: Tasksave });

    }
    catch (e) {

        return res.status(500).send({ status: false, msg: e.message })
    }

}