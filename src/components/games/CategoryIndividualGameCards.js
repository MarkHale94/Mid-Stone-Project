import React, { Component } from 'react';
import { Card, Image, Button} from 'semantic-ui-react'

export default class CategoryIndividualGameCards extends Component {
    removeGameFromCategory=()=>{
        let categoryToRemove = this.props.game.categoryId.filter((game)=>{
        const filter =this.props.category.id;
        return game===filter;
    })
    let indexValueofCategoryToRemove = this.props.game.categoryId.indexOf(categoryToRemove[0])
    let newarray=this.props.game.categoryId
    newarray.splice(indexValueofCategoryToRemove,1)
    console.log(newarray)
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
    }
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