import React from 'react';
import { withRouter } from 'react-router-dom';

const NavBar = (props) => {

    const onCreditsClick = () => {
        props.history.push("/credits")
    }

    const onHomeClick = () => {
        props.history.push("/")
    }

    const onHowToPlayClick = () => {
        props.history.push("/howtoplay")
    }

    return(
            <div id="navbar">
                Evercell
                <span id="linkcontainer">
                <input className="buttonlink" type="button" onClick={onHowToPlayClick} value="How to play"></input> 
                <input className="buttonlink" type="button" onClick={onCreditsClick} value="Credits"></input> 
                <input className="buttonlink" type="button" onClick={onHomeClick} value="Home"></input> 
                { props.loggedInUser.id ? <input className="buttonlink" type="button" onClick={props.logoutUser} value="Logout"></input> : null }
                </span>
            </div>
    )
}

export default withRouter(NavBar)