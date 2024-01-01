const userRouter=require("./userRouter")
const authRouter=require("./authRouter")
const uploadImageRouter=require("./uploadImageRouter")
const authMiddleware=require("../middleware/authMiddleware")
const albumRouter=require("../routers/albumRouter")
function Router(app){
    app.use("/",userRouter)
    app.use("/auth",authRouter)
    app.use("/upload",authMiddleware,uploadImageRouter)
    app.use("/album",authMiddleware,albumRouter)
}
module.exports=Router