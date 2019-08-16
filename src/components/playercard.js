import React from 'react';

const PlayerCard = (props) => {
    return(
    <React.Fragment>
        { props.characterObj ?
        <div className="playercard">
            <div>
                <span className={`${props.characterObj.character.race}-character-card`}></span><span className="cardnametag">{props.characterObj.character.name}</span>
            </div>
            <div className="cardheartcontainer">
                <span className={props.characterObj.hp >= 10 ? "ui_heart_full" : "ui_heart_empty"}></span>
                <span className={props.characterObj.hp >= 20 ? "ui_heart_full" : "ui_heart_empty"}></span>
                <span className={props.characterObj.hp >= 30 ? "ui_heart_full" : "ui_heart_empty"}></span>
                <span className={props.characterObj.hp >= 40 ? "ui_heart_full" : "ui_heart_empty"}></span>
            </div>
            <div>

            </div>
        </div> 
        :
        null
    }
    </React.Fragment>
    )
}

export default PlayerCard