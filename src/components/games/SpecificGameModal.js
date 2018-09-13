
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import React, { Component } from 'react';
import DataManager from '../modules/DataManager'

export default class SpecificGameModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      image:null,
      title: null,
      description: null,
      genre: null,
      platform: null
    }
  }

searchForSpecificGame = ()=>{
DataManager.specificGameSearch(this.props.game.api_detail_url)
  .then((game) => {
    let newState={}
    newState.image=game.results.image.medium_url
    newState.title=game.results.name
    newState.description=game.results.deck
    for(let i=0;i<game.results.genres.length;i++){
          if(i===0){
            newState.genre=(game.results.genres[i].name)
          }else if (i!==0){
          newState.genre+=", "+(game.results.genres[i].name)
          }
        }
    for(let j=0;j<game.results.platforms.length;j++){
      if(j===0){
        newState.platform=(game.results.platforms[j].name)
      }else if (j!==0){
          newState.platform+=", "+(game.results.platforms[j].name)
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
        <Button>Add {this.state.title} to Your Collection?</Button>
      </Modal.Description>
    </Modal.Content>
  </Modal>
    )
}
}

