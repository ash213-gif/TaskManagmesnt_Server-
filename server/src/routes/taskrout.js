const express = require('express');
const route = express.Router();

const {Createtask , gettasks} =require('../Controller/Taskcontrol')
const {authenticate} =require('../Middleware/TaskMiddle')

route.post('/createtask' , Createtask)
route.get('/gettasks' , gettasks)
module.exports = route;


