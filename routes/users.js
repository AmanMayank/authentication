const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../models/User')

router.get('/users/login', (req,res) => {
    res.render('login')
})


router.get('/users/register',(req,res) => {
    res.render('register')
})

//Register Handle
router.post('/users/register', async(req,res) => {
    const { name, email, password, password2 } = req.body
    let errors = []

    //Check fields
    if(!name || !email || !password || !password2){
        errors.push({msg : 'Pleaser fill in all the fields'})
    }

    //Check Passwords match
    if(password !== password2 ){
        errors.push({msg:'Passwords do not match'})
    }

    if(password.length<6){
        errors.push({msg:'Password should be 6 characters atleast'})
    }

    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        })
    }else{
        try{
            const user = await User.findOne({ email })
            if(user){
                errors.push({msg : 'Email is already registered'})
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                })
            }else{
                const newUser = new User({
                    name,
                    email,
                    password
                })
               newUser.password = await bcrypt.hash(newUser.password, 8) 
               try{
                    await newUser.save()
                    req.flash('success_msg','You are now registered. Lets login')
                    res.redirect('login')
               }catch(e){
                    console.log(error)
               }
            }
        }catch(e){
            console.log(e)
        }
        
    }
})

//Login
router.post('/users/login', (req,res,next) => {
    passport.authenticate('local',{
      successRedirect:'/dashboard',
      failureRedirect:'/users/login',
      failureFlash:true  
    })(req,res,next)
})

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }))

router.get('/users/auth/google/callback',(req,res,next) => {
    passport.authenticate('google',{
      successRedirect:'/dashboard',
      failureRedirect:'/users/login',
      failureFlash:true  
    })(req,res,next)
})
//Logout
router.get('/users/logout',(req,res) => {
    req.logout()
    req.flash('success_msg','You are logged out')
    res.redirect('/users/login')
} )

module.exports = router