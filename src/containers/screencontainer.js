import React from 'react';
import Map from './map';

class ScreenContainer extends React.Component{

    render(){
        return(
            <div id="screen">
                {this.props.mapObj.id ?
                    <Map 
                        mapObj={this.props.mapObj} 
                        characterObj={this.props.characterObj} 
                        monsterObjs={this.props.monsterObjs}
                        playerObjs={this.props.playerObjs}
                        user_id={this.props.user_id}

                    />
                    :
                    null
                }
            </div>
        )
    }
}

export default ScreenContainer