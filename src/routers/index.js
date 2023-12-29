const userRouter=require("./userRouter")
const authRouter=require("./authRouter")
function Router(app){
    app.use("/",userRouter)
    app.use("/auth",authRouter)
}
module.exports=Router