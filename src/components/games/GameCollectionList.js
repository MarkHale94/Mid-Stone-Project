import React, { Component } from 'react';
import GameCollectionCardDisplay from './GameCollectionCardDisplay'
import { Card } from 'semantic-ui-react'
import RandomGameModal from './RandomGameModal'
import CategoryMakerModal from './GameCategories'
export default class GameCollectionList extends Component {   
    render(){
        // const panes = [
        //     { menuItem: 'Search', render: () => <Tab.Pane>
        //       <div className="search-input">
        //     <input type="text" placeholder="Search" id="userSearch" defaultValue={this.state.userSearch} onChange={this.handleFieldChange}/>
        //     <button onClick={this.searchForGames}>Search</button>
        // <Card.Group>
        //   {this.state.gamesListSearch.map(game =>
        // <GameCardDisplay addGame={this.addNewGameToCollection} game={game} key={game.id}/>)}
        // </Card.Group>
        //     <br/>
        //   </div>
    
        //   </Tab.Pane> },
        //     { menuItem: 'Game Collection', render: () => <Tab.Pane>
        //       <GameCollectionList  editGame={this.editGameInfo} deleteGame={this.deleteGameFromCollection} game={this.state.gameCollection}/></Tab.Pane> },
        //   ]
        return (
            <div>
                { this.props.game.length===0 &&
                    <h1>There Are No Games Currently In Your Collection</h1>
                }

                { this.props.game.length>0 &&
                <div>
                    <CategoryMakerModal games={this.props.game}/>
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