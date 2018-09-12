import React, { Component } from 'react';
import DataManager from './modules/DataManager'

export default class UserPage extends Component {
  state = {
    gamesList:[],
    userSearch:""
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }
  searchForGames = ()=>{
    const newGamesArray=[]
    DataManager.search(this.state.userSearch).then((r)=>{
      for(let i=0;i<r.results.length;i++){
        console.log(r.results[i].api_detail_url)
        newGamesArray.push(r.results[i].api_detail_url)
        console.log(newGamesArray)
        this.setState({gamesList : newGamesArray})
      }
    })
  }
  searchForSpecificGame = ()=>{
    DataManager.specificGameSearch(this.state.gamesList[0]).then((r)=>{
        console.log(r.results)
        console.log(r.results.name)
        for(let i=0;i<r.results.genres.length;i++){
          console.log(r.results.genres[i].name)
        }
        console.log(r.results.platforms)
        console.log(r.results.description)
      })
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
            <button onClick={this.searchForGames}>Search</button>
            <button onClick={this.searchForSpecificGame}>Let's Try This Shit Out</button>
          </div>
        </div>
      );
    }
  }
