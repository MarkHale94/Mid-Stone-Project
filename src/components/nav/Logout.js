import React, { Component } from 'react';
export default class Logout extends Component {
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