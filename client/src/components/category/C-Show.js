import React from'react'
import axios from 'axios'
import {Link } from'react-router-dom'

class ShowList extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            category:{}
        }
    }
    componentDidMount()
    {
        const id=this.props.match.params.id
        console.log(id)
        axios.get(`http://localhost:3005/categories/${id}`)
        .then(response=>{
            this.setState(()=>({
                category:response.data
            }))
            console.log(response.data)
        })
        .catch(function(err){
            console.log(err)
        })
    }
    render()
    {
        return(
            <div>
                <p>{this.state.category.name}</p>
                {/* <Link to="/categories"/>back</Link> */}
                </div>
                
        )
    }
}
export default ShowList