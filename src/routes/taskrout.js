const express = require('express');
const route = express.Router();

const {Createtask} =require('../Controller/Taskcontrol')

route.post('/createtask/:UserId', Createtask)
module.exports = route;


