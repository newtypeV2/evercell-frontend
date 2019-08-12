import React from 'react';

const Player = (props) => {
    let directionFacing = props.characterObj.direction === "right" ? "--facingright" : "--facingleft"
    let weaponSide = props.characterObj.direction === "right" ? "weapon_knife right" : "weapon_knife left"
    return(
        <React.Fragment>
            <span className="nametag">{props.charName}</span>
            <span className="heartscontainer">
                <span className={props.characterObj.hp >= 10 ? "ui_heart_full" : "ui_heart_empty"}></span>
                <span className={props.characterObj.hp >= 20 ? "ui_heart_full" : "ui_heart_empty"}></span>
                <span className={props.characterObj.hp >= 30 ? "ui_heart_full" : "ui_heart_empty"}></span>
                <span className={props.characterObj.hp >= 40 ? "ui_heart_full" : "ui_heart_empty"}></span>
            </span>
            <span id={props.charName} className={`${props.classType} ${directionFacing}`}>
            </span>
            <span id={`${props.charName} weapon`} className={weaponSide}></span>
        </React.Fragment>
    )
}

export default Player