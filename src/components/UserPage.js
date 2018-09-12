import React, { Component } from 'react';
import DataManager from './modules/DataManager'
import GameCardDisplay from './games/GameCardDisplay'

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
        newGamesArray.push(r.results[i])
        this.setState({gamesList : newGamesArray})
      }
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
          </div>
          {this.state.gamesList.map(game =>
        <GameCardDisplay game={game} key={game.id}/>)}
        </div>
      );
    }
  }
