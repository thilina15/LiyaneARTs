const express = require('express')
 const router = express.Router()
 const art = require('../models/art')


//main page
router.get('/',async(req,res)=>{
    const arts = await art.find({})
    res.render('index',{arts:arts})
})

module.exports = router