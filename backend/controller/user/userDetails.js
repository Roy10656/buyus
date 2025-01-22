const userModel = require("../../models/userModels")

async function userDetailsController(req,res) {
    try {
        console.log("userID", req.userId)
        const user = await userModel.findById(req.userId)

        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message : "User Details"
        })

        console.log("User", user)

    } catch (err) {
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}


module.exports = userDetailsController