import React, { Component } from 'react';
import GameCollectionCardDisplay from './GameCollectionCardDisplay'
import { Card } from 'semantic-ui-react'
import RandomGameModal from './RandomGameModal'

export default class GameCollectionList extends Component {   
    render(){
        return (
            <div>
                { this.props.game.length===0 &&
                    <h1>There Are No Games Currently In Your Collection</h1>
                }

                { this.props.game.length>0 &&
                <div>
                    <RandomGameModal game={this.props.game}/>
                        <Card.Group>
                            {this.props.game.map(game =>
                        <GameCollectionCardDisplay editGame={this.props.editGame} deleteGame={this.props.deleteGame} game={game} key={game.id}/>)}
                        </Card.Group>
                    </div>}
            
            </div>
        )
    }
}