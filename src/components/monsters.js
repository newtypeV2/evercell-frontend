import React from 'react';

const Monster = (props) => {
    return(
        <div className={`${props.monsterType} monster`}></div>
    )
}

export default Monster