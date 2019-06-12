import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class NotesShow extends React.Component{
    constructor(props){
        super(props)
        this.state={
            note:{}

        }
        this.handleRemove=this.handleRemove.bind(this)
        this.handleRemoveTag=this.handleRemoveTag.bind(this)
    }
    componentDidMount(){
        const id=this.props.match.params.id
        axios.get(`http://localhost:3005/notes/${id}`)
        .then(response=>{
            this.setState(()=>({
                note:response.data
            }))
        })
    }

    handleRemove()
    {
        const id=this.props.match.params.id
        const confirm=window.confirm('Are you sure?')
        if(confirm)
        {
            axios.delete(`http://localhost:3005/notes/${id}`)
            .then(response=>{
                this.props.history.push('/notes')
            })
        }
    }
    handleRemoveTag(tag){
        const id=this.props.match.params.id
        axios.delete(`http://localhost:3005/notes/removeTag?noteId=${id}&tagId=${tag._id}`)
        .then(response=>{
            console.log(response.data)
        })
    }
    render(){
        return(
            <div>
               <h1>{this.state.note.title}</h1>
               <p>{this.state.note.body}</p> 
               <p>{this.state.note.category && this.state.note.category.name}</p>


               <h5>tags:</h5> 
              {this.state.note.tags && (
                  <ul>
                      {this.state.note.tags.map((tagItem=>{
                          return <li>{tagItem.tag.name}   <button onClick={()=>{this.handleRemoveTag(tagItem)}}>x</button></li>
                      }))}
                  </ul>
              )}


               <Link to="/notes">back</Link>
               <button onClick={this.handleRemove}>Delete</button>
               <Link to={`/notes/edit/${this.props.match.params.id}`}>Edit</Link>
            </div>
        ) 
    }

}
export default NotesShow
