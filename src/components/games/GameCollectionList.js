import React, { Component } from 'react';
import GameCollectionCardDisplay from './GameCollectionCardDisplay'
import { Card, Tab, Button } from 'semantic-ui-react'
import RandomGameModal from './RandomGameModal'
import CategoryMakerModal from './GameCategories'
import GameCategoryCard from './GameCategoryCard'
export default class GameCollectionList extends Component {   
    constructor(props) {
        super(props);
        this.state = {
        isInCategory: false
        }
      }
    
    renderCategoryTabs =()=>{
        if(this.state.isInCategory===false){
            this.setState({isInCategory : true})
        } else if(this.state.isInCategory===true){
            this.setState({isInCategory : false})
        }
    }

    categoryTabMaker=()=>{
        const panes = this.props.categories.map((category) => ({
            menuItem: category.categoryName,
            render: () => <Tab.Pane>
            <GameCategoryCard renderTab={this.renderCategoryTabs} delete={this.props.deletecategory} edit={this.props.editGame} games={this.props.game} category={category} key={category.id}/>
        </Tab.Pane>
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
                    {this.state.isInCategory===true &&
                        <div>
                        <Button onClick={this.renderCategoryTabs}>Show Collection</Button>
                        <Tab panes={this.categoryTabMaker()}/>
                        </div>
                    }
                    { this.state.isInCategory===false &&
                    <div>
                        {this.props.categories.length!==0 &&
                        <Button onClick={this.renderCategoryTabs}>Show Catergories</Button>}
                        <CategoryMakerModal addNewCategory={this.props.addCategory} games={this.props.game}/>
                        <br />
                        <br />
                        <RandomGameModal game={this.props.game}/>
                        <br/>
                            <Card.Group>
                                {this.props.game.map(game =>
                            <GameCollectionCardDisplay categories={this.props.categories} editGame={this.props.editGame} deleteGame={this.props.deleteGame} game={game} key={game.id}/>)}
                            </Card.Group>
                    </div>
                    }
                </div>}
            
            </div>
        )
    }
}