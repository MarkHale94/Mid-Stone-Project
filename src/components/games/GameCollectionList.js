import React, { Component } from 'react';
import GameCollectionCardDisplay from './GameCollectionCardDisplay'
import { Card } from 'semantic-ui-react'

export default class GameCollectionList extends Component {   
    render(){
        return (
            <Card.Group>
                {this.props.game.map(game =>
            <GameCollectionCardDisplay deleteGame={this.props.deleteGame} game={game} key={game.id}/>)}
            </Card.Group>
        )
    }
}