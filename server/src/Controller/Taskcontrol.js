const mongoose = require('mongoose');
const TaskSchema = require('../Module/TaskSchema')


exports.Createtask = async (req, res) => {
    try {
        const { title, description } = req.body;
        // const creator = req.user && req.user._id ? req.user._id : null;
        // console.log(req.header);

        if (!title || !description) {
            return res.status(400).send({ status: false, msg: "Title and description are required" });
        }
        // if (!creator) {
        //     return res.status(401).send({ status: false, msg: "User not authenticated" });
        // }

        const taskData = { title, description };
        const Tasksave = await TaskSchema.create(taskData);
        return res.status(201).send({ status: true, msg: "Task created successfully", data: Tasksave });
    } catch (e) {
        return res.status(500).send({ status: false, msg: e.message });
    }
}



exports.gettasks = async (req, res) => {
    try {
        const getData = await TaskSchema.find()

        if (!getData) { return res.status(400).send({ status: false, msg: 'task not found ' }) }

        
        return res.status(200).send({ getData: getData, status: true, msg: 'tasks get successfully ' })

    } catch (e) { return res.status(500).send({ status: false, msg: e.message }) }

}