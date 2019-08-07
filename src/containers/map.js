import React from 'react';
import Tile from '../components/tiles';

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
        return tileArray.map(tileObj => <Tile key={tileObj.id} tileType={tileObj.tile.name} />)
    }
    
    generateRow = (x_index) => {
        return(
            <div className="tilerow" key={`floor${x_index}`}>
                <Tile tileType="wall_side_mid_left"/>
                {this.generateTiles(this.props.mapObj.map_tiles.filter(tileObj => tileObj.x_coordinate === x_index))}
                <Tile tileType="wall_side_mid_right"/>
            </div>
        )
    }
    
    generateTopWall = (x_index) => {
        return(
            <div>
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
            </div>
        )
    }

    generateMap = () => {
        let mapArray = []
        mapArray.push(this.generateTopWall(this.props.mapObj.x_map_size))
        for(let x = 0; x < this.props.mapObj.x_map_size; x++){
            mapArray.push(this.generateRow(x))
        }
        return mapArray
    }

    render(){
        return(
            <div className="map">
                
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