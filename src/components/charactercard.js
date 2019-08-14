import React from 'react';

const CharacterCard = (props) => {

    const onClickHandler = () => {
        if(props.characterObj.game_session.id){
            props.selectGame(props.characterObj.game_session.id)
        }else{
            alert("CHARACTER NOT IN GAME.")
        }
    }

    return (
        <div className="charactercard" onClick={onClickHandler}>
            <div className={`${props.characterObj.race}-character-card`}></div>
            <div>{props.characterObj.name}</div>
        </div>
    )
}

export default CharacterCard