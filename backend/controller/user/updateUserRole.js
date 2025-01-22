const userModel = require("../../models/userModels")

async function updateUserRole (req, res) {
    try {

        const sessionUser = req.userId;


        const { userId,email, fname, lname, role } = req.body

        const payload = {
            ...(email && { email : email}),
            ...(fname && { fname : fname}),
            ...(lname && { lname : lname}),
            ...(role && { role : role})
        }

        const user = await userModel.findById(sessionUser)

        console.log("user role", user.role)

        const updateUser = await userModel.findByIdAndUpdate(userId, payload)

        res.json({
            data : updateUser,
            message : "User Updated",
            success : true,
            error : false,
        })



    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = updateUserRole;