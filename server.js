//check if we are in production environment
if(process.env.NODE_ENV!=="production"){
    require('dotenv').config()
}

const express =require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')


const indexPage = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views',__dirname+'/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

//databse connection
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true})

const db =mongoose.connection
db.on('error', error=>console.error(error))
db.once('open', ()=>console.log('connected to mongoose'))



//main page
app.use('/',indexPage)


app.listen(process.env.PORT||3000)
