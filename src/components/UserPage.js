import React, { Component } from 'react';
import DataManager from './modules/DataManager'

export default class UserPage extends Component {
  state = {
    userSearch:""
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  searchForGame = ()=>{
    DataManager.search(this.state.userSearch).then((r)=>{console.log(r)
      for(let i=0;i<r.results.length;i++)console.log(r.results[i].api_detail_url)})
  }

    render() {
      return (
        <div>
          <div>Hi There {JSON.parse(sessionStorage.getItem("user")).username}</div>
          <div>Your email is {JSON.parse(sessionStorage.getItem("user")).email}</div>
          <div>Your passowrd is {JSON.parse(sessionStorage.getItem("user")).password}</div>
          <div>Your ID number is {JSON.parse(sessionStorage.getItem("user")).id}</div>
          <div className="search-input">
            <input type="text" placeholder="Search" id="userSearch" defaultValue={this.state.userSearch} onChange={this.handleFieldChange}/>
            <button onClick={this.searchForGame}>Search</button>
          </div>
        </div>
      );
    }
  }
