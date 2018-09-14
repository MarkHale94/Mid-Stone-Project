import React, { Component } from 'react';
import { Card, Image,} from 'semantic-ui-react'
export default class GameCollectionCardDisplay extends Component {
    render(){
        return(
            <Card>
                <Image src={(this.props.game.image)} alt={this.props.game.title}></Image>
                <Card.Content>
                <Card.Header>{this.props.game.title}</Card.Header>
                <Card.Description>
                <p>{this.props.game.rating}</p>
                <p>Genre(s):{this.props.game.genreName}</p>
                <p>Platform(s):{this.props.game.platform}</p>
                <p>Game description: {this.props.game.description}</p>
                </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}