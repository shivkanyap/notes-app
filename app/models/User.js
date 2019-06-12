const mongoose=require('mongoose')
const validator=require('validator')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Schema=mongoose.Schema

const UserSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:5
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(){

                return 'invalid email format'
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:128
    },
    tokens:[
        {
            token:{
                type:String,
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ]
})

UserSchema.pre('save',function(next){
    const user=this //this refer to th user.save 
    if(user.isNew){
        bcryptjs.genSalt(10)
        .then(function(salt){
            bcryptjs.hash(user.password,salt)
            .then(function(encryptedpassword){
                user.password=encryptedpassword
                next()
            })

         })


    }
   else{
       next()
   }
})
//static methods
UserSchema.statics.findByCredentials=function(email,password)
{
    const User=this
   return User.findOne({email:email})
    .then(function(user){
        if(!user)
        {
           return  Promise.reject('invalid email or password')

        }
        
            return bcryptjs.compare(password,user.password)
            .then(function(result){
                if(result)
                {
                   return  Promise.resolve(user)
                }
                else{
                   return Promise.reject('invalid /password ')
                }
            })
        
    })
    .catch(function(err){
       return  Promise.reject(err)
       //return new Promise function(reolve,reject)
       //reject(err)
    })
    
}
UserSchema.statics.findByToken=function(token)
{
    const User=this
    let tokenData
    try {
        tokenData=jwt.verify(token,'jwt@123')
        // console.log(tokenData._id)
    } catch (err) {

        return Promise.reject(err)    
    }
   return User.findOne({
        _id:tokenData._id,
        'tokens.token':token
    })

}
UserSchema.methods.generateToken=function()
{
    const user=this
    const tokenData={
        _id:user._id,
        username:user.username,
        createdAt:Number(new Date())
    }
    const token=jwt.sign(tokenData,'jwt@123')
    user.tokens.push({
        token:token
    })
    return user.save()
    .then(function(user){
        return Promise.resolve(token)
    })
    .catch(function(err){
        return Promise.reject(err)
    })
}
const User=mongoose.model('User',UserSchema)
module.exports={
    User
}