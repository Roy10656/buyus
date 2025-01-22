const userModel = require("../../models/userModels")

async function allUsers(req, res) {
    try {
        console.log("userid all", req.userId)

        const allUsers = await userModel.find()


        res.json({
            message : "All User Details",
            data : allUsers,
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


module.exports = allUsers