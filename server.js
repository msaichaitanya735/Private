const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = process.env.PORT||8080

app.use(express.json()) 
app.use(cors())

mongoose.connect("mongodb://chay735:12345@cluster0-shard-00-00.vc73i.mongodb.net:27017,cluster0-shard-00-01.vc73i.mongodb.net:27017,cluster0-shard-00-02.vc73i.mongodb.net:27017/MailingSystem?ssl=true&replicaSet=atlas-b75ejt-shard-0&authSource=admin&retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Mongo DB onnected "))
        .catch(err => {
            console.log(err);
        })
        

app.use("/auth", require("./auth"))
app.use("/",require('./router'))

        
app.listen(PORT,()=>console.log("Runnig on port:",PORT))

