import React, { Component } from 'react';
import { Card, Image,} from 'semantic-ui-react'
import DataManager from '../modules/DataManager'
import SpecificGameModal from './SpecificGameModal'
export default class GameCardDisplay extends Component {
    searchForSpecificGame = ()=>{
        let newGame={}
    DataManager.specificGameSearch(this.props.game.api_detail_url).then((r)=>{
        newGame.name=r.results.name
        for(let i=0;i<r.results.genres.length;i++){
          newGame.genres=(r.results.genres[i].name)
        }
        for(let i=0;i<r.results.platforms.length;i++){
        newGame.platforms=(r.results.platforms[i].name)
        }
      })
  }
    render(){
        return(
            <Card>
                <Image src={(this.props.game.image.medium_url)} alt={this.props.game.name}></Image>
                <Card.Content>
                <Card.Header>{this.props.game.name}</Card.Header>
                <Card.Description>
                    game description: {this.props.game.deck}
                </Card.Description>
                <SpecificGameModal newGame={this.newGame} searchForSpecificGame={this.searchForSpecificGame} game={this.props.game}/>
                </Card.Content>
            </Card>
        )
    }
}