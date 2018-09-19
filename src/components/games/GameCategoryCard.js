import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import RandomGameModal from './RandomGameModal';
import CategoryIndividualGameCards from './CategoryIndividualGameCards'
export default class GameCategoryCard extends Component {
constructor(props) {
    super(props);
    this.state = {
        gamesInCategory:[]
        }
        this.updateGamesInCategory = this.updateGamesInCategory.bind(this);
      }
componentDidMount(){
    let newState={}
    newState.gamesInCategory=this.props.games.filter((game)=>{
        const filter =this.props.category.id;
        return game.categoryId.includes(filter);
    })
    this.setState(newState)
}

updateGamesInCategory=()=>{
    let newState={}
    newState.gamesInCategory=this.props.games.filter((game)=>{
        const filter =this.props.category.id;
        return game.categoryId.includes(filter);
    })
    this.setState(newState)
}

deleteThisCategory=()=>{
    this.props.delete("userCategories", this.props.category.id)
}

    render(){
        return(
            <div>
                <div><h3>Category:{this.props.category.categoryName}</h3> <Button onClick={this.deleteThisCategory}>Would You Like To Delete this Category?</Button></div>
                <br />

                {this.state.gamesInCategory.length === 0 &&
                <div>
                <h2>You Currently Have no Games in this Category</h2>
                <br />
                </div>
                }
                    {this.state.gamesInCategory.length >0 &&
                   <div>
                   <RandomGameModal game={this.state.gamesInCategory}/>
                   <br />
                    <Card.Group>
                        {this.state.gamesInCategory.map(game => 
                        <CategoryIndividualGameCards pleasework={this.updateGamesInCategory} gamesinCategory={this.state.gamesInCategory} edit={this.props.edit}category={this.props.category} game={game} key={game.id} />
                    )}
                </Card.Group>
                    </div>
                    }

            </div>
        )
    }
}