import React, { Component } from 'react';
import GameCollectionCardDisplay from './GameCollectionCardDisplay'
import { Card, Tab, Button } from 'semantic-ui-react'
import RandomGameModal from './RandomGameModal'
import CategoryMakerModal from './GameCategories'
import GameCategoryCard from './GameCategoryCard'
import SimilarGameModal from './SimilarGameModal'
export default class GameCollectionList extends Component {
    //The state for this component contains similar games which is set to null and isInCategory set to false.
    constructor(props) {
        super(props);
        this.state = {
        isInCategory: false,
        similarGames:null
        }
      }
    
    //This function checks to see what the state of isInCategory is currently. If the value is equal to false, then it sets it equal to true. If it is equal to true, then it sets the value equal to false.
    renderCategoryTabs =()=>{
        if(this.state.isInCategory===false){
            this.setState({isInCategory : true})
        } else if(this.state.isInCategory===true){
            this.setState({isInCategory : false})
        }
    }

    //This function dynamically creates the Tab component panes by taking all of the passed down category props and mapping over each of them and using those to create individual panes. For the tab name it sets it as the name of the category that it's on and then renders each one with category cards.
    categoryTabMaker=()=>{
        const panes = this.props.categories.map((category) => ({
            menuItem: category.categoryName,
            render: () => 
                <Tab.Pane>
                    <GameCategoryCard updateCategory={this.props.updateCategory} renderTab={this.renderCategoryTabs} delete={this.props.deletecategory} edit={this.props.editGame} games={this.props.game} category={category} addGame={this.props.addGame} game={this.props.game} key={category.id}/>
                </Tab.Pane>
        }))
        return panes
}

    render(){
        return (
            <div>
                {/*This conditional checks to see if the length of the game array from props is equal to 0 or not. If the length of the array is equal to 0, then the component renders the message that says that there are no games in the user's collection.*/}
                { this.props.game.length===0 &&
                    <h2>There Are No Games Currently In Your Collection</h2>
                }

                {/*This next conditional handles if the value of game from props is greater than 0. If the value is greater than 0, then the component will render a div.*/}
                { this.props.game.length>0 &&
                <div>

                    {/*This internal conditional checks to see if the current state of isInCategory is set to true or false. If the value is equal to true, then the component will render a button that will show the user's game collection.*/}
                    {this.state.isInCategory===true &&
                        <div>
                        <Button color="youtube" onClick={this.renderCategoryTabs}>Show Collection</Button>
                        <Tab panes={this.categoryTabMaker()}/>
                        </div>
                    }

                    {/*This internal conditional checks to see if the current state of isInCategory is set to true or false. If the value is equal to false, then the component will render a button for similar games, a button to show the user's categories, a button to make new categories, a button that will choose a random game for the user, and will create cards for all of the games that a user has inside of their collection.*/}
                    { this.state.isInCategory===false &&
                    <div>
                        <SimilarGameModal addGame={this.props.addGame} game={this.props.game}/>
                        {this.props.categories.length!==0 &&
                        <Button color="youtube" onClick={this.renderCategoryTabs}>Show Catergories</Button>}
                        <CategoryMakerModal  updateCategory={this.props.updateCategory} addNewCategory={this.props.addCategory} games={this.props.game}/>
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
                </div>
                }
            {/*This is the end of the conditional that handles what should occur when the length of the game array from props is greater than 0*/}
            </div>
        )
    }
}