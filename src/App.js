import React, { Component } from 'react';
import { Route } from "react-router-dom";
import './App.css';
import Login from "./components/login/Login"
import UserPage from "./components/UserPage"
import Logout from "./components/nav/Logout"
class App extends Component {
  isAuthenticated = () => sessionStorage.getItem("user") !== null
  render() {
    return (
      <React.Fragment>
      {
        !this.isAuthenticated() &&
        <Route exact path="/" render={(props) => {
          return <Login {...props} />
        }} />
      }
      {
        this.isAuthenticated() &&
        <div>
        <Logout />
        <UserPage/>
        </div>
      }
  </React.Fragment>
    );
  }
}

export default App;
