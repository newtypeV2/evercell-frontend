import React from 'react';

const PlayerCard = (props) => {
    return(
        <div className="playercard">
            <div>
                <span className="knight-idle"></span><span>{props.playerInfo}</span>
            </div>
            <div>
                <span className="ui_heart_full"></span>
                <span className="ui_heart_full"></span>
                <span className="ui_heart_full"></span>
            </div>
        </div>
    )
}

export default PlayerCard