import React from 'react';
import PlayerCard from '../components/playercard';

class PlayerInfoContainer extends React.Component{
    
    render(){
        return(
            <div id="playerinfocontainer">
                <PlayerCard playerInfo="Player 1"/>
                <PlayerCard playerInfo="Player 2"/>
                <PlayerCard playerInfo="Player 3"/>
                <PlayerCard playerInfo="Player 4"/>
            </div>
        )
    }
}

export default PlayerInfoContainer