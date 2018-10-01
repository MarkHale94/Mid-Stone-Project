import React, { Component } from 'react';
import { Card, Image, Button, Checkbox } from 'semantic-ui-react'
import './GameCollectionCardDisplay.css'
export default class GameCollectionCardDisplay extends Component {

    //This component contains state that has edit and isChecked as true or false, hours played and review as null, categoryToAddTo as null, and categoriesExist as an empty array
    constructor(props) {
        super(props);
        this.state = {
        edit:false,
        isChecked:false,
        hoursPlayed: null,
        review: null,
        categoriesExist:[],
        categoryToAddTo:null
        }
      }

    //When the component first mounts it checkout to see if any of the games have any hoursPlayed. If there are hours played, then it sets the state of hours played to true and if hours played is still null, then it remains set to false. Then it takes all of the categories that exist and then places all of the categories into state.
    componentDidMount(){
        if(this.props.game.hoursPlayed!==null){
            this.setState({isChecked : true})
        } else if(this.props.game.hoursPlayed===null){
            this.setState({isChecked : false})
        }
        let allCategories={}
        allCategories.categoriesExist=this.props.categories
        this.setState(allCategories)
    }

    //This function changes the state of isChecked to true or false on the checkbox click by looking at what the current state is and if the current state is true, then it changes it to false. If the current state is false, then it changes that state to true.
    onCheckBoxClick=()=>{
        if(this.state.isChecked===false){
            this.setState({isChecked : true})
        } else if(this.state.isChecked===true){
            this.setState({isChecked : false})
        }
    }

    //This function is just a passed down function that handles the delete functionality for the specific game.
    deleteThisGame = ()=>{this.props.deleteGame("gameCollection", this.props.game.id)}
    
    //This function takes the user's input and uses it to update information that exists in the json server. It requires all of the data to be used in the edit function because we are required to use PUT instead of PATCH in order to avoid any CORS issues.
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

