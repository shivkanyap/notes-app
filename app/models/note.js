


const mongoose=require(`mongoose`)
//connect express to mongo  via mongoose
//configure the promise library to be ES6 promise
//Scheme-object constructor function
const Schema=mongoose.Schema


const NoteSchema=new Schema({
//model based on the schema

    title:{
        type:String,
        required:true
    },
    body:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    },
    tags:[{
        tag:{
            type:Schema.Types.ObjectId,
            ref:'Tag'
        }
    }],
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }


})

// NoteSchema.post('save',function(next){
//     const note=this
//     note.tags.forEach(function(tagItem){
//         Tag.findById(tagItem.tag)
//         .then(tag=>{
//             tag.notes.push({note:note._id})
//             tag.save()
//         })
//     })
//     next()
// })
const Note=mongoose.model('Note',NoteSchema)

module.exports=Note
