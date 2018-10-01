
import { Button, Header, Modal} from 'semantic-ui-react';
import React, { Component } from 'react';

export default class CategoryMakerModal extends Component{
  //This component controls the functionality of the modal that is used to create new categories for the specific user. The component level state we're using controls whether the modal is open or closed, what the category name will be, what the userId is.
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      categoryName: null,
      userId: JSON.parse(sessionStorage.getItem("user")).id,
    }
  }

  //The handleOpen function changes the state of modalOpen from false to true and causes the modal to appear on the screen.
  handleOpen = () => this.setState({ modalOpen: true })

  //The handleClose function changes the state of modalOpen from true to false and causes the modal to close from view on the screen.
  handleClose = () => this.setState({ modalOpen: false })

  //This function takes the user's input in the category name field and uses it to update the category name they want to make.
  handleFieldChange = (evt) =>{
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
}

  //The add new category function takes the category name and user id from state and uses that to add in the new category to the json server. The update category function causes a state change on the parent component which causes a rerender to show the new category tab that the user has created.
  addNewCategory=()=>{
  let newCategory={
    categoryName:this.state.categoryName,
    userId:this.state.userId,
  }
  this.props.addNewCategory("userCategories", newCategory)
  this.props.updateCategory()
  this.handleClose()
}

render(){
    return(
      //this sets the modal to open on the button click. The modal content actually begins at the Modal.Content section.
      <Modal trigger={<Button color="youtube" size="large" onClick={this.handleOpen}>Would You Like to Create a Custom Category For Your Games?</Button>}
      open={this.state.modalOpen}
      onClose={this.handleClose}>
        <Modal.Content>
          <Modal.Description>
            <Header>Create a New Category</Header>
            <input id="categoryName" type="text" placeholder="Category Name" onChange={this.handleFieldChange}></input>
            <br />
            <br />
            <Modal.Actions>
              <Button onClick={this.addNewCategory}>Add This Category</Button>
            </Modal.Actions>
          </Modal.Description>
        </Modal.Content>
    </Modal>
    )
}
}