const mongoose = require("mongoose")
const Schema = mongoose.Schema

const imageSchema = new Schema({
    image_name: {
        type: String,
        required: [true, 'An image must have a name'],
        maxlength: [255, 'Image name must have less or equal than 255 characters'],
    },
    imageURL: {
        type: String,
        required: true,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        require:true
    },
    status: {
        type: String,
        default: "active",
    },
    favorite_image: {
        type: String,
        default: "inactive",
    },
    folder:{
        type:String
    }
}, {
    timestamps: true
})

const imageModel=mongoose.model("images",imageSchema)
module.exports=imageModel