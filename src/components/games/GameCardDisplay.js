import React, { Component } from 'react';
import { Card, Image,} from 'semantic-ui-react'
import SpecificGameModal from './SpecificGameModal'
export default class GameCardDisplay extends Component {
    render(){
        return(
            <Card>
                <Image src={(this.props.game.image.medium_url)} alt={this.props.game.name}></Image>
                <Card.Content>
                <Card.Header>{this.props.game.name}</Card.Header>
                <Card.Description>
                    game description: {this.props.game.deck}
                </Card.Description>
                <SpecificGameModal addGame={this.props.addGame} game={this.props.game}/>
                </Card.Content>
            </Card>
        )
    }
}