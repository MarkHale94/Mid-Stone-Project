
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import React, { Component } from 'react';
import DataManager from '../modules/DataManager'

export default class SimilarGameModal extends Component{
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
    this.searchForSpecificGame = this.searchForSpecificGame.bind(this);
  }
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })


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
  findSimilarGame=()=>{
    let totalSimilarGames=[]
    for(let i=0; i<this.props.game.length;i++){
            if(this.props.game[i].similarGamesNames.includes("No Similar Games Available")){
                console.log("skip this one")
            }else{
        totalSimilarGames.push(this.props.game[i].similarGamesNames.split(', '))
        }
    }
    let randomNumber = Math.floor(Math.random()*totalSimilarGames.length)

    let randomNumber2 = Math.floor(Math.random()*totalSimilarGames[randomNumber].length)

    let randomSimilarGame = totalSimilarGames[randomNumber][randomNumber2] 
    console.log(randomSimilarGame)
    return randomSimilarGame
}
searchForSpecificGame = ()=>{
console.log(this.props)
DataManager.search(this.findSimilarGame())
.then((game)=>{ return DataManager.specificGameSearch(game.results[0].api_detail_url)})
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
    if(game.results.genres===null)
        {newState.genreName= "No Available Genre"
        }else{
    for(let i=0;i<game.results.genres.length;i++){
          if(i===0){
            newState.genreName=(game.results.genres[i].name)
          }else if (i!==0){
          newState.genreName+=", "+(game.results.genres[i].name)
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

render(){
    return(
      <Modal trigger={<Button onClick={this.searchForSpecificGame}>Let's Do This Shit</Button>}
      open={this.state.modalOpen}
      onClose={this.handleClose}>
    <Modal.Content image>
      <Image
        wrapped
        size="medium"
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
          <Button onClick={this.addNewGame}>Add {this.state.title} to Your Collection?</Button>
        </Modal.Actions>
      </Modal.Description>
    </Modal.Content>
  </Modal>
    )
}
}

