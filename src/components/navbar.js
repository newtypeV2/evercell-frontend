import React from 'react';
import { withRouter } from 'react-router-dom';

const NavBar = (props) => {

    const onCreditsClick = () => {
        props.history.push("/credits")
    }

    const onHomeClick = () => {
        props.history.push("/")
    }

    return(
            <div id="navbar">
                Evercell
                <span id="linkcontainer">
                <input className="buttonlink" type="button" onClick={onCreditsClick} value="credits"></input> 
                <input className="buttonlink" type="button" onClick={onHomeClick} value="home"></input> 
                { props.loggedInUser.id ? <input className="buttonlink" type="button" onClick={props.logoutUser} value="logout"></input> : null }
                </span>
            </div>
    )
}

export default withRouter(NavBar)