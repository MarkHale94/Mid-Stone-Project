import React, { Component } from 'react';
import DataManager from './modules/DataManager'
import GameCardDisplay from './games/GameCardDisplay'
import { Card, Tab } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import GameCollectionList from './games/GameCollectionList';

export default class UserPage extends Component {
  state = {
    gameCollection:[],
    gamesListSearch:[],
    userCategories:[],
    userSearch:""
  }
  handleFieldChange = (evt) =>{
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }
  searchForGames = ()=>{
    const newGamesArray=[]
    DataManager.search(this.state.userSearch).then((r)=>{
      for(let i=0;i<r.results.length;i++){
        newGamesArray.push(r.results[i])
        this.setState({gamesListSearch : newGamesArray})
      }
    })
  }

  addNewGameToCollection = (string, game)=>{
    let localUser = JSON.parse(sessionStorage.getItem("user"))
    DataManager.add(string, game)
    .then(() =>DataManager.getUsersCollection("gameCollection", localUser.id))
    .then(games => {this.setState({gameCollection: games})})
  }

  deleteGameFromCollection = (string, gameId) => {
    let localUser = JSON.parse(sessionStorage.getItem("user"))
    DataManager.remove(string, gameId)
    .then(() => DataManager.getUsersCollection("gameCollection", localUser.id))
    .then(games => {this.setState({gameCollection: games})})
}
  editGameInfo = (id, object) =>{
    let localUser = JSON.parse(sessionStorage.getItem("user"));
    DataManager.edit("gameCollection", id, object)
    .then(() => DataManager.getUsersCollection("gameCollection", localUser.id))
    .then(games => {this.setState({gameCollection: games})})
  }

  getUpdatedCategories=()=>{
    let localUser = JSON.parse(sessionStorage.getItem("user"))
    DataManager.getUserCategories("userCategories", localUser.id)
    .then(categories => {this.setState({userCategories: categories})})}

  addNewGameCategory = (string, category)=>{
    let localUser = JSON.parse(sessionStorage.getItem("user"))
    DataManager.add(string, category)
    .then(() => DataManager.getUserCategories("userCategories", localUser.id))
    .then(categories => {this.setState({userCategories: categories})})
  }
  deleteGameFromCategory = (string, gameId) => {
    let localUser = JSON.parse(sessionStorage.getItem("user"))
    DataManager.remove(string, gameId)
    .then(() => DataManager.getUsersCollection("userCategories", localUser.id))
    .then(categories => {this.setState({userCategories: categories})})
}
  componentDidMount(){
    let newState={}
    let localUser = JSON.parse(sessionStorage.getItem("user"))
    DataManager.getUsersCollection("gameCollection", localUser.id)
    .then(games => {newState.gameCollection=games})
    .then(() => DataManager.getUserCategories("userCategories", localUser.id))
    .then(categories => {newState.userCategories = categories})
    .then(() => {this.setState(newState)})
  }

    render() {
      const panes = [
        { menuItem: 'Search', render: () => <Tab.Pane>
          <div className="search-input">
        <input type="text" placeholder="Search" id="userSearch" defaultValue={this.state.userSearch} onChange={this.handleFieldChange}/>
        <button onClick={this.searchForGames}>Search</button>
    <Card.Group>
      {this.state.gamesListSearch.map(game =>
    <GameCardDisplay addGame={this.addNewGameToCollection} game={game} key={game.id}/>)}
    </Card.Group>
        <br/>
      </div>

      </Tab.Pane> },
        { menuItem: 'Game Collection', render: () => <Tab.Pane>
          <GameCollectionList addGame={this.addNewGameToCollection} updateCategory={this.getUpdatedCategories} categories={this.state.userCategories} deletecategory={this.deleteGameFromCategory} addCategory={this.addNewGameCategory} editGame={this.editGameInfo} deleteGame={this.deleteGameFromCollection} game={this.state.gameCollection}/></Tab.Pane> },

      ]
      return (
        <div>
          <div>Hi There {JSON.parse(sessionStorage.getItem("user")).username}</div>
          <div>Your email is {JSON.parse(sessionStorage.getItem("user")).email}</div>
          <div>Your passowrd is {JSON.parse(sessionStorage.getItem("user")).password}</div>
          <div>Your ID number is {JSON.parse(sessionStorage.getItem("user")).id}</div>
          <div>
          <Tab panes={panes}/>
        </div>
      </div>
      );
    }
  }
