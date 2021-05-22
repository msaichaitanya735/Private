const express = require("express");
const router = express.Router();
const UserModel = require("./dataSchemas/UserSchema");
const jwt = require("jsonwebtoken");
const sendMailer = require("./SendMailer");


function isAuthenticated(req, res, next) {
    
    if(req.header.isauthorization){
        const token = req.header.authorization.split(" ")[1];
        jwt.verify(token, "secret", (err, user) =>{
            if(!user) return res.json({message:"User not authenticated"})
        });
    }
   
}

router.get("/protected", isAuthenticated, async (req,res) => {
   return res.json({message:"This is Protected"});
});

router.post("/user", async (req, res) => {
    const { token } = req.body.data;
    jwt.verify(token, "secret", (err, user) => {
        console.log(user);
        return res.json(user);
    })
})

router.get("/verify/:id", async (req, res) => {
	const { id } = req.params;
  const user = await UserModel.findOne({ _id: id });
  if (user) {
  	user.active = true;
      user.save();
    res.redirect("http://localhost:3000/login");
  } else {
  	return res.json({ message: "User doesn't exist" });
  }
});

router.post("/login", async (req,res) =>{
      const {username, password } = req.body.data;
      if(!username || !password) return res.json({
        message:"Invalid credentials"
    });
    const user = await UserModel.findOne({username: username});
    if(user){
        if(user.password === password && user.active === true) {
            const payload = {
                username,
                email:user.email,
                phonenumber:user.phonenumber,
                id:user._id  
            };
            jwt.sign(payload, "secret", { expiresIn: "1d"}, (err, token) => {
                if (err) console.log(err);
                else{
                    return res.json({
                        message:"User logged In",
                        token:token
                    });
                }
            });
        
        }else{
            return res.json({message:"Incorrect password"});
        }
    }else{
        return res.json({message:"Incorrect credentials"})
    }
});

router.post("/signup",async(req, res) => {
     const {username, password, email, phonenumber } = req.body.data;
  

     if(!username || !password || !email || !phonenumber) return res.json({
         message:"Invalid credentials"
         
     });
     const userExists = await UserModel.findOne({username: username});
     if(userExists)
     return res.json({message: "User already exists"});
     
     else{
        const newUser = new UserModel({
             username,
             password,
             email,
             phonenumber
         });
         await sendMailer(newUser.email, newUser.id);
         newUser.save();
         return res.json({message: "User created", newUser});
      }
});

module.exports = router;