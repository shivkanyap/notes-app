import React from 'react'
import axios from'axios'
import {Link} from 'react-router-dom'

class CategoryList extends React.Component
{
    constructor()
    {
        super()
        this.state={
            categories:[]
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3005/categories')
        .then(response=>{
            this.setState(()=>({

                categories:response.data
               

            }))
                console.log(response.data)
            
        })
    }
        render()
        {
            
            return(
                <div>
                    <h2>Listing categories ({this.state.categories.length})</h2>
                    <ul>
                        {this.state.categories.map(category=>{
                            return <li key={category._id}><Link to={`/categories/${category._id}`}>{category.name}</Link></li>
                        })}
                    </ul>
                    <Link to="/categories/new">add categories</Link>
                </div>
            )
        }

    
}
export default CategoryList 
