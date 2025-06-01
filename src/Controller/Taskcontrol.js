const mongoose = require('mongoose');
const TaskSchema = require('../Module/TaskSchema')

exports.Createtask = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).send({ status: false, msg : "Title and description are required" });
        }

        const Task = {
            title,
            description,
            creator: req.user._id // assume req.user._id is set
        };

        const Tasksave = await TaskSchema.create(Task)
        console.log(Tasksave);
        return res.status(201).send({ status: true, msg : "Task created successfully", data: Tasksave });

    }
    catch (e) {
        return res.status(500).send({ status: false, msg: e.message })
    }
}