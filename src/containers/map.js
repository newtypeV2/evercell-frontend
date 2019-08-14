import React from 'react';
import Tile from '../components/tiles';
// import Player from '../components/players';

class Map extends React.Component{

    getRelativeTile = (x_offset, y_offset) => {
        
        let foundTile = this.props.tileObjs.find(tile => (
            (this.props.characterObj.x_coordinate + x_offset) === tile.x_coordinate &&
            (this.props.characterObj.y_coordinate + y_offset) === tile.y_coordinate
        ))
        if (foundTile){
            return <Tile 
                    key={foundTile.id} 
                    tileType={foundTile.tile.name} 
                    tileObj={foundTile} 
                    monsterObjs={this.props.monsterObjs}
                    playerObjs={this.props.playerObjs}
                    user_id={this.props.user_id}
                />
        }else{
            return <Tile tileType="out_of_bounds" />
        }
    }

    generateViewPort = () => {
       return [
                <div className="tilerow" key="row1">
                    {this.getRelativeTile(-6,-6)}
                    {this.getRelativeTile(-5,-6)}
                    {this.getRelativeTile(-4,-6)}
                    {this.getRelativeTile(-3,-6)}
                    {this.getRelativeTile(-2,-6)}
                    {this.getRelativeTile(-1,-6)}
                    {this.getRelativeTile(0,-6)}
                    {this.getRelativeTile(1,-6)}
                    {this.getRelativeTile(2,-6)}
                    {this.getRelativeTile(3,-6)}
                    {this.getRelativeTile(4,-6)}
                    {this.getRelativeTile(5,-6)}
                    {this.getRelativeTile(6,-6)}
                    </div>,
                <div className="tilerow" key="row2">
                    {this.getRelativeTile(-6,-5)}
                    {this.getRelativeTile(-5,-5)}
                    {this.getRelativeTile(-4,-5)}
                    {this.getRelativeTile(-3,-5)}
                    {this.getRelativeTile(-2,-5)}
                    {this.getRelativeTile(-1,-5)}
                    {this.getRelativeTile(0,-5)}
                    {this.getRelativeTile(1,-5)}
                    {this.getRelativeTile(2,-5)}
                    {this.getRelativeTile(3,-5)}
                    {this.getRelativeTile(4,-5)}
                    {this.getRelativeTile(5,-5)}
                    {this.getRelativeTile(6,-5)}
                    </div>,
                <div className="tilerow" key="row3">
                    {this.getRelativeTile(-6,-4)}
                    {this.getRelativeTile(-5,-4)}
                    {this.getRelativeTile(-4,-4)}
                    {this.getRelativeTile(-3,-4)}
                    {this.getRelativeTile(-2,-4)}
                    {this.getRelativeTile(-1,-4)}
                    {this.getRelativeTile(0,-4)}
                    {this.getRelativeTile(1,-4)}
                    {this.getRelativeTile(2,-4)}
                    {this.getRelativeTile(3,-4)}
                    {this.getRelativeTile(4,-4)}
                    {this.getRelativeTile(5,-4)}
                    {this.getRelativeTile(6,-4)}
                    </div>,
                <div className="tilerow" key="row4">
                    {this.getRelativeTile(-6,-3)}
                    {this.getRelativeTile(-5,-3)}
                    {this.getRelativeTile(-4,-3)}
                    {this.getRelativeTile(-3,-3)}
                    {this.getRelativeTile(-2,-3)}
                    {this.getRelativeTile(-1,-3)}
                    {this.getRelativeTile(0,-3)}
                    {this.getRelativeTile(1,-3)}
                    {this.getRelativeTile(2,-3)}
                    {this.getRelativeTile(3,-3)}
                    {this.getRelativeTile(4,-3)}
                    {this.getRelativeTile(5,-3)}
                    {this.getRelativeTile(6,-3)}
                </div>,
                <div className="tilerow" key="row5">
                    {this.getRelativeTile(-6,-2)}
                    {this.getRelativeTile(-5,-2)}
                    {this.getRelativeTile(-4,-2)}
                    {this.getRelativeTile(-3,-2)}
                    {this.getRelativeTile(-2,-2)}
                    {this.getRelativeTile(-1,-2)}
                    {this.getRelativeTile(0,-2)}
                    {this.getRelativeTile(1,-2)}
                    {this.getRelativeTile(2,-2)}
                    {this.getRelativeTile(3,-2)}
                    {this.getRelativeTile(4,-2)}
                    {this.getRelativeTile(5,-2)}
                    {this.getRelativeTile(6,-2)}
                </div>,
                <div className="tilerow" key="row6">
                    {this.getRelativeTile(-6,-1)}
                    {this.getRelativeTile(-5,-1)}
                    {this.getRelativeTile(-4,-1)}
                    {this.getRelativeTile(-3,-1)}
                    {this.getRelativeTile(-2,-1)}
                    {this.getRelativeTile(-1,-1)}
                    {this.getRelativeTile(0,-1)}
                    {this.getRelativeTile(1,-1)}
                    {this.getRelativeTile(2,-1)}
                    {this.getRelativeTile(3,-1)}
                    {this.getRelativeTile(4,-1)}
                    {this.getRelativeTile(5,-1)}
                    {this.getRelativeTile(6,-1)}
                </div>,
                <div className="tilerow" key="row7">
                    {this.getRelativeTile(-6,0)}
                    {this.getRelativeTile(-5,0)}
                    {this.getRelativeTile(-4,0)}
                    {this.getRelativeTile(-3,0)}
                    {this.getRelativeTile(-2,0)}
                    {this.getRelativeTile(-1,0)}
                    {this.getRelativeTile(0,0)}
                    {this.getRelativeTile(1,0)}
                    {this.getRelativeTile(2,0)}
                    {this.getRelativeTile(3,0)}
                    {this.getRelativeTile(4,0)}
                    {this.getRelativeTile(5,0)}
                    {this.getRelativeTile(6,0)}
                </div>,
                <div className="tilerow" key="row8">
                    {this.getRelativeTile(-6,+1)}
                    {this.getRelativeTile(-5,+1)}
                    {this.getRelativeTile(-4,+1)}
                    {this.getRelativeTile(-3,+1)}
                    {this.getRelativeTile(-2,+1)}
                    {this.getRelativeTile(-1,+1)}
                    {this.getRelativeTile(0,+1)}
                    {this.getRelativeTile(1,+1)}
                    {this.getRelativeTile(2,+1)}
                    {this.getRelativeTile(3,+1)}
                    {this.getRelativeTile(4,+1)}
                    {this.getRelativeTile(5,+1)}
                    {this.getRelativeTile(6,+1)}
                </div>,
                <div className="tilerow" key="row9">
                    {this.getRelativeTile(-6,+2)}
                    {this.getRelativeTile(-5,+2)}
                    {this.getRelativeTile(-4,+2)}
                    {this.getRelativeTile(-3,+2)}
                    {this.getRelativeTile(-2,+2)}
                    {this.getRelativeTile(-1,+2)}
                    {this.getRelativeTile(0,+2)}
                    {this.getRelativeTile(1,+2)}
                    {this.getRelativeTile(2,+2)}
                    {this.getRelativeTile(3,+2)}
                    {this.getRelativeTile(4,+2)}
                    {this.getRelativeTile(5,+2)}
                    {this.getRelativeTile(6,+2)}
                </div>,
                <div className="tilerow" key="row10">
                    {this.getRelativeTile(-6,+3)}
                    {this.getRelativeTile(-5,+3)}
                    {this.getRelativeTile(-4,+3)}
                    {this.getRelativeTile(-3,+3)}
                    {this.getRelativeTile(-2,+3)}
                    {this.getRelativeTile(-1,+3)}
                    {this.getRelativeTile(0,+3)}
                    {this.getRelativeTile(1,+3)}
                    {this.getRelativeTile(2,+3)}
                    {this.getRelativeTile(3,+3)}
                    {this.getRelativeTile(4,+3)}
                    {this.getRelativeTile(5,+3)}
                    {this.getRelativeTile(6,+3)}
                </div>,
                <div className="tilerow" key="row11">
                    {this.getRelativeTile(-6,+4)}
                    {this.getRelativeTile(-5,+4)}
                    {this.getRelativeTile(-4,+4)}
                    {this.getRelativeTile(-3,+4)}
                    {this.getRelativeTile(-2,+4)}
                    {this.getRelativeTile(-1,+4)}
                    {this.getRelativeTile(0,+4)}
                    {this.getRelativeTile(1,+4)}
                    {this.getRelativeTile(2,+4)}
                    {this.getRelativeTile(3,+4)}
                    {this.getRelativeTile(4,+4)}
                    {this.getRelativeTile(5,+4)}
                    {this.getRelativeTile(6,+4)}
                </div>,
                <div className="tilerow" key="row12">
                    {this.getRelativeTile(-6,+5)}
                    {this.getRelativeTile(-5,+5)}
                    {this.getRelativeTile(-4,+5)}
                    {this.getRelativeTile(-3,+5)}
                    {this.getRelativeTile(-2,+5)}
                    {this.getRelativeTile(-1,+5)}
                    {this.getRelativeTile(0,+5)}
                    {this.getRelativeTile(1,+5)}
                    {this.getRelativeTile(2,+5)}
                    {this.getRelativeTile(3,+5)}
                    {this.getRelativeTile(4,+5)}
                    {this.getRelativeTile(5,+5)}
                    {this.getRelativeTile(6,+5)}
                </div>,
                <div className="tilerow" key="row13">
                    {this.getRelativeTile(-6,+6)}
                    {this.getRelativeTile(-5,+6)}
                    {this.getRelativeTile(-4,+6)}
                    {this.getRelativeTile(-3,+6)}
                    {this.getRelativeTile(-2,+6)}
                    {this.getRelativeTile(-1,+6)}
                    {this.getRelativeTile(0,+6)}
                    {this.getRelativeTile(1,+6)}
                    {this.getRelativeTile(2,+6)}
                    {this.getRelativeTile(3,+6)}
                    {this.getRelativeTile(4,+6)}
                    {this.getRelativeTile(5,+6)}
                    {this.getRelativeTile(6,+6)}
                </div>,
        ]
        
    }

