const Schema = require('../Module/Schema')
const bcrypt = require('bcrypt')
require('dotenv').config();
const { verifyUser } = require('../Nodemialer/Mail')
const jwt = require('jsonwebtoken')

exports.UserCreate = async (req, res) => {
  try {
    const Data = req.body;
    const { FullName, Email, Passord } = Data

    const Randomotp = Math.floor(1000 + Math.random() * 9000)
    const CheckUser = await Schema.findOneAndUpdate({ Email: req.body.Email }, { $set: { otp: Randomotp } }, { new: true })

    if (CheckUser) {
      if ((CheckUser.IsDelete) === true) { return res.status(400).send({ status: false, message: 'Your Account is Deleetd ' }) }
      if (CheckUser.IsVerify === true) { return res.status(400).send({ status: false, message: 'Your are already plzz Login ' }) }
      if (CheckUser.IsActive === false) { return res.status(400).send({ status: false, message: 'Your Account is Blocked  ' }) }
    }

    const BcrptPassword = await bcrypt.hash(Passord, 10)
    Data.Passord = BcrptPassword
    Data.Otp = Randomotp
    verifyUser(FullName, Email, Passord)

    const CreateData = await Schema.create(Data);
    const TempDta = {
      Userid: CreateData._id,
      fullName: CreateData.FullName,
      emil: CreateData.Email,
      password: CreateData.Passord
    }
    return res.status(201).send({ data: TempDta, status: true, msg: 'Registration Successfully' })
  }
  catch (e) { return res.status(500).send({ status: false, msg: e.message }) }

}


// Verify OTP 
exports.VerifyOtp = async (req, res) => {
  try {
    const id = req.params.Userid;
    const userotp = req.body.Otp

    if (!userotp) return res.status(400).send({ status: false, msg: 'Please provide OTP' })

    const CheckUser = await Schema.findById(id)

    if ((CheckUser.IsDelete) === true) { return res.status(400).send({ status: false, msg: 'Your account is deleted' }) }
    if (CheckUser.IsVerify === true) { return res.status(400).send({ status: false, msg: 'You are already verified, please login' }) }
    if (CheckUser.IsActive === false) { return res.status(400).send({ status: false, msg: 'Your account is blocked' }) }

    if (userotp !== CheckUser.Otp) return res.status(400).send({ status: false, msg: 'Wrong OTP' })

    const response = await Schema.findByIdAndUpdate({ _id: id }, { $set: { IsVerify: true } }, { new: true })

    return res.status(200).send({ status: true, msg: 'OTP verified successfully' });
  } catch (e) {
    return res.status(500).send({ status: false, msg: e.message })
  }
}


// LOGIN API 
exports.UserLogin = async (req, res) => {
  try {
    const { Email, Passord } = req.body;

    const CheckLogin = await Schema.findOne({ Email });

    if (!CheckLogin) { return res.status(404).send({ status: false, msg: 'User not found' }); }

    if (CheckLogin.IsDelete === true) {
      return res.status(400).send({ status: false, msg: 'Your Account is Deleted' });
    }

    if (CheckLogin.IsVerify === false) {
      return res.status(400).send({ status: false, msg: 'Please Verify First' });
    }

    if (CheckLogin.IsActive === false) {
      return res.status(400).send({ status: false, msg: 'Your Account is Blocked' });
    }

    const bcryptPasswordCheck = await bcrypt.compare(Passord, CheckLogin.Passord);
    if (!bcryptPasswordCheck) {
      return res.status(404).send({ status: false, msg: 'Wrong Password!' });
    }

    const token = await jwt.sign({ UserId: CheckLogin._id }, process.env.JWT_Secret_Key, { expiresIn: '12h' });

    return res.status(200).send({ UserId: CheckLogin._id, status: true, token: token, msg: 'Login Successfully' });
  } catch (e) {
    return res.status(500).send({ status: false, msg: e.message });
  }
};


exports.Userget = async (req, res) => {
  try {
    const id = req.params.Userid;
    
    const userData = await Schema.findById(id);

    if (!userData) {
      return res.status(404).send({ status: false, msg: 'User not found' });
    }

    return res.status(200).send({ Data :userData, status: true , msg:'send data successfully ' }) ; // OK response with user data
  } catch (e) {
    res.status(500).send({   status: false, msg: e.message });
  }
};


exports.Userupdate = async (req, res) => {
  try {
    const id = req.params.Userid;
    const userData = await Schema.findByIdAndUpdate(id, { $set: { role: 'admin' } }, { new: true });

    if (!userData) {
      return res.status(404).send({ msg: 'User not found' });
    }

    return res.send({ userData, status: true, msg: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: false, msg: e.message });
  }
};