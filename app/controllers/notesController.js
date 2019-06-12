const express=require('express')
const Note=require('../models/note')
// const router=express.Router()

// app.get('/',(req,res)=>{
//     Note.find()
//     .then((notes)=>{
//         res.json(notes)
//     })
//     .catch((err)=>{
//         res.json(err)
//     })
// })

module.exports.list=function(req,res)
{
    Note.find()
    .then((notes)=>{
        res.json(notes)
    }).catch((err)=>{
        res.json(err)
    })
}

//post note

// router.post('/',(req,res)=>{
//     const body=req.body
//     const note=new Note(body)
//     note.save()
//     .then((note)=>{
//         res.json(note)
//     })
//     .catch((err)=>{
//         res.json(err)
//     })
// })

module.exports.create=(req,res)=>{
    const body=req.body
    const note=new Note(body)
    note.save()
    .then((note)=>{
        res.json(note)
    })
    .catch((err)=>{
        res.json(err)
    })
}

//show one note
// router.get(`/:id`,(req,res)=>{
//     const id=req.params.id
//     Note.findById(id)
//     .then((note)=>{
//         res.json(note)
//     })
//     .catch((err)=>{
//         res.json(err)
//     })
// })

module.exports.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Note.findOneAndUpdate({
        user:req.user._id,
        _id:id
    })(id,{$set:body},{new:true})
        .then((note)=>{
            res.json(note)
        })
        .catch((err)=>{
            res.json(err)
        })
}

module.exports.list=function(req,res)
{
    Note.find()
    .then((notes)=>{
        res.json(notes)
    })
    .catch((err)=>{
        res.json(err)
    })
}
module.exports.destroy = (req, res) => {
    const id = req.params.id
    Note.findByIdAndDelete(id)
        .then((note) => {
            res.json(note)
        })
        .catch((err) => {
            res.json(err)
        })
}
module.exports.show = (req, res) => {
    const id = req.params.id
    Note.findOne({
        user:req.user._id,
        _id:id
    }).populate('category').populate('tags.tag',['name'])
        .then((note) => {
            res.json(note)
        })
        .catch((err) => {
            res.json(err)
        })
}
module.exports.removeTag=(req,res)=>{
    console.log(req.url)
    const id=req.query.noteId
    const tagId=req.query.tagId
    // Note.findById(id)
    // .then(note=>{
    //     note.tags.id(tagId).remove()
    //     note.save()
    //     .then(note=>{
    //         res.json(note)
    //     })
    // })

    Note.findOneAndUpdate({_id:id},{
        $pull:{tags:{_id:tagId}}
    },{new:true})
    .populate('category').populate('tags.tag',['name'])
    .then(note=>{
        res.json(note)
    })

}

//update a note
// router.put('/:id',(req,res)=>{
//     const id=req.params.id
//     const body=req.body
//     Note.findByIdAndUpdate(id,{$set:body},{new:true})
//     .then((note)=>{
//         res.json(note)
//     })
//     .catch((err)=>{
//         res.json(note)
//     })
// })
//delete the record
// router.delete('/:id',(req,res)=>{
//     const id=req.params.id
//     Note.findByIdAndDelete(id)
//     .then((note)=>{
//         res.json(note)
//     })
//     .catch((err)=>{
//         res.json(err)
//     })

// })
