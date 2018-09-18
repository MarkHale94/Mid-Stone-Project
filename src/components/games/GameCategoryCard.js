import React, { Component } from 'react';
import { Card, Image} from 'semantic-ui-react';
import RandomGameModal from './RandomGameModal'
export default class GameCategoryCard extends Component {
constructor(props) {
    super(props);
    this.state = {
        gamesInCategory:null,
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
                <Card.Group>
                    {this.state.gamesInCategory !==null &&
                   
                        this.state.gamesInCategory.map(game => 
                    <Card key={game.id}>
                        <Image src={(game.image)} alt={game.title}></Image>
                        <Card.Content>
                        <Card.Header>{game.title}</Card.Header>
                        <Card.Description>
                            game description: {game.description}
                        </Card.Description>
                        </Card.Content>
                    </Card>
                    )
                    }
                </Card.Group>
                <RandomGameModal game={this.state.gamesInCategory}/>
            </div>
        )
    }
}