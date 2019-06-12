const mongoose=require(`mongoose`)

mongoose.Promise=global.Promise

mongoose.connect('mongodb://localhost:27017/notes-app-feb',{ useNewUrlParser: true })
.then((res)=>{
    console.log('connected to db')
})
.catch((err)=>{
    console.log('error in db')
})
module.exports={mongoose}