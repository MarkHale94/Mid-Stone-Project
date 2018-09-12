import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react'
import DataManager from '../modules/DataManager'
export default class GameCardDisplay extends Component {
    searchForSpecificGame = ()=>{
        DataManager.specificGameSearch(this.props.game.api_detail_url).then((r)=>{
            console.log(r.results.name)
            for(let i=0;i<r.results.genres.length;i++){
              console.log(r.results.genres[i].name)
            }
            console.log(r.results.platforms)
          })
      }
    render(){
        return(
            <Card>
                <Image src={(this.props.game.image.icon_url)} alt={this.props.game.name}></Image>
                <Card.Content>
                <Card.Header>
                    <h2>game name:{this.props.game.name}</h2>
                </Card.Header>
                <Card.Description>
                    <p>game description:{this.props.game.deck}</p>
                </Card.Description>
                <button onClick={this.searchForSpecificGame}>Let's Try This Shit Out</button>
                </Card.Content>
            </Card>
        )
    }
}