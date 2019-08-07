import React from 'react';
import Map from './map';
import Player from '../components/players';
// import Monster from '../components/monsters';

class ScreenContainer extends React.Component{

    render(){
        return(
            <div>
                <Map mapObj={this.props.mapObj}/>
                <Player />
                {/* <Monster /> */}
            </div>
        )
    }
}

export default ScreenContainer