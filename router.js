const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const mailschema = require('./dataSchemas/MailSchema')
const Temp = require('./dataSchemas/templateSchema')


router.post('/sendmail',(req,res)=>{
    var newmail = new mailschema({
        to:         req.body.to,
        from :      req.body.from,
        subject:    req.body.subject,
        mailcontent:req.body.mailcontent,
        reply:      req.body.reply     
    })
    newmail.save()
    .then(newmail=>{res.send(newmail)}
    ,(e)=>{res.status(400).send(e)}
    )
})

router.get('/getsent',async(req,res)=>{
    const username=req.query.username;
    console.log(username)
    const sent =await  mailschema.find({from:username})
    res.send(sent)
})

router.get('/getreceived',async(req,res)=>{
    const user=req.query.user;
    console.log(user)
    const receivedmails =await  mailschema.find({to:user})
    res.send(receivedmails)
})

router.get('/getparticularmail',async(req,res)=>{
    const id = req.query.id;
    console.log(id)
    const mail = await mailschema.find({_id:id})
    res.send(mail)
})

router.get('/getallmails',async(req,res)=>{
    const mails= await mailschema.find()
    res.send(mails)
})

router.route('/posts').post(async(req,res)=>{
	const post = new Temp({
		title: req.body.title,
		html:req.body.html,
		content: req.body.content,
	})
	await post.save()
	res.send(post)
})

router.get('/gettemps',async(req,res)=>{
    const temps=await Temp.find()
    res.send(temps)
})

router.get('/hey',(req,res)=>{
    res.send('EveryThing is working good')
})

module.exports= router   
