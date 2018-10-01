
import { Button, Header, Image, Modal} from 'semantic-ui-react';
import React, { Component } from 'react';
import './RandomGameModal.css'
export default class RandomGameModal extends Component{
  //This component has state that comprises of modalOpen set to false and game specific information that is set to null.
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

  //This function sets the state of modalOpen to true, which causes the modal to open on the screen.
  handleOpen = () => this.setState({ modalOpen: true })

  //This function sets the state of modalOpen to false, which causes the modal to close from the screen.
  handleClose = () => this.setState({ modalOpen: false })

  //This function creates an empty object called newGame. Then, it creates a variable called randomGameId that takes the length of the game props and finds a random number from 0 to the length and then rounds down so that we only get whole numbers. Then, it takes that number and sets all of the information of newGame equal to the the game info of the game at array value randomGameId from the game props that were passed down. It then takes newGames and sets that as the new state. Finally, it uses the handleOpen function to cause the modal to open on the screen.
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

  //This renders the modal information that is used to for the user to see what was selected for them. The button at the bottom is for the user to be able to "reroll" their random game if they do not want to play that particular game at this point in time and would like to try something else.
  render(){
      return(
    <Modal trigger={<Button fluid={true} color="youtube" size="massive" onClick={this.randomGameButton}>Choose A Game For Me</Button>}
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