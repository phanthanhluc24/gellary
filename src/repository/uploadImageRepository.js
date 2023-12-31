const ImageModel=require("../models/uploadImage")
const cloudinary = require("../utils/cloudinary.js")

class UploadImageRepository{
    async uploadImage(req,res){
        const userId=req.user.id;
        const imagePath=req.file.path;
        const imageName=req.file.originalname;
        const cloudinaryResponse=await cloudinary.uploader.upload(imagePath)
        const imageURL=cloudinaryResponse.secure_url
        const uploadImage=new ImageModel({
            image_name:"/"+"-"+imageName,
            imageURL,
            user_id:userId,
            folder:""
        })
        await uploadImage.save()
        return res.status(200).json({status:200,message:"Upload image successfully",imageName,imageURL})
    }

    async images(req,res){
        try {
            const userId=req.user.id
            const images=await ImageModel.find({user_id:userId,status:"active",folder:""})
            return res.status(200).json({status:200,data:images})
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async imagesTrash(req,res){
        try {
            const userId=req.user.id
            const images=await ImageModel.find({user_id:userId,status:"inactive"})
            return res.status(200).json({status:200,data:images})
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async destroy(req,res){
        try {
            const userId=req.user.id
            const id=req.params.id
            const option=req.params.option
            const destroy=await ImageModel.findOne({_id:id,user_id:userId})
            if (!destroy) {
                return res.status(409).json({status:409,message:"User don't have permission to delete this image"})
            }
            if (option==1) {
                destroy.status="inactive"
            }else if(option==2){
                destroy.status="active"
            }else if(option==3){
                destroy.status=""
            }
            await destroy.save()
            return res.status(200).json({status:200,message:"Delete image successfully"})
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}
module.exports=new UploadImageRepository()