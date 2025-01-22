const userModel = require("../../models/userModels")
const bcrypt = require('bcryptjs')

async function userSignUpController(req, res) {
    try {
        const { email, password, fname, lname } = req.body

        if (!email) {
            return res.status(400).json({ message: "Please provide email", error: true, success: false })
        }

        if (!password) {
            return res.status(400).json({ message: "Please provide password", error: true, success: false })
        }

        if (!fname) {
            return res.status(400).json({ message: "Please provide first name", error: true, success: false })
        }

        if (!lname) {
            return res.status(400).json({ message: "Please provide last name", error: true, success: false })
        }

        const user = await userModel.findOne({ email })
        if (user) {
            return res.status(409).json({ message: "Email already has an account", error: true, success: false })
        }

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = userSignUpController
