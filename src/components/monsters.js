import React from 'react';

const Monster = (props) => {
    // let weaponSide = props.classType.includes("mirror") ? "weapon_knife left" : "weapon_knife right"
    // let weaponSide = "weapon_knife right"
    return(
        <React.Fragment>
            <span className={`${props.monsterType} monster`}></span>
            {/* <span id="weapon" className={weaponSide}></span> */}
        </React.Fragment>
    )
}

export default Monster