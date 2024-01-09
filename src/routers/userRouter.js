const express=require("express")
const router=express.Router()
const UserController=require("../controllers/userController")
const authMiddleware=require("../middleware/authMiddleware")
router.post("/forgot-password",UserController.forgotPassword)
router.post("/reset-password",UserController.resetPassword)
router.get("/",authMiddleware,UserController.getUsers)
module.exports=router