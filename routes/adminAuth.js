function adminAuth(req,res,next){
    if(req.session.user!=='liyane admin'){
        res.redirect('/login')
    }else{
        next()
    }
}

module.exports = {adminAuth}