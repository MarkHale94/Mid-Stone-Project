import React, { Component } from 'react';
import DataManager from './modules/DataManager'
import GameCardDisplay from './games/GameCardDisplay'
import { Card, Tab} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import GameCollectionList from './games/GameCollectionList';

export default class UserPage extends Component {
  state = {
    gameCollection:[],
    gamesListSearch:[],
    userSearch:"",
    showSearch:true,
    showCollection:false
  }
  showSearch = (e) => {
    e.target.parentElement.parentElement.parentElement.children[1].classList.remove("is-active")
    e.target.parentElement.parentElement.parentElement.children[2].classList.remove("is-active")
    e.target.parentElement.parentElement.classList.add("is-active")
    this.setState({
        showSearch: true,
        showCollection: false
    })
  }
  showCollection = (e) => {
    e.target.parentElement.parentElement.parentElement.children[1].classList.remove("is-active")
    e.target.parentElement.parentElement.parentElement.children[2].classList.remove("is-active")
    e.target.parentElement.parentElement.classList.add("is-active")
    this.setState({
        showSearch: false,
        showCollection: true
    })
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
  componentDidMount(){
    let localUser = JSON.parse(sessionStorage.getItem("user"))
    DataManager.getUsersCollection("gameCollection", localUser.id)
    .then(games => {this.setState({gameCollection: games})})
  }

    render() {
      const panes = [
        { menuItem: 'Tab 1', render: () => <Tab.Pane><GameCollectionList game={this.state.gameCollection}/></Tab.Pane> },
        { menuItem: 'Tab 2', render: () => <Tab.Pane><div className="search-input">
        <input type="text" placeholder="Search" id="userSearch" defaultValue={this.state.userSearch} onChange={this.handleFieldChange}/>
        <button onClick={this.searchForGames}>Search</button>
    <Card.Group>
      {this.state.gamesListSearch.map(game =>
    <GameCardDisplay addGame={this.addNewGameToCollection} game={game} key={game.id}/>)}
    </Card.Group>
      </div></Tab.Pane> },
      ]
      return (
        <div>
          <div>Hi There {JSON.parse(sessionStorage.getItem("user")).username}</div>
          <div>Your email is {JSON.parse(sessionStorage.getItem("user")).email}</div>
          <div>Your passowrd is {JSON.parse(sessionStorage.getItem("user")).password}</div>
          <div>Your ID number is {JSON.parse(sessionStorage.getItem("user")).id}</div>
          <div>
          <Tab panes={panes}/>
          
             {/* this.state.showSearch === true && */}
          
             {/* this.state.showCollection === true && */}
          
        </div>
      </div>
      );
    }
  }
