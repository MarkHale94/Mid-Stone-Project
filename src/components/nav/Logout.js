import React, { Component } from 'react';
export default class Logout extends Component {
    //simple function that takes the info in session storage, clears out that info and then forces a page reload to bring the user back to the login page.
    logoutFunction = ()=>
    {
        sessionStorage.clear();
        window.location.reload();
    }
    render() {
        return(
            <div>
                <button onClick={this.logoutFunction}>Logout</button>
            </div>
        )
    }
}