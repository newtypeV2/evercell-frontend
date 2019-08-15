import React from 'react';
import PlayerCard from '../components/playercard';

class PlayerInfoContainer extends React.Component{
    
    render(){
        return(
            <div id="playerinfocontainer">
                <div id="logwindow">
                    <div>Message 1</div>
                    <div>Message 2</div>
                    <div>Message 3</div>
                    <div>Message 2</div>
                    <div>Message 3</div>  
                </div>
                <PlayerCard characterObj={this.props.characterObj}/>
            </div>
        )
    }
}

export default PlayerInfoContainer