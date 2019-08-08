import React from 'react';
import Screen from './screencontainer';
// import PlayerInfoContainer from './playerinfocontainer';
import { GAMES_API } from '../constants';

class GameContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            players: [],
            monsters: [],
            map: {},
            description: null
        }
    }

    componentDidMount = () => {
        fetch(`${GAMES_API}1`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            this.setState({
                players: data.character_games,
                monsters: data.game_monsters,
                map: data.map,
                description: data.description
            })
        })
        document.addEventListener('keydown', this.testHandler);
    }

    testHandler = (e) => {
        let newRace
        let updatePlayers
        let user_id = 1
        switch(e.code){
            case "ArrowRight":
                newRace = 
                !this.getUserCharacter().character.race.includes("mirror") ? 
                this.getUserCharacter().character.race
                :
                this.getUserCharacter().character.race.replace(' mirror','')

                updatePlayers = this.state.players.map(playerObj => {
                    if(playerObj.character.user_id === user_id){
                        if(this.getUserCharacter().x_coordinate+1 >= 0 && this.getUserCharacter().x_coordinate+1 < this.state.map.x_map_size){
                            playerObj.x_coordinate+=1
                        }
                        playerObj.character.race = newRace
                        // console.log('X:',playerObj.x_coordinate,'Y:',playerObj.y_coordinate)
                        return playerObj
                    }else{
                        return playerObj
                    }
                })

                if(this.getUserCharacter().x_coordinate+1 > 0 && this.getUserCharacter().x_coordinate+1 <= this.state.map.x_map_size){
                    this.setState({
                        players: updatePlayers
                    })
                }
            break;

            case "ArrowLeft":
                newRace = 
                    !this.getUserCharacter().character.race.includes("mirror") ? 
                    this.getUserCharacter().character.race + " mirror"
                    :
                    this.getUserCharacter().character.race

                updatePlayers = this.state.players.map(playerObj => {
                    if(playerObj.character.user_id === user_id){
                        if(this.getUserCharacter().x_coordinate-1 >= 0 && this.getUserCharacter().x_coordinate-1 < this.state.map.x_map_size){
                            playerObj.x_coordinate-=1
                        }
                        playerObj.character.race = newRace
                        // console.log('X:',playerObj.x_coordinate,'Y:',playerObj.y_coordinate)
                        return playerObj
                    }else{
                        return playerObj
                    }
                })

                if(this.getUserCharacter().x_coordinate+1 > 0 && this.getUserCharacter().x_coordinate+1 <= this.state.map.x_map_size){
                    this.setState({
                        players: updatePlayers
                    })
                }
            break;

            case "ArrowUp":
                    updatePlayers = this.state.players.map(playerObj => {
                        if(playerObj.character.user_id === user_id){
                            if(this.getUserCharacter().y_coordinate-1 >= 0 && this.getUserCharacter().y_coordinate-1 < this.state.map.y_map_size){
                                playerObj.y_coordinate-=1
                            }
                            // console.log('X:',playerObj.x_coordinate,'Y:',playerObj.y_coordinate)
                            return playerObj
                        }else{
                            return playerObj
                        }
                    })

                    if(this.getUserCharacter().y_coordinate+1 > 0 && this.getUserCharacter().y_coordinate+1 <= this.state.map.y_map_size){
                        this.setState({
                            players: updatePlayers
                        })
                    }
            break;

            case "ArrowDown":
                    updatePlayers = this.state.players.map(playerObj => {
                        if(playerObj.character.user_id === user_id){
                            if(this.getUserCharacter().y_coordinate+1 >= 0 && this.getUserCharacter().y_coordinate+1 < this.state.map.y_map_size){
                                playerObj.y_coordinate+=1
                            }
                            // console.log('X:',playerObj.x_coordinate,'Y:',playerObj.y_coordinate)
                            return playerObj
                        }else{
                            return playerObj
                        }
                    })

                    if(this.getUserCharacter().y_coordinate+1 > 0 && this.getUserCharacter().y_coordinate+1 <= this.state.map.y_map_size){
                        this.setState({
                            players: updatePlayers
                        })
                    }
            break;
            case "Space":
                    
                    if(document.getElementById("weapon").className.includes("right")){
                        document.getElementById("weapon").style.right = "-.3rem"
                        setTimeout(()=>document.getElementById("weapon").style.right = ".1rem",120)
                        console.log("STAB RIGHT")
                    }else{
                        document.getElementById("weapon").style.left = "-.3rem"
                        setTimeout(()=>document.getElementById("weapon").style.left = ".1rem",120)
                        console.log("STAB LEFT")
                    }

            break;
            
            default:
                break
        }
    }

    /* 1 is currently the only user. */
    getUserCharacter = () => (this.state.players.find(characterInstObj => characterInstObj.character.user_id===1))
    
    
    render(){
        return(
            <div>
                
                <Screen 
                    mapObj={this.state.map} 
                    monsterObjs={this.state.monsters}
                    playerObjs={this.state.players}
                    user_id={1}
                    characterObj={this.getUserCharacter()}
                />
                {/* <PlayerInfoContainer /> */}
            </div>
        )
    }
}

export default GameContainer