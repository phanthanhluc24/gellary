const UserRepository=require("../repository/userRepository")
class UserController{
    async forgotPassword(req,res){
        await UserRepository.forgotPassword(req,res)
    }

    async resetPassword(req,res){
        await UserRepository.resetPassword(req,res)
    }
}
module.exports=new UserController()