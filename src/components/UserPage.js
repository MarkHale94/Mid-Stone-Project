import React, { Component } from 'react';
import DataManager from './modules/DataManager'
import GameCardDisplay from './games/GameCardDisplay'
import { Card, Tab, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import GameCollectionList from './games/GameCollectionList';
import "./UserPage.css"

export default class UserPage extends Component {
  //main state for the program here
  state = {
    gameCollection:[],
    gamesListSearch:[],
    userCategories:[],
    userSearch:""
  }
  //handles the field changes for user inputs
  handleFieldChange = (evt) =>{
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  //goes to the DataManager and uses the info that the user provides in order to hit the giantbomb api and get back the general information for the relevant games based on the name
  searchForGames = ()=>{
    const newGamesArray=[]
    DataManager.search(this.state.userSearch).then((r)=>{
      for(let i=0;i<r.results.length;i++){
        newGamesArray.push(r.results[i])
        this.setState({gamesListSearch : newGamesArray})
      }
    })
  }

//uses the DataManager to access the add functionality to add the game to the json server before getting the user's entire collection again, which updates state and causes a rerender.
  addNewGameToCollection = (string, game)=>{
    let localUser = JSON.parse(sessionStorage.getItem("user"))
    DataManager.add(string, game)
    .then(() =>DataManager.getUsersCollection("gameCollection", localUser.id))
    .then(games => {this.setState({gameCollection: games})})
  }

//uses the DataManager to access the delete functionality to delete a game from the json server before getting the user's entire collection again, which updates state and causes a rerender.
  deleteGameFromCollection = (string, gameId) => {
    let localUser = JSON.parse(sessionStorage.getItem("user"))
    DataManager.remove(string, gameId)
    .then(() => DataManager.getUsersCollection("gameCollection", localUser.id))
    .then(games => {this.setState({gameCollection: games})})
}
//uses the DataManager to access the edit functionality to edit a game in the json server before getting the user's entire collection again, which updates state and causes a rerender.
  editGameInfo = (id, object) =>{
    let localUser = JSON.parse(sessionStorage.getItem("user"));
    DataManager.edit("gameCollection", id, object)
    .then(() => DataManager.getUsersCollection("gameCollection", localUser.id))
    .then(games => {this.setState({gameCollection: games})})
  }

//uses the DataManager to access the user categories functionality to get the user's entire categorie list.
  getUpdatedCategories=()=>{
    let localUser = JSON.parse(sessionStorage.getItem("user"))
    DataManager.getUserCategories("userCategories", localUser.id)
    .then(categories => {this.setState({userCategories: categories})})}

//uses the DataManager to access the add functionality to add a game category to the json server before getting the user's entire category collection again, which updates state and causes a rerender.
  addNewGameCategory = (string, category)=>{
    let localUser = JSON.parse(sessionStorage.getItem("user"))
    DataManager.add(string, category)
    .then(() => DataManager.getUserCategories("userCategories", localUser.id))
    .then(categories => {this.setState({userCategories: categories})})
  }

  //uses the DataManager to access the delete functionality to delete a game category to the json server before getting the user's entire category collection again, which updates state and causes a rerender.
  deleteGameFromCategory = (string, gameId) => {
    let localUser = JSON.parse(sessionStorage.getItem("user"))
    DataManager.remove(string, gameId)
    .then(() => DataManager.getUsersCollection("userCategories", localUser.id))
    .then(categories => {this.setState({userCategories: categories})})
}

//when the component is first loaded it takes the user's collection and category information and sets that to state so that the information can be there when the user logs in. this is done so that the api hits have enough time to finish their promises before the information is called to be loaded on the screen.
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

      //these are the panes for the Tab component brought in from semantic-ui-react
      const panes = [

        //This is the search pane, which will appear first and will load first. The menuItem section specifies the name of the tab that the user will see. The pane hase its own render function which takes the jsx that you will be using to populate the tab's content. Inside the search tab, we have the search bar that the user will input the game name that they would like to search for. Once the user clicks on the search button, then the gamesListSearch array will have information inside of it, which is then map'd over and the information is put into the GameCardDisplay file, which then handles the creation of the cards for each of the games the api gives us.
        { menuItem: 'Search', render: () => 
          <Tab.Pane>
            <div className="search-input">
              <input type="text" placeholder="Search" id="userSearch" defaultValue={this.state.userSearch} onChange={this.handleFieldChange}/>
              <Button color="youtube" size={"mini"} onClick={this.searchForGames}>Search</Button>
              <Card.Group>
                {this.state.gamesListSearch.map(game =>
                  <GameCardDisplay addGame={this.addNewGameToCollection} game={game} key={game.id}/>)}
              </Card.Group>
              <br/>
              <br/>
              <br/>
            </div>
          </Tab.Pane>
        },

        //This is the second pane that loads by default for the user. This pane is title Game Collection because it holds all of the games that the user has in their collection and displays them. It takes all of the information from the gameCollection array and sends it down to the GameCollectionList file, which then builds up all of the cards for the collection as well as some other features, including the categories, similar game finding logic, and the random game picking logic.
        { menuItem: 'Game Collection', render: () =>
          <Tab.Pane>
          <GameCollectionList addGame={this.addNewGameToCollection} updateCategory={this.getUpdatedCategories} categories={this.state.userCategories} deletecategory={this.deleteGameFromCategory} addCategory={this.addNewGameCategory} editGame={this.editGameInfo} deleteGame={this.deleteGameFromCollection} game={this.state.gameCollection}/></Tab.Pane> },

      ]


      //this is our main information being rendered and is no longer part of the panes for the Tab component. The first section showcases user information and the second calls the Tab component, which takes the pane information we provided above and uses that to create the panes that the user sees when they log in.
      return (
        <div className="userPageDefaultBackgroundColor">
          <h1 className="welcomeTitle">Welcome to What2Play, {JSON.parse(sessionStorage.getItem("user")).username}!</h1>
          <div>
          <Tab className="tabColor"panes={panes}/>
        </div>
      </div>
      );
    }
  }
