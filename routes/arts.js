const { Router } = require('express')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const art = require('../models/art')
const fs = require('fs')

//file adding middleware
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})
const upload = multer({storage: storage})

//view all arts
router.get('/', async(req, res)=>{
    const artsOB = await art.find({})
    res.render('arts',{arts: artsOB})
})


router.get('/new',(req,res)=>{
    res.render('new')
})

//add new ARTs
router.post('/', upload.single('image'), async(req,res)=>{
    var uploadArt = new art({
        name:req.body.name,
        image:req.file.path,
        description:req.body.description,
        price:req.body.price
    })
   try{
       const savedItem =await uploadArt.save()
       res.redirect('arts')
    }
    catch{
        res.render('new',{error:'uploading error'})
    }

})

//update ARTs
router.post('/update', upload.single('image'), async (req,res)=>{
    //check is there new file uploaded.
    var artOB = await art.findById(req.body.id)
    if(req.file){
        fs.unlinkSync(artOB.image)
        artOB.image = req.file.path 
       
    }
    artOB.name=req.body.name,
    artOB.description=req.body.description,
    artOB.price=req.body.price

    try{
        await artOB.save()
        res.redirect('/arts')
    }
    catch{
        res.redirect('/arts')
    }
    
})

//delete ARTs
router.post('/delete', upload.single('image'),async(req,res)=>{
    var artOB = await art.findById(req.body.id)
    fs.unlinkSync(artOB.image)
    await art.findByIdAndDelete(req.body.id)
    res.redirect('/arts')
})

module.exports = router

