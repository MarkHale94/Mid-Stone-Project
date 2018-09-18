import React, { Component } from 'react';
import DataManager from '../modules/DataManager'

export default class Login extends Component {
  state = {
    username: "",
    email: "",
    password: "",
}


registerUser= () =>{
  let newUser = {
    username:this.state.username,
    email:this.state.email,
    password:this.state.password
  }
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

      DataManager.add("users", newUser)
      .then((userinfo)=>sessionStorage.setItem("user", JSON.stringify(userinfo)))
      .then(()=>window.location.reload())
    }
  })
  
}


handleFieldChange = (evt) => {
  const stateToChange = {}
  stateToChange[evt.target.id] = evt.target.value
  this.setState(stateToChange)
}
    render() {
      return (
        <div className="login-area">
          <h2>Login/Register</h2>
          <div className="username-input"><input type="text" placeholder="Create a Username" id="username" defaultValue={this.state.username} onChange={this.handleFieldChange} /></div>
          <div className="email-input"><input type="text" placeholder="Add your Email Address" id="email" defaultValue={this.state.email} onChange={this.handleFieldChange} /></div>
        
          <div className="password-input"><input type="text" placeholder="Create a Password" id="password" defaultValue={this.state.password} onChange={this.handleFieldChange} /></div>
          <button onClick={this.registerUser}>Login/Register</button>
        </div>
      );
    }
  }
