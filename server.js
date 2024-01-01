const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")
const cookieParser=require("cookie-parser")
dotenv.config()
const PORT=process.env.PORT
const app=express()
const router=require("./src/routers/index")
const corsOptions={
    origin: "http://localhost:5173",
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    // optionsSuccessStatus: 204
}
app.use(cookieParser())
mongoose.connect('mongodb+srv://lucphan24:Luc1234@gallery.tqvelmf.mongodb.net/gallery?retryWrites=true&w=majority')
.then(()=>{
    console.log("Connect to database successfully");
})
.catch(()=>{
    console.log("Connect to database false");
})
app.use(express.urlencoded({extended:true,limit:"10mb"}))
app.use(express.json({limit:"10mb"}))

app.use(cors(corsOptions))
app.use(express.static("uploads"))
router(app)
app.listen(PORT,()=>{
    console.log("Server listening on port ",PORT);
})