import React, { Component } from 'react';

export default class UserPage extends Component {
    render() {
      return (
        <div>Hi There {JSON.parse(sessionStorage.getItem("user")).username}</div>
      );
    }
  }
