const AlbumRepository=require("../repository/albumRepository")
class AlbumController{
    async createAlbum(req,res){
        await AlbumRepository.createAlbum(req,res)
    }

    async uploadImageAlbum(req,res){
        await AlbumRepository.uploadImageAlbum(req,res)
    }

    async imageAlbum(req,res){
        await AlbumRepository.imageAlbum(req,res)
    }
    async albumName(req,res){
        await AlbumRepository.albumName(req,res)
    }
}
module.exports=new AlbumController()