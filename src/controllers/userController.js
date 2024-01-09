const UserRepository=require("../repository/userRepository")
class UserController{
    async forgotPassword(req,res){
        await UserRepository.forgotPassword(req,res)
    }

    async resetPassword(req,res){
        await UserRepository.resetPassword(req,res)
    }

    async getUsers(req,res){
        await UserRepository.getUsers(req,res)
    }
}
module.exports=new UserController()