import React, { Component } from 'react';
import { Card} from 'semantic-ui-react';
import RandomGameModal from './RandomGameModal'
export default class GameCategoryCard extends Component {
constructor(props) {
    super(props);
    this.state = {
        gamesInCategory:null,
        }
      }
componentDidMount(){
    let newState={}
    newState.gamesInCategory=this.props.games.filter((game)=>{
        const filter =this.props.category.id;
        return game.categoryId.includes(filter);
    })
    this.setState(newState)
}
    render(){
        return(
            <Card>
                <div>{this.props.category.categoryName}</div>
                <RandomGameModal game={this.props.games}/>
            </Card>
        )
    }
}