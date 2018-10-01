import React, { Component } from 'react';
import { Card, Image, Button} from 'semantic-ui-react'

export default class CategoryIndividualGameCards extends Component {
    //this is a function that will remove a game from a category. To do this it first figures out which category the game belongs to needs to get removed. It does this looking at the game and filtering the game's categories and matching it to the category id number of the specific category that we are looking at.
    removeGameFromCategory=()=>{
        let categoryToRemove = this.props.game.categoryId.filter((game)=>{
        const filter =this.props.category.id;
        return game===filter;
    })

    //The categoryToRemove section above creates an array that has a value at index 0 of the category id. Using the category id number we find out what the array index value that category id is in the game's category id array and splice out that category id. This results in the game having all of its original categories still in place with the exception of the category we just removed. We then have to set all of the new info into an object to send to the JSON server as a PUT request, since we can't use PATCH without running into CORS issues with the giantbomb api. It sends up the object to the JSON server, then it uses the function pleasework which resets the state of the component GameCategoryCard which causes a rerender and shows the updated game category without the removed game any more. Without the last line where we call the pleasework function, the game is removed from the category, but the state is not updated on the parent component and the rerender does not occur. This causes the user to have to change tabs or refresh the page in order to see that the game has successfully been removed from the category.
    let indexValueofCategoryToRemove = this.props.game.categoryId.indexOf(categoryToRemove[0])
    let newarray=this.props.game.categoryId
    newarray.splice(indexValueofCategoryToRemove,1)
    let newEdit={
        giantBombGameid: this.props.game.giantBombGameid,
        image: this.props.game.image,
        title: this.props.game.title,
        description: this.props.game.description,
        genreName: this.props.game.genreName,
        genreId: this.props.game.genreId,
        platform: this.props.game.platform,
        rating: this.props.game.rating,
        similarGamesNames: this.props.game.similarGamesNames,
        userId: this.props.game.userId,
        hoursPlayed: this.props.game.hoursPlayed,
        review: this.props.game.review,
        categoryId: newarray
    }
    this.props.edit(("gameCollection", this.props.game.id),newEdit)
    this.props.pleasework()
}

//this is the render functionality that creats the game cards for each category.
    render(){
        return(
            <Card>
                <Image src={(this.props.game.image)} alt={this.props.game.title}></Image>
                <Card.Content>
                    <Card.Header>{this.props.game.title}</Card.Header>
                    <Card.Description>
                        game description: {this.props.game.description}
                    </Card.Description>
                    <Button onClick={this.removeGameFromCategory}>Remove This Game From This Category</Button>
                </Card.Content>
            </Card>
        )
    }
}