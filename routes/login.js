const express = require('express')
const router = express.Router()
const admin = require('../models/admin')

router.get('/',(req,res)=>{
    res.render('login')
})

router.post('/',async (req,res)=>{
    const log = await admin.findOne({"userName":req.body.userName,"password":req.body.password})
    if(log!==null){
        req.session.user='liyane admin'
        res.redirect('admin')
    }else{
        res.render('login', {error: 'invalid login details'})
    }
})

module.exports = router  