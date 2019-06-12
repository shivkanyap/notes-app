
import React from 'react';
import axios from 'axios'
class NotesForm extends React.Component{
    constructor(){
        super()
        this.state={
            title:'',
            body:'',
            categories:[],
            category:'',
            tags:[],
            selectedTags:[]
        }
    }
    handleChange=(e)=>{
        e.persist()
        this.setState(()=>({
            [e.target.name]:e.target.value
        }))
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const formData={ 
            title:this.state.title,
            body:this.state.body,
            category:this.state.category,
              tags:this.state.selectedTags.map(tag=>{
                return{
                    tag:tag._id
                }
            })
        }
        this.props.handleSubmit(formData)
    }
    componentDidMount(){
        axios.get(`http://localhost:3005/categories`)
        .then((response)=>{
            console.log(response.data)
         this.setState(()=>({
             categories:response.data
         }))

        })

        axios.get(`http://localhost:3005/tags`)
        .then((response)=>{
            console.log(response.data)
         this.setState(()=>({
             tags:response.data
         }))

        })
    }

    componentWillReceiveProps(nextProps){
        this.setState(()=>({
            title:nextProps.note.title,
            body:nextProps.note.body,
            category:nextProps.note.category._id
        }))
    }
     handleTagSelection(tag){
        //  console.log(tag.target)
        this.setState((prevState)=>({
            selectedTags:[...prevState.selectedTags,tag]
        }))
     }
     handleTag(tag)
     {
         this.setState((prevState)=>({
             selectedTag:[...prevState.selectedTag,tag]
         }))
     }
    render(){
        return(
            <div>
             <form onSubmit={this.handleSubmit}>
                 <label>Title
                     <input type="text" value={this.state.title} 
                     onChange={this.handleChange}
                     name="title"/>`    
                 </label>
                 <br/><br/>

                 <label>Body
                     <textarea value={this.state.value}
                     onChange={this.handleChange}
                     name="body"></textarea>
                 </label>
                 <br/><br/>

                 <label>
                     tags
                     {this.state.tags.map(tag=>{
                         return <label key={tag._id}><input type="checkbox" onClick={()=>{this. handleTagSelection(tag)}}/>{tag.name}</label>
                     })}
                     
                     </label><br/>

                     <label>
                        category
                        <select value={this.state.category} name='category' onClick={this.handleChange}>
                            <option value="">select</option>
                            {
                                this.state.categories.map((category)=>{
                                    return <option key={category._id} value={category._id}>{category.name}</option>

                                })
                            }
                        </select><br/>
                    </label>
                 <input type="submit"/>
             </form>
            </div>
        )
    }
}

export default NotesForm
