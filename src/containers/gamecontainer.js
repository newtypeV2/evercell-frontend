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
        document.addEventListener('keydown', this.keyDownHandler);
    }

    daggerStab = () => {
        if(document.getElementById(`${this.getUserCharacter().character.name} weapon`).className.includes("right")){
            document.getElementById(`${this.getUserCharacter().character.name} weapon`).classList.add("stab")
            setTimeout(()=>{
                // document.getElementById(`${this.getUserCharacter().character.name} weapon`).style.transform = "rotate(45deg)"
                // document.getElementById(`${this.getUserCharacter().character.name} weapon`).style.right = "-.1rem"
                document.getElementById(`${this.getUserCharacter().character.name} weapon`).classList.remove("stab")
            },120)
        }else{
            document.getElementById(`${this.getUserCharacter().character.name} weapon`).classList.add("stab")
            setTimeout(()=>{
                // document.getElementById(`${this.getUserCharacter().character.name} weapon`).style.transform = "rotate(-45deg)scale(-1,1)"
                // document.getElementById(`${this.getUserCharacter().character.name} weapon`).style.right = ".7rem"
                document.getElementById(`${this.getUserCharacter().character.name} weapon`).classList.remove("stab")
            },120)
        }

    }

    keyDownHandler = (e) => {
        let newRace
        let updatePlayers
        let user_id = 1

        /* ArrowRight and ArrowLeft key needs to be updated so that the character will stay put and just turn back when the opposite direction is pressed.
            Currently, the Player turns around and moves 1 tile.
        */
        //updatePlayers is the prepped new state position of the users character.

        //newRace is the prepped new state state for the where the avatar faces(either left or right by appending or removing "mirror" on the classname).

        switch(e.code){
            case "ArrowRight":
                newRace = 
                !this.getUserCharacter().character.race.includes("mirror") ? 
                this.getUserCharacter().character.race
                :
                this.getUserCharacter().character.race.replace(' mirror','')

                updatePlayers = this.state.players.map(playerObj => {
                    if(playerObj.character.user_id === user_id){
                        //x.coordinate+1 to see if there's more room right.
                        if(
                            this.getUserCharacter().x_coordinate+1 >= 0 && 
                            this.getUserCharacter().x_coordinate+1 < this.state.map.x_map_size &&
                            !this.getUserCharacter().character.race.includes("mirror")
                        ){
                            playerObj.x_coordinate+=1
                        }
                        playerObj.character.race = newRace
                        // console.log('X:',playerObj.x_coordinate,'Y:',playerObj.y_coordinate)
                        return playerObj
                    }else{
                        return playerObj
                    }
                })

                if(this.getUserCharacter().x_coordinate >= 0 && this.getUserCharacter().x_coordinate < this.state.map.x_map_size){
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
                        //x.coordinate-1 to see if there's more room left.
                        if(
                            this.getUserCharacter().x_coordinate-1 >= 0 && 
                            this.getUserCharacter().x_coordinate-1 < this.state.map.x_map_size &&
                            this.getUserCharacter().character.race.includes("mirror")
                        ){
                            playerObj.x_coordinate-=1
                        }
                        playerObj.character.race = newRace
                        // console.log('X:',playerObj.x_coordinate,'Y:',playerObj.y_coordinate)
                        return playerObj
                    }else{
                        return playerObj
                    }
                })

                if(this.getUserCharacter().x_coordinate >= 0 && this.getUserCharacter().x_coordinate < this.state.map.x_map_size){
                    this.setState({
                        players: updatePlayers
                    })
                }
            break;

            case "ArrowUp":
                    updatePlayers = this.state.players.map(playerObj => {
                        if(playerObj.character.user_id === user_id){
                            //y.coordinate-1 to see if there's more room up.
                            if(this.getUserCharacter().y_coordinate-1 >= 0 && this.getUserCharacter().y_coordinate-1 < this.state.map.y_map_size){
                                playerObj.y_coordinate-=1
                            }
                            // console.log('X:',playerObj.x_coordinate,'Y:',playerObj.y_coordinate)
                            return playerObj
                        }else{
                            return playerObj
                        }
                    })

                    if(this.getUserCharacter().y_coordinate >= 0 && this.getUserCharacter().y_coordinate < this.state.map.y_map_size){
                        this.setState({
                            players: updatePlayers
                        })
                    }
            break;

            case "ArrowDown":
                    updatePlayers = this.state.players.map(playerObj => {
                        if(playerObj.character.user_id === user_id){
                            //y.coordinate+1 to see if there's more room down.
                            if(this.getUserCharacter().y_coordinate+1 >= 0 && this.getUserCharacter().y_coordinate+1 < this.state.map.y_map_size){
                                playerObj.y_coordinate+=1
                            }
                            // console.log('X:',playerObj.x_coordinate,'Y:',playerObj.y_coordinate)
                            return playerObj
                        }else{
                            return playerObj
                        }
                    })

                    if(this.getUserCharacter().y_coordinate > 0 && this.getUserCharacter().y_coordinate <= this.state.map.y_map_size){
                        this.setState({
                            players: updatePlayers
                        })
                    }
            break;
            case "Space":
                    this.daggerStab();
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