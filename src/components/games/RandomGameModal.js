
import { Button, Header, Image, Modal} from 'semantic-ui-react';
import React, { Component } from 'react';

export default class SpecificGameModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      giantBombGameid: null,
      image: null,
      title: null,
      description: null,
      genreName: null,
      platform: null,
      rating: null,
    }
  }
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })


  randomGameButton=()=>{
    let newGame={}
    let randomGameId= Math.floor(Math.random()*this.props.game.length)
    newGame.giantBombGameid=this.props.game[randomGameId].giantBombGameid
    newGame.image=this.props.game[randomGameId].image
    newGame.title=this.props.game[randomGameId].title
    newGame.description=this.props.game[randomGameId].description
    newGame.genreName=this.props.game[randomGameId].genreName
    newGame.platform=this.props.game[randomGameId].platform
    newGame.rating=this.props.game[randomGameId].rating
    this.setState(newGame)
    this.handleOpen()

}

render(){
    return(
      <Modal trigger={<Button fluid={true} color="youtube" size="massive" onClick={this.randomGameButton}>Choose A Game For Me</Button>}
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
          {this.state.rating}
        </p>
        <p>
          Genre(s):{this.state.genreName}
        </p>
        <p>
          Platform(s):{this.state.platform}
        </p>
        <Modal.Actions>
          <Button onClick={this.randomGameButton}>Choose A different Game?</Button>
        </Modal.Actions>
      </Modal.Description>
    </Modal.Content>
  </Modal>
    )
}
}