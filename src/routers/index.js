const userRouter=require("./userRouter")
const authRouter=require("./authRouter")
const uploadImageRouter=require("./uploadImageRouter")
const authMiddleware=require("../middleware/authMiddleware")
function Router(app){
    app.use("/",userRouter)
    app.use("/auth",authRouter)
    app.use("/upload",authMiddleware,uploadImageRouter)
}
module.exports=Router