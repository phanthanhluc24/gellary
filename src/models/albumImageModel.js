const mongoose=require("mongoose")
const Schema=mongoose.Schema

const AlbumImageSchema=new Schema({
    album_id:{type:Schema.Types.ObjectId,ref:"albums",require:true},
    image_id:{type:Schema.Types.ObjectId,ref:"images",require:true}
},{
    timestamps:true
})
const albumImageModel=mongoose.model("albumImages",AlbumImageSchema)
module.exports=albumImageModel