import React from 'react';
import Tile from '../components/tiles';
// import Player from '../components/players';

class Map extends React.Component{

    generateMid = (x_index, tilestring) => {
        let midArray = []
        if(tilestring==='wall_top_mid'){
            for(let i = 0; i < (x_index-2); i++){
                midArray.push(<Tile key={`wtm-${i}`} tileType={tilestring} />)
        }
        return midArray
        }else{
            for(let i = 0; i < x_index; i++){
                midArray.push(<Tile key={`wm-${i}`} tileType={tilestring} />)
            }
        return midArray
        }

    }

    generateTiles = (tileArray) =>{
        return tileArray.map(tileObj => 
            <Tile 
                key={tileObj.id} 
                tileType={tileObj.tile.name} 
                tileObj={tileObj} 
                monsterObjs={this.props.monsterObjs}
                playerObjs={this.props.playerObjs}
                user_id={this.props.user_id}
            />)
    }
    
    generateRow = (y_index) => {
        return(
            <div className="tilerow" key={`floor${y_index}`}>
                {/* <Tile tileType="wall_side_mid_left"/> */}
                {this.generateTiles(this.props.mapObj.map_tiles.filter(tileObj => tileObj.y_coordinate === y_index))}
                {/* <Tile tileType="wall_side_mid_right"/> */}
            </div>
        )
    }
    
    generateTopWall = (x_index) => {
        return(
            <React.Fragment key={`wall-${x_index}`}>
            {/* <div className="tilerow" key={`wall-${x_index}`}> */}
                <div className="tilerow">
                    {/* "wall_top_mid" is x_index - 2 */}
                    <Tile tileType="wall_side_top_left"/>
                    <Tile tileType="wall_top_left"/>
                    {this.generateMid(x_index,"wall_top_mid")}
                    <Tile tileType="wall_top_right"/>
                    <Tile tileType="wall_side_top_right"/>
                </div> 
                <div className="tilerow">
                    {/* "wall_mid" is x_index */}
                    <Tile tileType="wall_side_mid_left"/>
                    {this.generateMid(x_index,"wall_mid")}
                    <Tile tileType="wall_side_mid_right"/>
                </div>
            {/* </div> */}
            </React.Fragment>
        )
    }

    generateMap = () => {
        let mapArray = []
        // mapArray.push(this.generateTopWall(this.props.mapObj.x_map_size))
        for(let y = 0; y < this.props.mapObj.y_map_size; y++){
            mapArray.push(this.generateRow(y))
        }
        return mapArray
    }

    render(){
        return(
            <div id="map">
                {
                    this.props.mapObj.map_tiles ?
                        this.generateMap()
                        :
                        null
                }
            </div>
        )
    }
}

export default Map