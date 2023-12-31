const express=require("express")
const router=express.Router()
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null,"-" + file.originalname)
    }
})
const uploadStorage = multer({ storage: storage })
const UploadImageController=require("../controllers/uploadImageController")
router.post("/image",uploadStorage.single("image"),UploadImageController.upload)
router.get("/",UploadImageController.images)
router.get("/trash",UploadImageController.imagesTrash)
router.patch("/:id/:option",UploadImageController.destroy)
module.exports=router