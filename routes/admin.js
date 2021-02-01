const express = require('express')
const router = express.Router()
const {adminAuth} = require('../routes/adminAuth')
const admins = require('../models/admin')


//main admin page
router.get('/',adminAuth,async(req,res)=>{
    var admin = await admins.findOne({})
    res.render('admin', {admin:admin})
})


//account details update
router.post('/account', async(req,res)=>{
    var adminOB = await admins.findOne({})
    adminOB.name= req.body.name
    adminOB.email = req.body.email
    adminOB.contactNumber = req.body.contactNumber
    try{
        await adminOB.save() 
        res.redirect('/admin')
    }catch(err){
        res.redirect('/admin') 
    }
})


//login details update
router.post('/login' ,async(req,res)=>{
    var adminOB = await admins.findOne({})
    if(adminOB.password!==req.body.currentPassword){
        res.redirect('/admin')
    }else{
        adminOB.userName=req.body.userName
        adminOB.password=req.body.newPassword
        try{
            await adminOB.save()
            res.redirect('/admin')
        }
        catch(err){ 
            res.redirect('/admin')
        }
    }
})

//logout
router.get('/logout' , (req,res)=>{
    req.session.destroy()
    res.redirect('/login')
})

module.exports = router