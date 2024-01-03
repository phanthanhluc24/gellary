const express=require("express")
const router=express.Router()
const UserController=require("../controllers/userController")
router.post("/forgot-password",UserController.forgotPassword)
router.post("/reset-password",UserController.resetPassword)
module.exports=router