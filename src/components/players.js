import React from 'react';

const Player = (props) => {
    let weaponSide = props.classType.includes("mirror") ? "weapon_knife left" : "weapon_knife right"
    return(
        <React.Fragment>
            <span id={props.charName} className={props.classType}>
            </span>
            <span id={`${props.charName} weapon`} className={weaponSide}></span>
        </React.Fragment>
    )
}

export default Player