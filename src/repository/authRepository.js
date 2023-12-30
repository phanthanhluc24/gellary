const UserModel = require("../models/userModel")
const validator = require("validator")
const bcrypt = require("bcrypt")
const JWT = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()
const ACCESS_JWT = process.env.TOKEN_JWT
const REFRESH_JWT = process.env.REFRESH_TOKEN_JWT
class AuthRepository {
    async register(req, res) {
        const { name, email, password } = req.body
        if (validator.isEmpty(name)) {
            return res.status(400).json({status:400, error: "Field name is required" })
        }
        if (validator.isEmpty(email)) {
            return res.status(400).json({status:400, error: "Field email is required" })
        }if (validator.isEmpty(password)) {
            return res.status(400).json({status:400, error: "Field password is required" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({status:400, error: "Invalid email address" })
        }
        const checkEmail = await UserModel.findOne({ email })
        if (checkEmail) {
            return res.status(400).json({status:400,error:"Email is already is use"})
        }
        const hashPassword = await bcrypt.hash(password, 10)

        const user = new UserModel({
            name,
            email,
            password: hashPassword
        })
        try {
            await user.validate();
        } catch (validationError) {
            return res.status(400).json({status:400, error: validationError.message.split(":")[2].trim() });
        }
        try {
            await user.save();
            return res.status(201).json({ data: user,message:"Create account successfully" });
        } catch (saveError) {
            return res.status(500).json({ error: 'Error saving user to the database' });
        }
    }
    async login(req, res) {
        const { email, password } = req.body
        try {
            const user = await UserModel.findOne({ email })
            if (!user) {
                return res.status(401).json({status:401, error: "Account has not yet been created" })
            }
            const comparePassword = await bcrypt.compare(password, user.password)
            if (!comparePassword) {
                return res.status(401).json({status:401, error: "Wrong password to login" })
            }
            const payload = { id: user._id }
            const accessToken = this.generateAccessToken(payload)
            const refreshToken = this.generateRefreshAccessToken(payload)
            user.refreshToken = refreshToken
            await user.save()
            res.cookie("access-token", accessToken, { maxAge: 15 * 1000 })
            res.cookie("refreshToken", refreshToken, { maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: true })
            return res.status(200).json({status:200,message:"Login successfully", accessToken })
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    generateAccessToken(payload) {
        return JWT.sign(payload, ACCESS_JWT, { expiresIn: "15s" })

    }
    generateRefreshAccessToken(payload) {
        return JWT.sign(payload, REFRESH_JWT, { expiresIn: "7d" })
    }

    async logout(req, res) {
        const idUser=req.user.id
        const user=await UserModel.findById(idUser)
        user.refreshToken="null"
        await user.save()
        res.clearCookie("access-token")
        res.clearCookie("refreshToken")
        return res.status(200).json({message:"Logout successfully"})
    }
    async refreshToken(req, res) {
        const refreshToken=req.cookies["refreshToken"]
        try {
            const decoded=JWT.verify(refreshToken,REFRESH_JWT)
            const userId=decoded.id
            const user =await UserModel.findOne({_id:userId,refreshToken:refreshToken})
            if (!user) {
                return res.status(401).json({message:"Invalid refreshToken "})
            }
            const newAccessToken=this.generateAccessToken({id:user._id})
            res.cookie("access-token",newAccessToken,{maxAge:15*1000})
            return res.status(200).json({newAccessToken})
        } catch (error) {
            return res.status(500).json(error)
        }
        
    }

    async currentUser(req,res){
        const userId=req.user.id
        const user=await UserModel.findById(userId).select("-_id name")
        return res.status(200).json(user)
    }

}
module.exports = new AuthRepository()