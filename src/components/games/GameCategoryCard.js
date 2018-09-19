import React, { Component } from 'react';
import { Card } from 'semantic-ui-react';
import RandomGameModal from './RandomGameModal';
import CategoryIndividualGameCards from './CategoryIndividualGameCards'
export default class GameCategoryCard extends Component {
constructor(props) {
    super(props);
    this.state = {
        gamesInCategory:[],
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
            <div>
                <div><h3>Category:{this.props.category.categoryName}</h3></div>
                <br />

                {this.state.gamesInCategory.length === 0 &&
                <div>
                <h2>You Currently Have no Games in this Category</h2>
                <br />
                </div>
                }
                <Card.Group>
                    {this.state.gamesInCategory.length >0 &&
                    <div>
                   <RandomGameModal game={this.state.gamesInCategory}/>
                   <br />
                        {this.state.gamesInCategory.map(game => 
                        <CategoryIndividualGameCards edit={this.props.edit}category={this.props.category} game={game} key={game.id} />
                    )}
                    </div>
                    }
                </Card.Group>
            </div>
        )
    }
}