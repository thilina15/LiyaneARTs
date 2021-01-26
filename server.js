//check if we are in production environment
if(process.env.NODE_ENV!=="production"){
    require('dotenv').config()
}

const express =require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


const indexPage = require('./routes/index')
const loginPage = require('./routes/login')
const adminPage = require('./routes/admin')
const artEditRoute = require('./routes/arts')

app.set('view engine', 'ejs')
app.set('views',__dirname+'/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

//databse connection
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true})

const db =mongoose.connection
db.on('error', error=>console.error(error))
db.once('open', ()=>console.log('connected to mongoose'))



//routes
app.use('/',indexPage)
app.use('/login',loginPage)
app.use('/admin',adminPage)
app.use('/arts',artEditRoute)

app.get('/kamal', (req,res)=>{
    res.send('inside kamal')
})

app.listen(process.env.PORT||3000)

//hellow
// creater from branch JB
//second comment from JB