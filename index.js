const express=require('express')

const {mongoose}=require(`./config/database`)
const Note=require(`./app/models/note`)
const app=express()
const port=3005
const router=require('./config/routes')

//2nd approach
const categoriesRouter=require('./app/controllers/catergoriesController')
const tagRouter=require('./app/controllers/tagController')

const {userRouter}=require('./app/controllers/UserController')

app.use(express.json())
const cors=require('cors')
app.use(cors())
// const notesRouter=require('./app/controllers/notesController')

app.use('/', router)
app.use('/tags',tagRouter)
//list notes


//without mongoose we can use mongodb native drive

app.get('/',(req,res)=>{
    res.send('welcome to my note taking app')
})
app.use('/categories',categoriesRouter)
app.use('/categories/:id',categoriesRouter)
// app.use('/category/:id',categoriesRouter)
app.use('/',router)
app.use('/users',userRouter)
app.listen(port,()=>{
    console.log('listining on port',port)

})