
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import React, { Component } from 'react';
import DataManager from '../modules/DataManager'

export default class SpecificGameModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      giantBombGameid: null,
      image: null,
      title: null,
      description: null,
      genreName: null,
      genreId: null,
      platform: null,
      rating: null,
      similarGamesNames: null,
      userId:JSON.parse(sessionStorage.user).id
    }
  }

searchForSpecificGame = ()=>{
DataManager.specificGameSearch(this.props.game.api_detail_url)
  .then((game) => {
    let newState={}
    newState.giantBombGameid=game.results.id
    newState.image=game.results.image.medium_url
    newState.title=game.results.name
    newState.description=game.results.deck
    if(game.results.original_game_rating===null)
      {newState.rating= "No Available ESRB Rating"
      }else if (game.results.original_game_rating[0].name!==null){
        newState.rating=game.results.original_game_rating[0].name
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
}

render(){
    return(
          <Modal trigger={<Button onClick={this.searchForSpecificGame}>Let's Do This Shit</Button>}>
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
          {this.state.rating}
        </p>
        <p>
          Genre(s):{this.state.genreName}
        </p>
        <p>
          Platform(s):{this.state.platform}
        </p>
        <Button onClick={this.props.addGame("gameCollection", this.state)}>Add {this.state.title} to Your Collection?</Button>
      </Modal.Description>
    </Modal.Content>
  </Modal>
    )
}
}

