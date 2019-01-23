
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import React, { Component } from 'react';
import DataManager from '../modules/DataManager'
import './SimilarGameModal.css'
export default class SimilarGameModal extends Component {
  //This component has state for modalOpen as false, all of the required information for a game in the json server database set to null, except the userId and categoryId which are set to the userId from sessionStorage and the an empty array respectively. The functions addNewGame and searchForSpecificGame and set to bind the component level "this" so that the functions have access to props and state instead of "this" just being limited to the scope of the respective functions.
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
      userId: JSON.parse(sessionStorage.user).id,
      categoryId: [],
      noSimilarGames:false
    }
    this.addNewGame = this.addNewGame.bind(this);
    this.searchForSpecificGame = this.searchForSpecificGame.bind(this);
  }

  //This function changes the state of modalOpen to true and opens the modal on the screen.
  handleOpen = () => this.setState({ modalOpen: true })

  //This function changes the state of modalOpen to false and closes the modal on the screen.
  handleClose = () => this.setState({ modalOpen: false })

  //This function is used for taking the data in state and saving that data to the JSON server database. After saving all of the information, then the modalOpen state is set to false and the modal closes.
  addNewGame(evt) {
    evt.preventDefault()
    let newGameToAdd = {
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
  componentDidMount(){
    this.anySimilarGames();
}
  anySimilarGames = () =>{
    let gamesWithNoSimilarGames = []
    let newState = {}
    for (let i = 0; i < this.props.game.length; i++) {
      if (this.props.game[i].similarGamesNames.includes("No Similar Games Available")) {
        gamesWithNoSimilarGames.push(this.props.game[i])
      }
    }
    if (gamesWithNoSimilarGames.length === this.props.game.length) {
      newState.noSimilarGames = true
      this.setState(newState)
    }
  }
  //This function creates an empty array called totalSimilarGames, then it goes through the game props and itterates over the entire array. It does a conditional check to make sure that there are games that can be used. If the game at array position "i" includes the exact string "No Similar Games Available", then it will console log that it is skipping that particular game because there is no usable information. If the game at array position "i" does not include that string, then it takes the full string list of similar games and splits them at the ", "(comma and space) This creates a new array for every game name of that original long string. It then produces a randomNumber from 0 to the length of the totalSimilarGames array, which is now an array that contains arrays. It then uses that original random number to get an index value it will use before getting a second random number that is an index number from 0 to the length of the array inside the original randomly selected array. It then uses these two random array indexes to get the value of the totalSimilarGames array at those index values and returns the string containing the new game name.
  findSimilarGame = () => {
    let totalSimilarGames = []
    for (let i = 0; i < this.props.game.length; i++) {
      if (!this.props.game[i].similarGamesNames.includes("No Similar Games Available")) {
        totalSimilarGames.push(this.props.game[i].similarGamesNames.split(', '))
      }
    }
    let randomNumber = Math.floor(Math.random() * totalSimilarGames.length)

    let randomNumber2 = Math.floor(Math.random() * totalSimilarGames[randomNumber].length)

    let randomSimilarGame = totalSimilarGames[randomNumber][randomNumber2]
    return randomSimilarGame
  }

  //This function takes the returned value from the findSimilarGame function and uses the result to do a database search from the giantbomb database. Because it doesn't give us all of the specific information that we want in the general search, we have to then do a more specific game detail api call. This is done by taking the very first result from the general api call and using the api_detail_url from it and then using that to do the specific search. After the search it takes the relevant data and sets it to state. In the case that some of the values can be arrays or null such as the ratings, genres, platforms, and similar games, then it has a conditional which will either state that there isn't any relevant information or it will do a for loop that will create a string that contains the information that we need with everything eperated out by a comma and a space.
  searchForSpecificGame = () => {
    this.anySimilarGames()
    if(this.state.noSimilarGames===false){
    DataManager.search(this.findSimilarGame())
      .then((game) => {
        return DataManager.specificGameSearch(game.results[0].api_detail_url)
      })
      .then((game) => {
        let newState = {}
        newState.giantBombGameid = game.results.id
        newState.image = game.results.image.medium_url
        newState.title = game.results.name
        newState.description = game.results.deck
        if (game.results.original_game_rating === null) {
          newState.rating = "No Available Ratings"
        } else if (game.results.original_game_rating !== null) {
          for (let i = 0; i < game.results.original_game_rating.length; i++) {
            if (i === 0) {
              newState.rating = (game.results.original_game_rating[i].name)
            } else if (i !== 0) {
              newState.rating += ", " + (game.results.original_game_rating[i].name)
            }
          }
        }
        if (game.results.genres === null) {
          newState.genreId = "No Available Genre"
        } else {
          for (let i = 0; i < game.results.genres.length; i++) {
            if (i === 0) {
              newState.genreId = (game.results.genres[i].id)
            } else if (i !== 0) {
              newState.genreId += ", " + (game.results.genres[i].id)
            }
          }
        }
        if (game.results.platforms === null) {
          newState.platform = "No Available Platform"
        } else {
          for (let j = 0; j < game.results.platforms.length; j++) {
            if (j === 0) {
              newState.platform = (game.results.platforms[j].name)
            } else if (j !== 0) {
              newState.platform += ", " + (game.results.platforms[j].name)
            }
          }
        }
        if (game.results.similar_games === null) {
          newState.similarGamesNames = "No Similar Games Available"
        } else {
          for (let z = 0; z < game.results.similar_games.length; z++) {
            if (z === 0) {
              newState.similarGamesNames = (game.results.similar_games[z].name)
            } else if (z !== 0) {
              newState.similarGamesNames += ", " + (game.results.similar_games[z].name)
            }
          }
        }
        this.setState(newState)
      })
      .then(this.handleOpen())
    }
    else{this.handleOpen()}
  }

  //The render function contains the meat of the modal and uses the information in state to fill itself out. At the bottom of the modal, it contains a button that allows the user to take the new random game and add it to their collection.
  render() {
    return (
      <Modal trigger={<Button color="youtube" onClick={this.searchForSpecificGame}>Recommend a Game</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}>
        {this.state.noSimilarGames === true &&
          <Modal.Content>
            <Modal.Description>Please Add More Games To Use This Feature</Modal.Description>
          </Modal.Content>
        }
        {this.state.noSimilarGames !== true &&
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
        }
      </Modal>
    )
  }
}

