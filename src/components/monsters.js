import React from 'react';

const Monster = (props) => {
    let weaponSide = props.monsterType.includes("mirror") ? "weapon_rusty_sword monster_ver left" : "weapon_rusty_sword monster_ver right"
    // let weaponSide = "weapon_knife right"
    return(
        <React.Fragment>
            {/* <span className={`${props.monsterType} monster`}></span> */}
            <span className={props.monsterType}></span>
            <span id="monsterWeapon" className={`monv ${weaponSide}`}></span>
        </React.Fragment>
    )
}

export default Monster