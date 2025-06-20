const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { User }=require('../Module/Schema')

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        // const  JWT_Secret_Key= process.env.JWT_Secret_Key
        const decoded = jwt.verify(token, process.env.JWT_Secret_Key );
        const user = await User.findOne({ _id: decoded._id });
        if (!user) {
            throw new Error(); 
        }
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};