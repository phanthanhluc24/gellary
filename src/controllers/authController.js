const authRepository=require("../repository/authRepository")
class Authentication{
    async login(req,res){
        await authRepository.login(req,res)
    }
    async register(req,res){
        await authRepository.register(req,res)
    }
    async logout(req,res){
        await authRepository.logout(req,res)
    }
    async refreshToken(req,res){
        await authRepository.refreshToken(req,res)
    }
    async currentUser(req,res){
        await authRepository.currentUser(req,res)
    }
}

module.exports=new Authentication()