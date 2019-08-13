import React from 'react';

const Monster = (props) => {
    /* !!Props to className mapping not FINAL!!! MONSTER WEAPON NEEDS TO BE REVISITED. */
    
    // let weaponSide = !(props.monsterType.includes("mirror")) ? "weapon_rusty_sword monster_ver left" : "weapon_rusty_sword monster_ver right"
        // let weaponSide = "weapon_knife right"
    return(
        <React.Fragment>
            {/* <span className={`${props.monsterType} monster`}></span> */}

            {/* !!Props to className mapping not FINAL!!! MONSTER WEAPON NEEDS TO BE REVISITED. */}

            <span className={`monClass ${props.monsterType}`}></span>
            {/* <span id="monsterWeapon" className={`monWeap ${weaponSide}`}></span> */}
        </React.Fragment>
    )
}

export default Monster