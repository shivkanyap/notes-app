const express=require('express')
const router=express.Router()

const {User}=require('../models/User')
const {authenticateUser}=require('../middlewars/authenticate')

router.post('/register',function(req,res){
    const body=req.body
    // console.log(body)
    // res.send('registration')
    // const body=req.body
    // console.log(body)
    const user=new User(body)
    // console.log(user.isNew)
    user.save()
    .then(function(user){
        // console.log(user.isNew)
        res.send(user)
    })
    .catch(function(err){
        res.send(err)
    })
})
//localhost:3000/users/login
router.post('/login',function(req,res){
    const body=req.body
      User.findByCredentials(body.email,body.password)
            .then(function(user){
                return user.generateToken()
            // res.send(user)

})
.then(function(token){
    res.send({token})
    // res.setHeader(////////////'x-auth',token).send({})
})
.catch(function(err){
    res.send(err)
})
})
router.get('/account',authenticateUser, function(req,res){
    const {user}=req
    res.send(user)
    
})
router.delete('/logout',authenticateUser,function(req,res){
    const {user,token}=req
    User.findByIdAndUpdate(user._id,{$pull:{tokens:{token:token}}})
    .then(function(user){
        res.send({notice:'successfull log out'})
    })
    .catch(function(err){
        res.send(err)
    })
})
//     User.findOne({email:body.email})
//         .then(function(user){
//             if(!user)
//             {
//                 res.status(404).send('invalid email/password')
//             }
//             bcryptjs.compare(body.password,user.password)
//             .then(function(result){
//                 if(result)
//                 {
//                     res.send(user)
//                 }
//                 else{
//                     res.status(404).send('invalid password/password')
                // }
//             })
//         })
//         .catch(function(err){
//             res.send(err)
//         })
// })
// const body=req.body


module.exports={
    userRouter:router

}
