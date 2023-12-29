const userRouter=require("./userRouter")
function Router(app){
    app.use("/",userRouter)
}
module.exports=Router