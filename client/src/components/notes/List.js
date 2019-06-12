import React from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'

class NotesList extends React.Component{
    constructor(){
        super()
        this.state={
            notes:[]
        }
    }

    componentDidMount(){
        axios.get(`http://localhost:3005/notes`)
        .then(response=>{
            this.setState(()=>({
                notes:response.data
            }))
        })
    }

    render(){
        return(
            <div>
                <h2>Listing Notes:{this.state.notes.length}</h2>
                <ul>
                    {this.state.notes.map(note=>{
                        return <li key={note._id}><Link to={`/notes/${note._id} `}>{note.title}</Link></li>
                    })}
                </ul>
                <Link to="/notes/new">add List</Link>
            </div>
        )

    }
}
export default NotesList
