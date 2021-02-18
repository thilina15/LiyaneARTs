const { json } = require('body-parser')
const { Router } = require('express')
const express = require('express')
const router = express.Router()
const art = require('../models/art')
const {adminAuth} = require('../routes/adminAuth')




//save art
function saveArt(art, imageEncoded){
    if(imageEncoded==null) return
    try{
        const image = JSON.parse(imageEncoded) //covert encoded string to json format
        if(image!=null){
            art.image = new Buffer.from(image.data , 'base64') //image objects' data field -> buffer (in databse image save as a buffer)
            art.imageType = image.type 
        }
    }catch(er){
        return
    }
    
}


//view all arts
router.get('/', adminAuth,async(req, res)=>{
    const artsOB = await art.find({})
    res.render('arts',{arts: artsOB})
})


router.get('/new',adminAuth,(req,res)=>{
    res.render('new')
})

//add new ARTs
router.post('/',  async(req,res)=>{
    var uploadArt = new art({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price
    })
    saveArt(uploadArt, req.body.image) //save the image details
   try{
       await uploadArt.save()
       res.redirect('arts')
    }
    catch{
        res.render('new',{error:'uploading error'})
    }

})

//update ARTs
router.post('/update', async (req,res)=>{
    //check is there new file uploaded.
    var artOB = await art.findById(req.body.id)
    
    artOB.name=req.body.name,
    artOB.description=req.body.description,
    artOB.price=req.body.price
    saveArt(artOB,req.body.image)

    try{
        await artOB.save()
        res.redirect('/arts')
    }
    catch(er){
        res.redirect('/arts')
    }
    
})

//delete ARTs
router.post('/delete',async(req,res)=>{
    await art.findByIdAndDelete(req.body.id)
    res.redirect('/arts')
})

module.exports = router

