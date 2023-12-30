const JWT=require("jsonwebtoken")
const dotenv=require("dotenv")
dotenv.config()
const ACCESS_JWT=process.env.TOKEN_JWT
// const REFRESH_JWT=process.env.REFRESH_TOKEN_JWT
function authMiddleware(req,res,next){
    const access_token=req.headers.authorization
    if (!access_token) {
       return res.status(401).json({status:401,message:"does not provide token"}) 
    }
    const token=access_token.split(" ")
    JWT.verify(token[1],ACCESS_JWT,(err,user)=>{
        if (err) {
            return res.status(401).json("Token expired!")
        }
        req.user=user
        next()
    })
}

module.exports=authMiddleware