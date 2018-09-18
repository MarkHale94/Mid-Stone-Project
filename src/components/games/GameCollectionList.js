import React, { Component } from 'react';
import GameCollectionCardDisplay from './GameCollectionCardDisplay'
import { Card, Tab } from 'semantic-ui-react'
import RandomGameModal from './RandomGameModal'
import CategoryMakerModal from './GameCategories'
export default class GameCollectionList extends Component {   
    constructor(props) {
        super(props);
        this.state = {
        isInCategory: false
        }
      }
    categoryTabMaker=()=>{
        const panes = this.props.categories.map((category) => ({
            menuItem: category.categoryName,
            render: () => <Tab.Pane>{category.categoryName}</Tab.Pane>
        }))
        return panes
}
    render(){
        return (
            <div>
                { this.props.game.length===0 &&
                    <h1>There Are No Games Currently In Your Collection</h1>
                }

                { this.props.game.length>0 &&
                <div>
                    <Tab panes={this.categoryTabMaker()}/>
                    <CategoryMakerModal addNewCategory={this.props.addCategory} games={this.props.game}/>
                    <br />
                    <br />
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