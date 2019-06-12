import React from 'react'
import axios from 'axios'
import CategoryForm from './C-Form'


class CategoryNew extends React.Component
{
    constructor()
    {
        super()
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleSubmit(formData)
    {
        console.log(formData)
        axios.post(`http://localhost:3005/categories`,formData)
        .then(response=>{
            console.log(response.data)
            if(response.data.hasOwnProperty('errors'))
            {
                console.log(response.data.errors)
            }
            else{
                this.props.history.push(`/categories/${response.data_id}`)
            }
        })
        // console.log(response.data)
    }
    render()
    {
        return(
            <div>
                <h2>Add new categories</h2>
                <CategoryForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}
export default CategoryNew