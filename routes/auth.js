const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register Section
router.post("/register", async(req,res)=>{
    
    try{
    // Genarating new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create User
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            displayName: req.body.displayName,
            dateOfBirth: req.body.dateOfBirth,
        });
    // Save user to DB
        const user = await newUser.save();
        
        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//Login Section
//Login Section
router.post("/login", async(req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if (!user) {
            return res.status(404).json("User not found");
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json("wrong password");
        }

        res.status(200).json(user);
    }
    catch(err){
        res.status(500).json(err);
    }
})

module.exports = router