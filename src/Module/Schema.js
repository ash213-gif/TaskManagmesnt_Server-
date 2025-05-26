const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    FullName: { type: String, required: true, trim: true },
    Email: { type: String, required: true, unique: true, trim: true },
    Passord: { type: String, required: true, trim: true },
    Otp: { type: String, required: false, trim: true },
    role : { type: String, enum:['user' , 'admin' ] , required: true, trim: true, default: 'user' },
    IsDelete: { type: Boolean, trim: true, default: false },
    IsVerify: { type: Boolean, trim: true, default: false },
    IsActive: { type: Boolean, trim: true, default: true },
    tasks: [{ type: mongoose.Types.ObjectId  , ref: 'task' }]
})

module.exports = mongoose.model(' ServerData', Schema)