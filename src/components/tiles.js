import React from 'react';
import Player from './players';


const Tile = (props) => {
    // console.log(props.tileObj.x_coordinate,props.tileObj.y_coordinate)
    // console.log(props.characterObj.x_coordinate,props.characterObj.y_coordinate)
    return(
            <div className={props.tileType}>
            {
                (props.tileObj && props.characterObj) ? 
                (props.tileObj.x_coordinate===props.characterObj.x_coordinate && props.tileObj.y_coordinate===props.characterObj.y_coordinate) ?
                    <Player charName={props.characterObj.character.name} classType="knight"/> : null
                : null
            }
            {/* <div className="display-coords">
                { 
                    props.tileObj ? `${props.tileObj.x_coordinate},${props.tileObj.y_coordinate}` : null
                } */}
                
            </div>
    )
}

export default Tile