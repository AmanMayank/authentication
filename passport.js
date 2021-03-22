const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const GoogleStrategy = require('passport-google-oauth2').Strategy

// Load User model
const User = require('./models/User');
const GoogleUser = require('./models/GoogleUser')

module.exports = function(passport) {

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Incorrect password'})
          }
        })
      })
    })
  )

  passport.use(new GoogleStrategy({
    clientID: process.env.clientID,
    clientSecret:'t9mMOySzFl65-hGoSQnljPUI',
    callbackURL: process.env.callbackURL
  },
  async(accessToken, refreshToken, profile, done) =>  {
      const newGoogleUser = {
        googleId:profile.id,
        displayName:profile.displayName
      }
      try{
        let googleuser = await GoogleUser.findOne({googleId:profile.id})
        if(googleuser){
          done(null, googleuser)
        }else{
          googleuser = await GoogleUser.create(newGoogleUser)
          done(null,user)
        }
      }catch(e){
        console.log(e)
      }
  }
))

   passport.serializeUser((user, done) =>  {
    done(null, user.id);
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user)=> done(err, user))
  })
}
    

