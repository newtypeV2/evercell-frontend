import React from 'react';
import Player from './players';
import Monster from './monsters';


const Tile = (props) => {
    // console.log(props.tileObj.x_coordinate,props.tileObj.y_coordinate)
    // console.log(props.characterObj.x_coordinate,props.characterObj.y_coordinate)
    
    const renderOccupant = () => {
            // console.log("MONS:",props.monsterObjs)
            // console.log("PLAYERS:",props.playerObjs)
            // console.log("TILES:","X:",props.tileObj.x_coordinate,"Y:",props.tileObj.y_coordinate)
        let playerOccupant = props.playerObjs.find(playerObj => playerObj.x_coordinate === props.tileObj.x_coordinate && playerObj.y_coordinate === props.tileObj.y_coordinate);
        let monsterOccupant = props.monsterObjs.find(monsterObj => monsterObj.x_coordinate === props.tileObj.x_coordinate && monsterObj.y_coordinate === props.tileObj.y_coordinate);
        
        if(playerOccupant){
            return <Player key={playerOccupant.id} charName={playerOccupant.character.name} classType={playerOccupant.character.race}/> 
            // console.log("MATCH FOUND AT","TILES:","X:",props.tileObj.x_coordinate,"Y:",props.tileObj.y_coordinate)
        }else if(monsterOccupant){
            return <Monster key={monsterOccupant.id} monsterType={monsterOccupant.monster.name}/>
            // console.log("MONSTER MONSTER FOUND AT","TILES:","X:",props.tileObj.x_coordinate,"Y:",props.tileObj.y_coordinate)
        }else{
            return null
        }
    }

    return(
        
            <div className={props.tileType}>
            {
                (props.tileObj && props.characterObj) ? 
                renderOccupant()
                : null
            }
            {/*  displaying  coords on Tiles.
            <div className="display-coords">
                { 
                    props.tileObj ? `${props.tileObj.x_coordinate},${props.tileObj.y_coordinate}` : null
                } */}
                
            </div>
    )
}

export default Tile