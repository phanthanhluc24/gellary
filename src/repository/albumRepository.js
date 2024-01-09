const AlbumModel = require("../models/albumModel")
const AlbumImageModel = require("../models/albumImageModel.js")
const cloudinary = require("../utils/cloudinary.js")
const ImageModel=require("../models/uploadImage")
const SharedModel=require("../models/sharedFolderModel.js")
class AlbumRepository {
    async createAlbum(req, res) {
        const userId = req.user.id
        const albumName = req.body.album_name
        try {
            const album = new AlbumModel({
                album_name: albumName,
                user_id: userId
            })
            await album.save()
            return res.status(200).json({ status: 200, message: "Create new album successfully" })
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }

    async updateAlbumBName(req, res) {
        const userId = req.user.id
        const { albumId, album_name } = req.body
        try {
            const album = await AlbumModel.find({ _id: albumId, user_id: userId })
            if (!album) {
                return res.status(401).json({ status: 401, error: "You don't have permission to update" })
            }
            album.album_name = album_name
            await album.save()
            return res.status(200).json({ status: 200, message: "Update successfully" })
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }

    async uploadImageAlbum(req, res) {
        const albumId = req.params.id
        const userId = req.user.id;
        try {
            const folder = await AlbumModel.findById(albumId)
            if(!folder){
                return res.status(401).json("Folder not found")
            }
            const imagePath = req.file.path;
            const imageName = req.file.originalname;
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath)
            const imageURL = cloudinaryResponse.secure_url

            const uploadImage = new ImageModel({
                image_name: "/" +"-" + imageName,
                imageURL,
                user_id: userId,
                folder: folder.album_name
            })
            await uploadImage.save()

            const albumImage = new AlbumImageModel({
                album_id: albumId,
                image_id: uploadImage._id
            })
            await albumImage.save()
            return res.status(200).json({ status: 200, message: "Upload image successfully", imageName, imageURL })
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }

    async uploadImageAlbums(req,res){
        const {albumId}=req.params
        const {imageId}=req.body
        console.log(imageId);
        try {
            const album=await AlbumModel.findById(albumId)
            if (!album) {
                return res.status(404).json({status:404,message:"Album not found"})
            }
            const albumImage=await AlbumImageModel.insertMany(imageId.map(id=>({image_id:id,album_id:albumId})))
            return res.status(201).json({ message: 'Images inserted successfully', albumImage });
        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async sharedFolder(req,res){
        const sender=req.user.id
        const {receive_id}=req.body
        const {folder_id}=req.params
        try {
            const shared=await SharedModel.insertMany(receive_id.map(id=>({sender:sender,receive_id:id,folder_id:folder_id})))
            return res.status(200).json({status:200,message:"Shared folder with someone successfully",data:shared})
        } catch (error) {
            return res.status(500).json(error)
        }
    }
    async imageAlbum(req, res) {
        const id = req.params.id
        try {
            const albumImage = await AlbumImageModel.find({ album_id: id }).populate({path:"image_id",match:{status:"active"}})
            const images = albumImage.map((albumImage) => albumImage.image_id);
            return res.status(200).json({ status: 200, data: images })
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }

    async albumName(req,res){
        const userId=req.user.id
        try {
            const album=await AlbumModel.find({user_id:userId})
            return res.status(200).json({status:200,data:album})
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }

    async getAlbumShare(req,res){
        const userId=req.user.id
        try {
            const share=await SharedModel.find({receive_id:userId}).populate("folder_id")
            const folder=share.map((folder)=>folder.folder_id)
            return res.status(200).json(folder)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}

module.exports = new AlbumRepository()