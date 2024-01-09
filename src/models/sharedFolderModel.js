const mongoose = require("mongoose")
const Schema = mongoose.Schema
const sharedFolderSchema=new Schema({
    sender:{
        type:Schema.Types.ObjectId,ref:"users",require:true
    },
    receive_id:{
        type:Schema.Types.ObjectId,ref:"users",require:true
    },
    folder_id:{
        type:Schema.Types.ObjectId,ref:"albums",require:true
    }
},{
    timestamps:true
})
const shareFolderModel=mongoose.model("sharedFolder",sharedFolderSchema)
module.exports=shareFolderModel