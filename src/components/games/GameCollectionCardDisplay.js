import React, { Component } from 'react';
import { Card, Image, Button } from 'semantic-ui-react'
export default class GameCollectionCardDisplay extends Component {
    deleteThisGame = ()=>{this.props.deleteGame("gameCollection", this.props.game.id)}
    componentDidMount(){
        console.log(this.props.game)
    }
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
                <Button onClick={this.deleteThisGame}>Delete from Your Collection</Button>
                </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}