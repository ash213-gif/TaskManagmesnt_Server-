const { AuthName, AuthEmail, AuthPassword } = require('../Regex/Regex');
const Schema = require('../Module/Schema')


exports.AuthUser = async (req, res, next) => {
    try {
        const Data = req.body;
        const { FullName, Email, Passord } = Data;

        if (!Data) { return res.status(400).send({ status: false, message: 'Please Provide data First ' }) }
        if (!FullName) { return res.status(400).send({ status: false, message: 'Please Provide a FullNmae ' }) }
        if (!AuthName(FullName)) { return res.status(400).send({ status: false, message: 'Please Provide a  Valid FullNmae ' }) }

        if (!Email) { return res.status(400).send({ status: false, message: 'Please Provide a Email ' }) }
        if (!AuthEmail(Email)) { return res.status(400).send({ status: false, message: 'Please Provide a  ValidEmail ' }) }

        if (!Passord) { return res.status(400).send({ status: false, message: 'Please Provide a Passord ' }) }
        if (!AuthPassword(Passord)) { return res.status(400).send({ status: false, message: 'Please Provide a  ValidPassord ' }) }

        next()
    }
    catch (e) { return res.status(500).send({ status: false, msg: e.message }) }
}


exports.AuthLogin = async (req, res, next) => {
    try {
        const Data = req.body;
        const { Email, Passord } = Data;

        if (!Data) { return res.status(400).send({ status: false, message: 'Please Provide data First ' }) }
       
        if (!Email) { return res.status(400).send({ status: false, message: 'Please Provide a Email ' }) }
        if (!AuthEmail(Email)) { return res.status(400).send({ status: false, message: 'Please Provide a  ValidEmail ' }) }

        if (!Passord) { return res.status(400).send({ status: false, message: 'Please Provide a Passord ' }) }
        if (!AuthPassword(Passord)) { return res.status(400).send({ status: false, message: 'Please Provide a  ValidPassord ' }) }

        next()
    }
    catch (e) { return res.status(500).send({ status: false, msg: e.message }) }
}