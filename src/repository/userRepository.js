const UserModel = require("../models/userModel")
const Email = require("../utils/sendEmail")
const dotenv = require("dotenv")
const JWT = require("jsonwebtoken")
const bcrypt = require("bcrypt")
dotenv.config()
const TOKEN_FORGOT_PASSWORD = process.env.TOKEN_FORGOT_PASSWORD
class UserRepository {
    async forgotPassword(req, res) {
        const { email } = req.body
        const user = await UserModel.findOne({ email: email })
        if (!user) {
            return res.status(401).json({ status: 401, message: "Email not found" })
        }
        new Email(user).forgotPassword(user._id)
        return res.status(201).json({ status: 201, message: "Please open email to reset password" })
    }

    async resetPassword(req, res) {
        const {password ,token} = req.body
        const decode = JWT.verify(token, TOKEN_FORGOT_PASSWORD)
        if (!decode) {
            return res.status(401).json({status:401,message:"Token expired to reset password"})
        }
        const user = await UserModel.findById(decode.id)
        const hashPassword=await bcrypt.hash(password,10)
        user.password=hashPassword
        await user.save()
        return res.status(201).json({status:201,message:"Reset password successfully"})
    }
}

module.exports = new UserRepository()