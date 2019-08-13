import React from 'react';
import Map from './map';
// import Player from '../components/players';
// import Monster from '../components/monsters';

class ScreenContainer extends React.Component{

    getNearbyTiles = () => {    
        return this.props.mapObj.map_tiles.filter(tiles => 
            (tiles.x_coordinate >= this.props.characterObj.x_coordinate-3 &&
                tiles.x_coordinate <= this.props.characterObj.x_coordinate+3 &&
                tiles.y_coordinate >= this.props.characterObj.y_coordinate-3 &&
                tiles.y_coordinate <= this.props.characterObj.y_coordinate+3
                ))
    }

    getNearbyPlayers = () => {
        return this.props.playerObjs.filter(tiles => 
            (tiles.x_coordinate >= this.props.characterObj.x_coordinate-3 &&
                tiles.x_coordinate <= this.props.characterObj.x_coordinate+3 &&
                tiles.y_coordinate >= this.props.characterObj.y_coordinate-3 &&
                tiles.y_coordinate <= this.props.characterObj.y_coordinate+3
                ))

    }

    getNearbyMonsters = () => {
        return this.props.monsterObjs.filter(tiles => 
            (tiles.x_coordinate >= this.props.characterObj.x_coordinate-3 &&
                tiles.x_coordinate <= this.props.characterObj.x_coordinate+3 &&
                tiles.y_coordinate >= this.props.characterObj.y_coordinate-3 &&
                tiles.y_coordinate <= this.props.characterObj.y_coordinate+3
                ))

    }


    render(){
        return(
            <div id="screen">
                {
                    this.props.characterObj ?
                    <Map 
                    tileObjs = {this.getNearbyTiles()}
                    mapObj = {this.props.mapObj} 
                    // monsterObjs = {this.props.monsterObjs}
                    // playerObjs = {this.props.playerObjs}
                    monsterObjs = {this.getNearbyMonsters()}
                    playerObjs = {this.getNearbyPlayers()}
                    user_id = {this.props.user_id}
                    characterObj = {this.props.characterObj}
                    />
                    :
                    null
                }
                
            </div>
        )
    }
}

export default ScreenContainer