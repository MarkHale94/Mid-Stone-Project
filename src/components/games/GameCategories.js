
import { Button, Header, Modal} from 'semantic-ui-react';
import React, { Component } from 'react';

export default class CategoryMakerModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      categoryName: null,
      userId: JSON.parse(sessionStorage.getItem("user")).id,
      gameId:null
    }
  }
  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleFieldChange = (evt) =>{
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
}

  addNewCategory=()=>{
  let newCategory={
    categoryName:this.state.categoryName,
    userId:this.state.userId,
  }
  this.props.addNewCategory("userCategories", newCategory)
  this.handleClose()
}

render(){

    return(
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