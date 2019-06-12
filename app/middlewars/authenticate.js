const {User}=require('../models/User')
const authenticateUser=function(req,res,next)
{
    const token=req.header('x-auth')
    if(token)
    {
        User.findByToken(token)
        .then(function(user){
            if(user)
            {
            req.user=user
            req.token=token
            next()
            }
            else{
                res.status('401').send({notice:'token is not thre '})
            }
        })
        .catch(function(err){
            res.status('401').send(err)
        })
    }
    else{
        res.status('401').send('failure')
    }
}
module.exports={
    authenticateUser
}