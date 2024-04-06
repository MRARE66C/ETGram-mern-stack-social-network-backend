const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");
const path = require("path");


dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));
    
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middleware
app.use(express.json()); // Parses incoming JSON requests and puts the parsed data in req.body
app.use(helmet()); // Helps secure your apps by setting various HTTP headers
app.use(morgan('common')); // HTTP request logger

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    }, 
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req, res) => {
    try{
        return res.status(200).json("File uploded successfully.");
    }catch(err){
        console.log(err);
    }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// Define a route
app.get('/', (req, res) => {
    res.send("We'll Carry on");
});

app.get('/users', (req, res) => {
    res.send("I'm not Okay");
});

app.listen(8800,()=>{
        console.log("Backend Server is running!")
})