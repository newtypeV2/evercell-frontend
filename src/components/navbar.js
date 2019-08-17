import React from 'react';
import { withRouter } from 'react-router-dom';

const NavBar = (props) => {

    return(
        <React.Fragment>
            <div id="navbar">Evercell</div>
            <div>
                { props.loggedInUser.id ? <input type="button" onClick={props.logoutUser} value="logout"></input> : null }
            </div>
        </React.Fragment>
    )
}

export default withRouter(NavBar)