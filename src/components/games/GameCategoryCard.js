import React, { Component } from 'react';
import { Card} from 'semantic-ui-react';
import RandomGameModal from './RandomGameModal'
export default class GameCategoryCard extends Component {

    render(){
        return(
            <Card>
                <div>{this.props.category.categoryName}</div>
                <RandomGameModal game={this.props.games}/>
            </Card>
        )
    }
}