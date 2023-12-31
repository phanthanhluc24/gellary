const express=require("express")
const router=express.Router()
const authController=require("../controllers/authController")
const authMiddleware=require("../middleware/authMiddleware")
router.post("/register",authController.register)
router.post("/login",authController.login)
router.post("/logout",authMiddleware,authController.logout)
router.post("/refresh-token",authController.refreshToken)
router.get("/currentUser",authMiddleware,authController.currentUser)
module.exports=router