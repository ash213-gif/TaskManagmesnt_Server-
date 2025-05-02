const Schema = require('../Module/Schema')
const bcrypt = require('bcrypt')
require('dotenv').config();
const jwt = require('jsonwebtoken')

exports.UserCreate = async (req, res) => {
    try {
        const Data = req.body;
        const { FullName, Email, Passord } = Data

        const CheckUser = await Schema.findOne({ Email: req.body.Email })

        if (CheckUser) {
            if ((CheckUser.IsDelete) === true) { return res.status(400).send({ status: false, message: 'Your Account is Deleetd ' }) }
            if (CheckUser.IsVerify === true) { return res.status(400).send({ status: false, message: 'Your are already plzz Login ' }) }
            if (CheckUser.IsActive === false) { return res.status(400).send({ status: false, message: 'Your Account is Blocked  ' }) }
        }

        const BcrptPassword = await bcrypt.hash(Passord, 10)
        Data.Passord = BcrptPassword

        const CreateData = await Schema.create(Data);
        return res.status(201).send({ data: CreateData, status: true, msg: 'Registration Successfully' })
    }
    catch (e) { return res.status(500).send({ status: false, msg: e.message }) }

}

// LOGIN API 

exports.UserLogin = async (req, res) => {
    try {
        const Data = req.body;
        const { Email, Passord } = Data;

        const CheckUser = await Schema.findOne({ Email:Email })
        console.log(CheckUser.Email);

        if (CheckUser) {
            if ((CheckUser.IsDelete) === true) { return res.status(400).send({ status: false, message: 'Your Account is Deleetd ' }) }
            if (CheckUser.IsVerify === false ) { return res.status(400).send({ status: false, message: 'Please Verify First ' }) }
            if (CheckUser.IsActive === false) { return res.status(400).send({ status: false, message: 'Your Account is Blocked  ' }) }
        }

        if (CheckUser) {
            if (CheckUser.Email != Data.Password) { return res.status(400).send({ status: false, message: 'Wrong Password' }) }
        }

        return res.status(200).send({status:true , message :'Login Successsfully '})

    } catch (e) {  return res.status(500).send({status:false , msg:e.message })  }


}