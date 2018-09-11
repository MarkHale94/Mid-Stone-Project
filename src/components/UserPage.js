import React, { Component } from 'react';

export default class UserPage extends Component {
    render() {
      return (<div>
        <div>Hi There {JSON.parse(sessionStorage.getItem("user")).username}</div>
        <div>Your email is {JSON.parse(sessionStorage.getItem("user")).email}</div>
        <div>Your passowrd is {JSON.parse(sessionStorage.getItem("user")).password}</div>
        <div>Your ID number is {JSON.parse(sessionStorage.getItem("user")).id}</div>
        </div>
      );
    }
  }