    //This function handles updating the game object to now include the categoryId for the selected category from the drop down menu.
    saveCategorySelection = ()=>{
        let newCategory=this.props.game.categoryId
        newCategory.push(this.state.categoryToAddTo)
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
            categoryId: newCategory
        }
        this.props.editGame(("gameCollection", this.props.game.id),newEdit)
    }

    //This function handles all the field changes that occur when the user inputs new information into the fields.
    handleFieldChange = (evt) =>{
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    //This function handles the selection of the category drop down. THis takes the index value of the target and the uses that to get the actual id for the category. The using the category id we se that into state. The radix 10 is used for parseInt in order to let parseInt know that it's dealing with whole numbers and not decimals.
    handleSelectionChange = (evt) =>{
        const stateToChange = {}
        let indexvalue = evt.target.selectedIndex
        let realId = evt.target[indexvalue].id
        stateToChange[evt.target.id] = parseInt(realId,10)
        this.setState(stateToChange)
    }


    render(){
        return(
            <Card>
                {/*This return section creates the individual game cards that will be displayed to the user*/}
                <Image className="cardImageToResize" src={(this.props.game.image)} alt={this.props.game.title}></Image>
                <Card.Content>
                <Card.Header>{this.props.game.title}</Card.Header>
                <Card.Description>
                <p>{this.props.game.rating}</p>
                <p>Genre(s):{this.props.game.genreName}</p>
                <p>Platform(s):{this.props.game.platform}</p>
                <p>Game description: {this.props.game.description}</p>

                {/*This is the first conditional that is used for this section. This conditional states that if the length of the categoriesExist array is greater than 0, then it should render the dropdown menu that has all of the selectable categories.*/}
                {this.state.categoriesExist.length>0 &&
                    <select defaultValue="" name="category" id="categoryToAddTo"
                    onChange={this.handleSelectionChange}>
                    <option value="">Select A Category to Add this Game to</option>
                    {
                        this.state.categoriesExist.map(e => <option key={e.id} id={e.id}>{e.categoryName}</option>)
                    }
                    </select>
                }

                {/*This conditional states that if the state of categoryToAddTo is not equal to null, then there should be a button that appears that allows the user to save the category to the game. If the user does not select a category from the drop down list, then the state remains null and there won't be a submit button for that game.*/}
                { this.state.categoryToAddTo !==null &&
                    <div>
                        <Button onClick={this.saveCategorySelection}>Submit To Selected Category</Button>
                        <br />
                    </div>
                }

                {/*This is a very complex conditional with many conditionals within it. The overall conditional states that if the state of isChecked is true, then the component should render a div that contains some information.*/}
                <Checkbox label='Have you played this game?' checked={this.state.isChecked} onClick={this.onCheckBoxClick} />
                {this.state.isChecked &&
                    <div>
                        {/*This is the next conditional that occurs inside of the first conditional. This conditional checks to see if the hoursPlayed is equal to null. If hoursPlayed is equal to null, then it will produce an input field for the user to put how many hours they have played the game.*/}
                        {this.props.game.hoursPlayed===null &&
                            <div>
                                <input type="number" min="0" placeholder="Hours Played?" id="hoursPlayed" onChange={this.handleFieldChange}/>
                                <br/>
                            </div>
                        }

                        {/*This conditional then does a check to see if the state of edit is true or false. If the state of edit is equal to false, then the component will render a div that says how many hours a user has currently on record*/}
                            {this.state.edit===false &&
                            <div>
                                <p>You have {this.props.game.hoursPlayed} hours on record</p>
                                <br/>
                            </div>
                        }

                        {/*This conditional checks to see if edit is set to true or false. If the state of edit is true, then the component will render an input field that will have a default value of the original time played.*/}
                        {this.state.edit===true &&
                            <div>
                                <input type="number" min="0" defaultValue={this.props.game.hoursPlayed} id="hoursPlayed" onChange={this.handleFieldChange}/>
                                <br/>
                            </div>
                        }

                        {/*This conditional checks to see if the value of the game's review is equal to null or not. If the value is equal to null, then the component will render a text area that the user can input information into and then save with the button click.*/}
                        {this.props.game.review===null &&
                            <div>
                            <textarea placeholder="Please leave a review of the game" onChange={this.handleFieldChange} id="review"></textarea>
                            <br/>
                            <Button onClick={this.saveTimeandReview}>Save</Button><Button onClick={this.onCheckBoxClick} id="review">Cancel</Button>
                            </div>
                        }

                        {/*This is the next section that has multiple conditionals placed within each other. The original conditional checks to see if the review section contains a value of null or not. If the value of the game review is not equal to null, then the component will render a new div.*/}
                        {this.props.game.review!==null &&
                            <div>

                                {/*The component then does another check to see if the state of edit is equal to true or false. If the state of edit is equal to true, then the component renders a text area that contains a default value that is equal to the previous review information. It also creates a button that saves the edit and a button that cancels the edit. If you click the cancel edit button, it sets the state of edit from true to false.*/}
                                { this.state.edit===true &&
                                    <div>
                                        <textarea defaultValue={this.props.game.review} onChange={this.handleFieldChange} id="review"></textarea>
                                        <br/>
                                        <Button onClick={this.saveTimeandReview}>Save Edit</Button><Button onClick={()=>this.setState({edit:false})}>Cancel Edit</Button>
                                        <br />
                                    </div>
                                }

                                {/*The component then does another check to see if the state of edit is equal to true or false. If the state of edit is equal to false, then the component renders a div that contains the review and a button that enables the user to edit the information by setting the state of edit to true.*/}
                                {this.state.edit===false &&
                                    <div>
                                        <p>Your review: {this.props.game.review}</p>
                                        <br/>
                                        <Button onClick={()=>this.setState({edit:true})}>Edit</Button>
                                        <br />
                                        <br />
                                    </div>
                                }
                            </div>
                        }
                        <br/>
                        <br/>
                    </div>
                }
                {/*This is the end of the is checked conditional.*/}
                <Button onClick={this.deleteThisGame}>Delete from Your Collection</Button>
                </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}