    render(){
        return(
            <div id="map">
                {
                        // this.generateMap()
                        this.generateViewPort()
                }
            </div>
        )
    }
}

export default Map

    // generateMid = (x_index, tilestring) => {
    //     let midArray = []
    //     if(tilestring==='wall_top_mid'){
    //         for(let i = 0; i < (x_index-2); i++){
    //             midArray.push(<Tile key={`wtm-${i}`} tileType={tilestring} />)
    //     }
    //     return midArray
    //     }else{
    //         for(let i = 0; i < x_index; i++){
    //             midArray.push(<Tile key={`wm-${i}`} tileType={tilestring} />)
    //         }
    //     return midArray
    //     }

    // }

    // generateTiles = (tileArray) =>{
    //     return tileArray.map(tileObj => 
    //         <Tile 
    //             key={tileObj.id} 
    //             tileType={tileObj.tile.name} 
    //             tileObj={tileObj} 
    //             monsterObjs={this.props.monsterObjs}
    //             playerObjs={this.props.playerObjs}
    //             user_id={this.props.user_id}
    //         />)
    // }
    
    // generateRow = (y_index) => {
    //     return(
    //         <div className="tilerow" key={`floor${y_index}`}>
    //             {/* <Tile tileType="wall_side_mid_left"/> */}
    //             {this.generateTiles(this.props.mapObj.map_tiles.filter(tileObj => tileObj.y_coordinate === y_index))}
    //             {/* <Tile tileType="wall_side_mid_right"/> */}
    //         </div>
    //     )
    // }
    
    // generateTopWall = (x_index) => {
    //     return(
    //         <React.Fragment key={`wall-${x_index}`}>
    //         {/* <div className="tilerow" key={`wall-${x_index}`}> */}
    //             <div className="tilerow">
    //                 {/* "wall_top_mid" is x_index - 2 */}
    //                 <Tile tileType="wall_side_top_left"/>
    //                 <Tile tileType="wall_top_left"/>
    //                 {this.generateMid(x_index,"wall_top_mid")}
    //                 <Tile tileType="wall_top_right"/>
    //                 <Tile tileType="wall_side_top_right"/>
    //             </div> 
    //             <div className="tilerow">
    //                 {/* "wall_mid" is x_index */}
    //                 <Tile tileType="wall_side_mid_left"/>
    //                 {this.generateMid(x_index,"wall_mid")}
    //                 <Tile tileType="wall_side_mid_right"/>
    //             </div>
    //         {/* </div> */}
    //         </React.Fragment>
    //     )
    // }

    // generateMap = () => {
    //     let mapArray = []
    //     // mapArray.push(this.generateTopWall(this.props.mapObj.x_map_size))
    //     for(let y = 0; y < this.props.mapObj.y_map_size; y++){
    //         mapArray.push(this.generateRow(y))
    //     }
    //     return mapArray
    // }