import React from 'react';

const Player = (props) => {
    let directionFacing = props.characterObj.direction === "right" ? "--facingright" : "--facingleft"
    let weaponSide = props.characterObj.direction === "right" ? "weapon_knife right" : "weapon_knife left"
    let secondaryWeaponSide = props.characterObj.direction === "right" ? "weapon_anime_sword skill right" :  "weapon_anime_sword skill left"
    return(
        <React.Fragment>
            <div id={`${props.characterObj.character.name}-model`} className="--avatar">
                <span className="nametag">{props.characterObj.character.name}</span>
                <span className="heartscontainer">
                    <span className={props.characterObj.hp >= 10 ? "ui_heart_full" : "ui_heart_empty"}></span>
                    <span className={props.characterObj.hp >= 20 ? "ui_heart_full" : "ui_heart_empty"}></span>
                    <span className={props.characterObj.hp >= 30 ? "ui_heart_full" : "ui_heart_empty"}></span>
                    <span className={props.characterObj.hp >= 40 ? "ui_heart_full" : "ui_heart_empty"}></span>
                </span>
                <span id={props.characterObj.character.name} className={`${props.characterObj.character.race} ${directionFacing} --player`}>
                </span>
                <span id={`${props.characterObj.character.name} weapon`} className={weaponSide}></span>
                <span id={`${props.characterObj.character.name} secondaryweapon`} className={`${secondaryWeaponSide} hidden`}></span>
            </div>
        </React.Fragment>
    )
}

export default Player