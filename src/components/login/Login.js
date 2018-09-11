import React, { Component } from 'react';
import DataManager from '.././DataManager'

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
  DataManager.add("users", newUser)
  .then(sessionStorage.setItem("user", JSON.stringify(newUser)))
  .then(window.location.reload());
}


handleFieldChange = (evt) => {
  const stateToChange = {}
  stateToChange[evt.target.id] = evt.target.value
  this.setState(stateToChange)
}
    render() {
      return (
        <div className="login-area">
          <h2>Register</h2>
          <div className="username-input"><input type="text" placeholder="Create a Username" id="username" defaultValue={this.state.username} onChange={this.handleFieldChange} /></div>
          <div className="email-input"><input type="text" placeholder="Add your Email Address" id="email" defaultValue={this.state.email} onChange={this.handleFieldChange} /></div>
        
          <div className="password-input"><input type="text" placeholder="Create a Password" id="password" defaultValue={this.state.password} onChange={this.handleFieldChange} /></div>
          <button onClick={this.registerUser}>Register</button>
        </div>
      );
    }
  }
