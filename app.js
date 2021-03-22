const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require ('connect-flash')
const session = require('express-session')
const passport = require('passport')

const app = express()

require('./passport')(passport)

//DB Config
const url = process.env.MongoURI
mongoose.connect(url ,{
    useNewUrlParser:true,
    useUnifiedTopology: true
})

//EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

//BodyParser
app.use(express.urlencoded({extended:false}))

//Express session middlew3are
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }))

//Passport middleware  
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash())

//Global variables
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

//Routes
const homeRouter = require('./routes/index')
const userRouter = require('./routes/users')


app.use(homeRouter)
app.use(userRouter)

const PORT = process.env.PORT

app.listen(PORT, console.log('Server running on port' , PORT))