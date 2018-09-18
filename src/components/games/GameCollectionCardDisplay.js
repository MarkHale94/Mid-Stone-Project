import React, { Component } from 'react';
import { Card, Image, Button, Checkbox, } from 'semantic-ui-react'
export default class GameCollectionCardDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
        edit:false,
        isChecked:false,
        hoursPlayed: null,
        review: null,
        }
        // this.onCheckBoxClick = this.onCheckBoxClick.bind(this);
      }
    componentDidMount(){
        if(this.props.game.hoursPlayed!==null){
            this.setState({isChecked : true})
        } else if(this.props.game.hoursPlayed===null){
            this.setState({isChecked : false})
        }
    }
    onCheckBoxClick=()=>{
        if(this.state.isChecked===false){
            this.setState({isChecked : true})
        } else if(this.state.isChecked===true){
            this.setState({isChecked : false})
        }
    }
    deleteThisGame = ()=>{this.props.deleteGame("gameCollection", this.props.game.id)}
    
    saveTimeandReview = ()=>{
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
            hoursPlayed: this.state.hoursPlayed,
            review: this.state.review,
            categoryId: this.props.game.categoryId
        }
        this.props.editGame(("gameCollection", this.props.game.id),newEdit)
        if(this.state.edit===true){
            this.setState({edit:false})
        }
    }

    handleFieldChange = (evt) =>{
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    render(){
        return(
            <Card>
                <Image src={(this.props.game.image)} alt={this.props.game.title}></Image>
                <Card.Content>
                <Card.Header>{this.props.game.title}</Card.Header>
                <Card.Description>
                <p>{this.props.game.rating}</p>
                <p>Genre(s):{this.props.game.genreName}</p>
                <p>Platform(s):{this.props.game.platform}</p>
                <p>Game description: {this.props.game.description}</p>
                <Checkbox label='Have you beaten this game?' checked={this.state.isChecked} onClick={this.onCheckBoxClick} />
                {this.state.isChecked &&
                    <div>
                        {this.props.game.hoursPlayed===null &&
                            <div>
                                <input type="number" min="0" placeholder="Hours Played?" id="hoursPlayed" onChange={this.handleFieldChange}/>
                                <br/>
                            </div>}
                            {this.state.edit===false &&
                            <div>
                                <p>{this.props.game.hoursPlayed}</p>
                                <br/>
                            </div>}
                        {this.state.edit===true &&
                           <div>
                            <input type="number" min="0" defaultValue={this.props.game.hoursPlayed} id="hoursPlayed" onChange={this.handleFieldChange}/>
                            <br/>
                           </div>
                        }
                    {this.props.game.review===null &&
                    <div>
                    <textarea placeholder="Please leave a review of the game" onChange={this.handleFieldChange} id="review"></textarea>
                    <br/>
                    <Button onClick={this.saveTimeandReview}>Save</Button><Button onClick={this.onCheckBoxClick} id="review">Cancel</Button>
                    </div>}
                    {this.props.game.review!==null &&
                    <div>
                    { this.state.edit===true &&
                        <div>
                            <textarea defaultValue={this.props.game.review} onChange={this.handleFieldChange} id="review"></textarea>
                            <br/>
                            <Button onClick={this.saveTimeandReview}>Save Edit</Button><Button onClick={()=>this.setState({edit:false})}>Cancel Edit</Button>
                            <br />
                        </div>
                    }
                        {this.state.edit===false &&
                        <div>
                            <p>{this.props.game.review}</p>
                            <br/>
                            <Button onClick={()=>this.setState({edit:true})}>Edit</Button>
                            <br />
                            <br />
                        </div>}
                    </div>}
                    <br/>
                    <br/>
                    </div>
                }
                <Button onClick={this.deleteThisGame}>Delete from Your Collection</Button>
                </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}