import React from 'react'
import axios from 'axios'
import NotesForm from './Form'
class NoteEdit extends React.Component
{

    constructor(props)
    {
        super(props)
        this.state={
            note:{}
        }
    }
    render()
    {
        return(
            <div>
                <p>Edit note</p>
                <NotesForm/>
                </div>
        )
    }
}
export default NoteEdit