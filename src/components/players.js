import React from 'react';

const Player = (props) => {
    return(
        <span id={props.charName} className={props.classType}></span>
    )
}

export default Player