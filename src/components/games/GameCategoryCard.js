import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import RandomGameModal from './RandomGameModal';
import CategoryIndividualGameCards from './CategoryIndividualGameCards'
import SimilarGameModal from './SimilarGameModal'
export default class GameCategoryCard extends Component {

    //The component level state that we're using contains all of the games that currently have the category id for the category that we are in. There are also 2 functions that we have in the constructor as well. They bind "this" because by default normal functions only contain "this" within the scope of the function and aren't able to access "this" for use in order to grab props and state. In oder to use information from props and state in our function, we have to bind the component level "this" so that the functions are able to use that info.
constructor(props) {
    super(props);
    this.state = {
        gamesInCategory:[]
        }
        this.updateGamesInCategory = this.updateGamesInCategory.bind(this);
        this.removeGameFromCategory = this.removeGameFromCategory.bind(this);
      }

    //When the component first mounts it takes the games from props and filters then and only takes the games that have the specific category id for the category that we are in. It then puts those games into the newState object and then sets newState as the current component state.
componentDidMount(){
    let newState={}
    newState.gamesInCategory=this.props.games.filter((game)=>{
        const filter =this.props.category.id;
        return game.categoryId.includes(filter);
    })
    this.setState(newState)
}

    //This function was created as a copy of the componentDidMount functionality because without it, the category doesn't update it's current games unless you refreshed the page or you changed category tabs. This is used when the user deletes games from that specific category and then resets the state in order to cause the desired rerender that shows that the game is no longer inside of that category anymore.
updateGamesInCategory=()=>{
    let newState={}
    newState.gamesInCategory=this.props.games.filter((game)=>{
        const filter =this.props.category.id;
        return game.categoryId.includes(filter);
    })
    this.setState(newState)
}

    //This function is almost a verbatim copy of the remove game from category function from the CategoryIndividualGameCard component and works the same way by filtering the data to get the category id number, then finding the index value, and then finally splicing that index out of the array.
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

//This function deletes the category from the category list. It first goes through and removes the category id from every game that had this category's id because otherwise the next category made would contain all of the games from the deleted category. The solution to this was to delete all of the games from the category first, then deleting the category from the json server.
deleteThisCategory=()=>{
    this.state.gamesInCategory.forEach(game => {
        this.removeGameFromCategory(game)
    })
    this.updateGamesInCategory()
    this.props.delete("userCategories", this.props.category.id)
}

//Here we have a render function that returns a few conditionals that determine what the user sees depending on state. The Delete Category button is always rendered and appears at the top of the category body. The next line states that if the length of the gamesInCategory array in state is equal to 0, meaning that the array is currently empty, then the message that there are no games in the category will appear. The next conditional statement states that if the length of the gamesInCategory array in state is greater than 0, meaning that the array has information inside of it, then it will create the button to find a random game in the category, it will create the button to find a random similar game from the provided games in the category, and it will also call the CategoryIndividualGameCards component to create all of the cards for each game in the category.
    render(){
        return(
            <div>
                <div><h3>Category: {this.props.category.categoryName}</h3> <Button color="youtube" onClick={this.deleteThisCategory}>Would You Like To Delete this Category?</Button></div>
                <br />
                <br />
                {this.state.gamesInCategory.length === 0 &&
                <div>
                <h2>You Currently Have no Games in this Category</h2>
                <br />
                </div>
                }
                {this.state.gamesInCategory.length >0 &&
                    <div>
                        <SimilarGameModal addGame={this.props.addGame} randomSimilarGame={this.props.randomSimilarGame} game={this.state.gamesInCategory}/>
                        <br />
                        <br />
                        <RandomGameModal game={this.state.gamesInCategory}/>
                        <br />
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