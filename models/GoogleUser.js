const mongoose=require('mongoose')

const googleUserSchema = new mongoose.Schema({
    
    googleId:{
        type:String,
        required:true
    },
    displayName:{
        type:String,
        required:true
    }
})

const GoogleUser = mongoose.model('GoogleUser', googleUserSchema)

module.exports = GoogleUser