const UploadImageRepository=require("../repository/uploadImageRepository")
class UploadImageController{
    async upload(req,res){
        await UploadImageRepository.uploadImage(req,res)
    }
    async images(req,res){
        await UploadImageRepository.images(req,res)
    }
    async destroy(req,res){
        await UploadImageRepository.destroy(req,res)
    }
    async imagesTrash(req,res){
        await UploadImageRepository.imagesTrash(req,res)
    }
}
module.exports=new UploadImageController()