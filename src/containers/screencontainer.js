import React from 'react';
import Map from './map';
// import Player from '../components/players';
// import Monster from '../components/monsters';

class ScreenContainer extends React.Component{

    getNearbyTiles = (offset) => {    
        return this.props.mapObj.map_tiles.filter(tiles => 
            (tiles.x_coordinate >= this.props.characterObj.x_coordinate-offset &&
                tiles.x_coordinate <= this.props.characterObj.x_coordinate+offset &&
                tiles.y_coordinate >= this.props.characterObj.y_coordinate-offset &&
                tiles.y_coordinate <= this.props.characterObj.y_coordinate+offset
                ))
    }

    getNearbyPlayers = (offset) => {
        return this.props.playerObjs.filter(playerObj => 
            (playerObj.x_coordinate >= this.props.characterObj.x_coordinate-offset &&
                playerObj.x_coordinate <= this.props.characterObj.x_coordinate+offset &&
                playerObj.y_coordinate >= this.props.characterObj.y_coordinate-offset &&
                playerObj.y_coordinate <= this.props.characterObj.y_coordinate+offset &&
                playerObj.hp > 0
                ))

    }

    getNearbyMonsters = (offset) => {
        return this.props.monsterObjs.filter(monsterObj => 
            (monsterObj.x_coordinate >= this.props.characterObj.x_coordinate-offset &&
                monsterObj.x_coordinate <= this.props.characterObj.x_coordinate+offset &&
                monsterObj.y_coordinate >= this.props.characterObj.y_coordinate-offset &&
                monsterObj.y_coordinate <= this.props.characterObj.y_coordinate+offset &&
                monsterObj.hp > 0
                ))

    }


    render(){
        const tileOffset = 6;
        return(
            <div id="screen">
                {
                    this.props.characterObj ?
                    <Map 
                    tileObjs = {this.getNearbyTiles(tileOffset)}
                    mapObj = {this.props.mapObj} 
                    monsterObjs = {this.getNearbyMonsters(tileOffset)}
                    playerObjs = {this.getNearbyPlayers(tileOffset)}
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