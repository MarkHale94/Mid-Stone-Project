import React, { Component } from 'react';
import DataManager from '../modules/DataManager'
import { Button } from 'semantic-ui-react'
import "./Login.css"

export default class Login extends Component {
  //for handling the field change when a user wants to login/register
  state = {
    username: "",
    email: "",
    password: "",
}


registerUser= () =>{
  //this checks to see if a user with the same username, email, and password already exists. If this user already exists, then it will log them in instead of just registering a new account.
  let newUser = {
    username:this.state.username,
    email:this.state.email,
    password:this.state.password
  }
  //if all of the user's info in state matches what the user put into the fields, then it uses that information to log in the user and brings up all of their data.
  DataManager.getAllUsers().then((users)=>{
    let loginUser = users.find(user => user.username === this.state.username && user.email === this.state.email && user.password===this.state.password)
    if(loginUser){
        let existingUser= {
          username:loginUser.username,
          email:loginUser.email,
          password:loginUser.password,
          id:loginUser.id
        }
      sessionStorage.setItem("user", JSON.stringify(existingUser))
      window.location.reload()
    }else{
//if all of the info does not match completely with what is in state, then they will automatically be registered with a new account.
      DataManager.add("users", newUser)
      .then((userinfo)=>sessionStorage.setItem("user", JSON.stringify(userinfo)))
      .then(()=>window.location.reload())
    }
  })
  
}

//changes current state to what the user puts into the input fields
handleFieldChange = (evt) => {
  const stateToChange = {}
  stateToChange[evt.target.id] = evt.target.value
  this.setState(stateToChange)
}
//login area where the user will input their username, email, and password
    render() {
      return (
        <div>
          <div className="login-area">
            <h2>Login/Register</h2>
            <div className="username-input"><input type="text" placeholder="Create a Username" id="username" defaultValue={this.state.username} onChange={this.handleFieldChange} /></div>
            <div className="email-input"><input type="text" placeholder="Add your Email Address" id="email" defaultValue={this.state.email} onChange={this.handleFieldChange} /></div>
          
            <div className="password-input"><input type="text" placeholder="Create a Password" id="password" defaultValue={this.state.password} onChange={this.handleFieldChange} /></div>
            <Button color="youtube" onClick={this.registerUser}>Login/Register</Button>
          </div>
        </div>
      )
    }
  }
