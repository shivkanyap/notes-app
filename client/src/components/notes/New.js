import React from 'react'
import axios from 'axios'
import NotesForm from './Form'
 
class NotesNew extends React.Component{
    constructor(){
        super()
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleSubmit(formData){
        console.log(formData)
        axios.post('http://localhost:3005/notes',formData)
        .then(response=>{
            
            // console.log(response.data )
            if(response.data.hasOwnProperty('errors')){
                console.log(response.data.errors)
            }else{
                //change to another component
                this.props.history.push(`/notes${response.data._id}`)
            }
        })
    }
    render(){
        return(
            <div>
                <h2>Add New Notes</h2>
                <NotesForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default NotesNew
