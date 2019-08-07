import React from 'react';
import Screen from './screencontainer';
import PlayerInfoContainer from './playerinfocontainer';
import { GAMES_API } from '../constants';

class GameContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            players: [],
            character: {},
            monsters: [],
            map: {},
            description: null
        }
    }

    componentDidMount = () => {
        fetch(`${GAMES_API}1`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                players: data.character_games,
                character: data.character_games.find(characterInstObj => characterInstObj.character.user_id===1),
                monsters: data.game_monsters,
                map: data.map,
                description: data.description
            })
        })
        document.addEventListener('keydown', this.testHandler);
    }

    testHandler = (e) => {
        switch(e.key){
            case "ArrowRight":
                if(this.state.character.x_coordinate+1 >= 0 && this.state.character.x_coordinate+1 < this.state.map.x_map_size){
                    this.setState({
                        character: {...this.state.character,x_coordinate: this.state.character.x_coordinate + 1}
                    })
                    document.getElementById(this.state.character.character.name).classList.remove("mirror")
                }
            break;
            case "ArrowLeft":
                if(this.state.character.x_coordinate-1 >= 0 && this.state.character.x_coordinate-1 < this.state.map.x_map_size){
                    this.setState({
                        character: {...this.state.character,x_coordinate: this.state.character.x_coordinate - 1}
                    })
                    document.getElementById(this.state.character.character.name).classList.add("mirror")
                }
            break;
            case "ArrowUp":
                    if(this.state.character.y_coordinate-1 >= 0 && this.state.character.y_coordinate-1 < this.state.map.y_map_size){
                        this.setState({
                            character: {...this.state.character,y_coordinate: this.state.character.y_coordinate - 1}
                        })
                    }
            break;
            case "ArrowDown":
                    if(this.state.character.y_coordinate+1 >= 0 && this.state.character.y_coordinate+1 < this.state.map.y_map_size){
                        this.setState({
                            character: {...this.state.character,y_coordinate: this.state.character.y_coordinate + 1}
                        })
                    }
            break;
            default:
                break
        }
    }
    
    render(){
        return(
            <div>
                <Screen mapObj={this.state.map} characterObj={this.state.character}/>
                <PlayerInfoContainer />
            </div>
        )
    }
}

export default GameContainer