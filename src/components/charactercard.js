import React from 'react';

const CharacterCard = (props) => {
    return (
        <div className="charactercard" onClick={() => props.onClickHandler(props.characterObj.games[0].id)}>
            <div className={`${props.characterObj.race}-character-card`}></div>
            <div>{props.characterObj.name}</div>
        </div>
    )
}

export default CharacterCard