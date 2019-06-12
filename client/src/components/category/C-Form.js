import React from'react'
import axios from'axios'

class CategoryForm extends React.Component
{
    constructor()
    {
        super()
        this.state={
            name:""
        }
    }
    handleName=(e)=>
    {
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:this.state.name
        }
        this.props.handleSubmit(formData)
    }
    render()
    {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name
                        <input type="text" value={this.state.name} onChange={this.handleName} name="name"/>
                    </label>

                    <input type="submit"/>
                </form>
                </div>
        )
    }
}
export  default CategoryForm