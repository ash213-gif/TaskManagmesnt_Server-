const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/routes');
const routes = require('./routes/taskrout');
const cors =require('cors')
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const port =  process.env.port ||3030 ;

mongoose.connect(process.env.MongoDB)
    .then(() => console.log('Mongoose is Connected...'))
    .catch((e) => { console.log(e); })

app.use('/', route);
app.use('/admin', routes);


app.listen(port, () => console.log(`Server is Running on port ${port}`))