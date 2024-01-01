const express=require("express")
const router=express.Router()
const AlbumController=require("../controllers/albumController")
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, "-" + file.originalname)
    }
})
const uploadStorage = multer({ storage: storage })
router.post("/",AlbumController.createAlbum)
router.post("/upload/:id",uploadStorage.single("image"),AlbumController.uploadImageAlbum)
router.get("/:id",AlbumController.imageAlbum)
router.get("/",AlbumController.albumName)
module.exports=router