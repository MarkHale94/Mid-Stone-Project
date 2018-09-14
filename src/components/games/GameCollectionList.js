import React, { Component } from 'react';
import GameCollectionCardDisplay from './GameCollectionCardDisplay'
import { Card, Button} from 'semantic-ui-react'

export default class GameCollectionList extends Component {   

    render(){
        return (
        <div>
                <Button fluid={true} color="youtube" size="massive" >Pick a Game for Me</Button>
                <Card.Group>
                    {this.props.game.map(game =>
                <GameCollectionCardDisplay editGame={this.props.editGame} deleteGame={this.props.deleteGame} game={game} key={game.id}/>)}
                </Card.Group>
          
        </div>
        )
    }
}