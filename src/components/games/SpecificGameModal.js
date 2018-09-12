
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import React, { Component } from 'react';


export default class SpecificGameModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      title: undefined,
      description: undefined,
      completed: false,
    }
  }
  
render(){
    return(
          <Modal trigger={<Button onClick={this.props.searchForSpecificGame}>Let's Do This Shit</Button>}>
    <Modal.Content image>
      <Image
        wrapped
        size="medium"
        src={(this.props.game.image.medium_url)}
      />
      <Modal.Description>
        <Header>{this.props.game.name}</Header>
        <p>
          {this.props.game.deck}
        </p>
        <Button onClick={console.log(this.props.newGame)}>Add {this.props.game.name} to Your Collection?</Button>
      </Modal.Description>
    </Modal.Content>
  </Modal>
    )
}
}

