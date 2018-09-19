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
        this.removeGameFromCategory = this.removeGameFromCategory.bind(this);
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
removeGameFromCategory=(game)=>{
    
    let categoryToRemove = game.categoryId.filter((games)=>{
        const filter =this.props.category.id;
        return games===filter;
    })
    let indexValueofCategoryToRemove = game.categoryId.indexOf(categoryToRemove[0])
    let newarray= game.categoryId
    newarray.splice(indexValueofCategoryToRemove,1)
    let newEdit={
        giantBombGameid: game.giantBombGameid,
        image: game.image,
        title: game.title,
        description: game.description,
        genreName: game.genreName,
        genreId: game.genreId,
        platform: game.platform,
        rating: game.rating,
        similarGamesNames: game.similarGamesNames,
        userId: game.userId,
        hoursPlayed: game.hoursPlayed,
        review: game.review,
        categoryId: newarray
    }
    this.props.edit(("gameCollection", game.id),newEdit)

}

deleteThisCategory=()=>{
    this.state.gamesInCategory.forEach(game => {
        this.removeGameFromCategory(game)
    })
    this.updateGamesInCategory()
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