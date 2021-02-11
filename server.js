//check if we are in production environment
if(process.env.NODE_ENV!=="production"){
    require('dotenv').config()
}

const express =require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const session = require('express-session')
const {v4: uuidv4} = require('uuid')


const indexPage = require('./routes/index')
const loginPage = require('./routes/login')
const adminPage = require('./routes/admin')
const artEditRoute = require('./routes/arts')

app.set('view engine', 'ejs')
app.set('views',__dirname+'/views')
app.use('/public',express.static('public'))
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

//session
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))

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



app.listen(process.env.PORT||3001) 
 
