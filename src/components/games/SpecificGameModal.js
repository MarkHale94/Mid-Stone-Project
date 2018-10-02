
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import React, { Component } from 'react';
import DataManager from '../modules/DataManager'
import './SpecificGameModal.css'
export default class SpecificGameModal extends Component{
  //This component has state that contains modalOpen set to false and specific game information all set to null with the exceptions of the userId and the categoryId, which are gotten from session storage and is an empty array respectively. The add new game function is put inside of the constructor because it needs to the use the component level "this" and not just the function scope "this". By binding the component level this to the function, it allows us to use props, state, and other functions inside of the function that we bind.
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      giantBombGameid: null,
      image: null,
      title: null,
      description: null,
      genreName: null,
      genreId: null,
      platform: null,
      rating: null,
      similarGamesNames: null,
      hoursPlayed: null,
      review: null,
      userId:JSON.parse(sessionStorage.user).id,
      categoryId:[]
    }
    this.addNewGame = this.addNewGame.bind(this);
  }

  //This function sets the state of modalOpen to true
  handleOpen = () => this.setState({ modalOpen: true })

  //This function sets the state of modalOpen to false
  handleClose = () => this.setState({ modalOpen: false })

  //This function creates an object that contains all of the specific game data that was collected from the specific game search that is stored in state. It then takes that new object and sends it up to the JSON server to be added to the gameCollection array.
  addNewGame(evt){
    evt.preventDefault()
    let newGameToAdd={
      giantBombGameid: this.state.giantBombGameid,
      image: this.state.image,
      title: this.state.title,
      description: this.state.description,
      genreName: this.state.genreName,
      genreId: this.state.genreId,
      platform: this.state.platform,
      rating: this.state.rating,
      similarGamesNames: this.state.similarGamesNames,
      userId: this.state.userId,
      hoursPlayed: null,
      review: null,
      categoryId: this.state.categoryId
    }
    this.props.addGame("gameCollection", newGameToAdd)
    this.handleClose()
  }

  //This function is called when the modal is opened and does a specific game search using the api_detail_url that was passed down as props. It then takes all of the relevant information and stores it into state. If there are values that could be an array or null such as ratings, genres, platforms, or similar games, then it does a conditional that checks if it's an array or is equal to null. If the value is equal to null, then it inserts a string that says that there was no relevant information available. If the information is an array, then it itterates through the array and puts the information into a string that is seperated out by a comma and a space. It then sets the state of modalOpen to be true by using the handleOpen function. It was important to do it this way instead of as a componentDidMount because we need to limit our api hits to only be 200 or less per hour. If done using a component did mount, then we could potentially hit our api limit extremely fast as it could hit the api 50 times if the user searched for mario for example. This is because the modals are all "created" after the search is done. Even though the user can't see the modals they all "exist" in the background for each of the game cards that is created in the initial game search.
  searchForSpecificGame = ()=>{
  DataManager.specificGameSearch(this.props.game.api_detail_url)
    .then((game) => {
      let newState={}
      newState.giantBombGameid=game.results.id
      newState.image=game.results.image.medium_url
      newState.title=game.results.name
      newState.description=game.results.deck
      if(game.results.original_game_rating===null)
        {newState.rating= "No Available Ratings"
        }else if (game.results.original_game_rating!==null){
          for(let i=0;i<game.results.original_game_rating.length;i++){
            if(i===0){
              newState.rating=(game.results.original_game_rating[i].name)
            }else if (i!==0){
            newState.rating+=", "+(game.results.original_game_rating[i].name)
            }
          }
          }
      if(game.results.genres===null)
          {newState.genreId= "No Available Genre"
          }else{
      for(let i=0;i<game.results.genres.length;i++){
            if(i===0){
              newState.genreId=(game.results.genres[i].id)
            }else if (i!==0){
            newState.genreId+=", "+(game.results.genres[i].id)
            }
          }
        }
      if(game.results.platforms===null)
          {newState.platform = "No Available Platform"
          }else{
      for(let j=0;j<game.results.platforms.length;j++){
        if(j===0){
          newState.platform=(game.results.platforms[j].name)
        }else if (j!==0){
            newState.platform+=", "+(game.results.platforms[j].name)
        }
          }
        }
        if(game.results.similar_games===null)
        {newState.similarGamesNames = "No Similar Games Available"
        }else{
      for(let z=0;z<game.results.similar_games.length;z++){
            if(z===0){
              newState.similarGamesNames=(game.results.similar_games[z].name)
            }else if (z!==0){
            newState.similarGamesNames+=", "+(game.results.similar_games[z].name)
            }
          }
        }
        this.setState(newState)
    })
    .then(this.handleOpen())
  }

  //This render function creates the insides of the modal using the information that is available in state after the specific data call. At the bottom of the modal is a button that allows the user to add the game to their collection.
  render(){
      return(
        <Modal trigger={<Button color="youtube" onClick={this.searchForSpecificGame}>View This Game</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}>
      <Modal.Content image>
        <Image
          className="cardImageToResize"
          src={(this.state.image)}
        />
        <Modal.Description>
          <Header>{this.state.title}</Header>
          <p>
            {this.state.description}
          </p>
          <p>
      Rating(s):{this.state.rating}
          </p>
          <p>
            Genre(s):{this.state.genreName}
          </p>
          <p>
            Platform(s):{this.state.platform}
          </p>
          <Modal.Actions>
            <Button color="youtube" onClick={this.addNewGame}>Add {this.state.title} to Your Collection?</Button>
          </Modal.Actions>
        </Modal.Description>
      </Modal.Content>
    </Modal>
      )
  }
}

