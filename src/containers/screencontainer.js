import React from 'react';
import Map from './map';
// import Player from '../components/players';
// import Monster from '../components/monsters';

class ScreenContainer extends React.Component{

    render(){
        return(
            <div id="screen">
                <Map mapObj={this.props.mapObj} characterObj={this.props.characterObj}/>
                {/* <Player classType="knight-idle"/> */}
                {/* <Monster /> */}
            </div>
        )
    }
}

export default ScreenContainer