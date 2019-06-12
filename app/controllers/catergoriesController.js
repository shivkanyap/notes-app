const express=require('express')
const Category=require('../models/category')
const router=express.Router()
const Note=require('../models/note')

router.get('/',(req,res)=>{
    Category.find()
    .then((categories)=>{
        res.json(categories)
    })
    .catch((err)=>{
        res.json(err)
    })
})

router.post('/',(req,res)=>{
    const body=req.body
    const category=new Category(body)
    category.save()
    .then((category)=>{
        res.json(category)
    })
    .catch((err)=>{
        res.json(err)
    })
})

router.put
// router.get('/',(req,res)=>{
//     const id=req.params.id
//     Category.findById()
//     .then((category)=>{
//         res.json(category)
//     })
//     .catch((err)=>{ 
//         res.json()
//     })
// })
router.get('/:id',(req,res)=>{
    const id=req.params.id
    Promise.all([Category.findById(id),Note.find({category:id})])
    .then(response=>{
        res.json({
            category:response[0],
            notes:response[1]

        })
    
})
})


module.exports=router