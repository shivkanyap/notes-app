import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, Route,Link,Switch} from 'react-router-dom'
import NotesList from'./components/notes/List'
import NotesShow from './components/notes/show'
import NotesNew from './components/notes/New'
import CategoryList from './components/category/List'
import ShowList from './components/category/C-Show'
import CategoryNew from'./components/category/C-New'
import NoteEdit from './components/notes/Edit';


import NotesRegister from './components/notes/authentication/Register'
import NotesLogin  from './components/notes/authentication/Login'
import NotesAccount from './components/notes/authentication/account'
import NotesLogout from './components/notes/authentication/logout'

   
class App extends React.Component{

  constructor(props){
    super(props)
    this.state={
      isAuthenticated:false
    }
  }
  componentDidMount()
  {
    if(localStorage.getItem('userAuthToken'))
    {
      this.setState({isAuthenticated:true})
    }
  }
  handleAuth=(bool)=>{
    this.setState({isAuthenticated:bool})
  }

  render(){
    return(
      <BrowserRouter>
      <div>
        <h2>MY NOTE-APP</h2>

        <ul>
          {this.state.isAuthenticated && (
            <div>
              <li><Link to='/users/account'>Account</Link></li>
              <li><Link to='/users/logout'>Logout</Link></li>
              <Link to ="/notes">List Notes</Link><br/>
        <Link to="/categories">List category</Link>
            </div>
          )}
          {!this.state.isAuthenticated && (
            <div>
               <li><Link to="/users/register">Register</Link><br/></li>
               <li><Link to="/users/login">Login</Link><br/></li>
            </div>
          )}
        </ul>

        
        

          <Switch>
        {/* <logged in router */}
        {this.state.isAuthenticated &&(
        <div>
           <Route path="/logout" render={(props)=>{
          return <NotesLogout {...props} handleAuth={this.handleAuth}/>
        }}/>
        <Route path="users//account" component={NotesAccount}/>
        </div>
        )}
        {/* logged out routes */}
        {!this.state.isAuthenticated && (
          <div>
             <Route path="/users/register" component={NotesRegister} exact={true}/>
            <Route path="/users/login" render={(props)=>{
              return <NotesLogin {...props } handleAuth={this.handleAuth}/>
        }} exact={true}/>
          </div>
        )}
        <Route render={()=>{
          return <p>the page your are doesn't exits</p>
        }}/>
       





        <Route path="/notes" component={NotesList} exact={true}/>
        {/* <Route path="/notes/:id" component={NotesShow}/> */}
        <Route path="/notes/new" component={NotesNew} exact={true}/>
        <Route path="/notes/edit/:id" component={NoteEdit} exact={true}/>
        <Route path="/notes/:id" component={NotesShow}/>
        <Route path="/categories/new" component={CategoryNew} exact={true}/>
        <Route path="/categories/:id" component={ShowList} exact={true}/>
       
        <Route path="/categories" component={CategoryList} exact={true}/>
     
      
        {/* </div> */}

       

        </Switch>
        </div>
        </BrowserRouter>
      
     
    )
  } 
}
ReactDOM.render(<App/>,document.getElementById('root'))

