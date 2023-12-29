const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userModel = new Schema({
    name: {
        type: String,
        required: [true, 'A user must have a name'],
        trim: true,
        maxlength: [40, 'Name must be have less or equal than 40 characters'],
        minlength: [3, 'Name must be over 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide your password'],
        minlength: [8, 'A password must be have more or equal than 8 characters'],
    },
    role: {
        type: String,
        default: "user",
    },
    refreshToken: {
        type: String,
        default: "null",
    },
    status: {
        type: String,
        default: "active"
    },
}, {
    timestamps: true
});
const User = mongoose.model('users', userModel);

module.exports = User;
