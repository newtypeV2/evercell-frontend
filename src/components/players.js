import React from 'react';

const Player = (props) => {
    let directionFacing = props.characterObj.direction === "right" ? "--facingright" : "--facingleft"
    let weaponSide = props.characterObj.direction === "right" ? "weapon_knife right" : "weapon_knife left"
    return(
        <React.Fragment>
            <span id={props.charName} className={`${props.classType} ${directionFacing}`}>
            </span>
            <span id={`${props.charName} weapon`} className={weaponSide}></span>
        </React.Fragment>
    )
}

export default Player