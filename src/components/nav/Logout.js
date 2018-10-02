import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import "./Logout.css"
export default class Logout extends Component {
    //simple function that takes the info in session storage, clears out that info and then forces a page reload to bring the user back to the login page.
    logoutFunction = ()=>
    {
        sessionStorage.clear();
        window.location.reload();
    }
    render() {
        return(
            <div className="logoutNavBar">
                <Button className="logoutButton" color="youtube" onClick={this.logoutFunction}>Logout</Button>
                <br />
                <br />
            </div>
        )
    }
}