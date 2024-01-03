const mongoose = require("mongoose")
const Schema = mongoose.Schema
const albumSchema=new Schema({
    album_name: {
        type: String,
        required: [true, 'An album must have a name'],
        trim: true,
        maxlength: [255, 'Album name must have less or equal than 255 characters'],
      },
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        require:true
      }
},{
    timestamps:true
})
const albumModel=mongoose.model("albums",albumSchema)
module.exports=albumModel