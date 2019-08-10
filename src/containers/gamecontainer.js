import React from 'react';
import Screen from './screencontainer';
// import PlayerInfoContainer from './playerinfocontainer';
import { GAMES_API, WS_URL } from '../constants';
import ActionCable from 'actioncable';

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
        // For fetching, 
        // 1 -> 10x10 MAP - 1 Char - 3 Monsters
        // 2 -> 48x16 MAP - 1 Char - 0 Monsters
        // 3 -> 20x20 MAP - 2 Char - 4 Monsters
        fetch(`${GAMES_API}3`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                players: data.character_games,
                monsters: data.game_monsters,
                map: data.map,
                description: data.description
            })
        })
        document.addEventListener('keydown', this.keyDownHandler);

        const cable = ActionCable.createConsumer(WS_URL)
        this.sub = cable.subscriptions.create('CharacterGameChannel', {
        received: this.handleReceiveNewData
    })
    }

    handleReceiveNewData = (data) => {
        this.setState({
            players: this.state.players.map(playerObj => playerObj.id === data.id ? data : playerObj)
        })
        // if (<model-attribute> !== this.state.<your-state>) {
        //   this.setState({ <model-attribute> })
        // }
      }
    
    //   handleChange = e => {
    //       debugger
    //     // this.setState({ <your-state>: e.target.value })
    //   }

    daggerStab = () => {
            document.getElementById(`${this.getUserCharacter().character.name} weapon`).classList.add("stab")
            setTimeout(()=>{
                document.getElementById(`${this.getUserCharacter().character.name} weapon`).classList.remove("stab")
            },120)
    }

    attackHandler = () => {
        if((this.getUserCharacter().direction === "right")){
            // if(!(this.getUserCharacter().character.race.includes("mirror"))){
            // console.log("Damage anyone at X:",this.getUserCharacter().x_coordinate+1,"Y:",this.getUserCharacter().y_coordinate)
            let hitMonster = this.state.monsters.find(
                monsterObj => 
                    monsterObj.x_coordinate === this.getUserCharacter().x_coordinate+1 &&
                    monsterObj.y_coordinate === this.getUserCharacter().y_coordinate
                )
            let hitPlayer = this.state.players.find(
                monsterObj => 
                    monsterObj.x_coordinate === this.getUserCharacter().x_coordinate+1 &&
                    monsterObj.y_coordinate === this.getUserCharacter().y_coordinate
                )
                if(hitMonster){
                    console.log(hitMonster.monster.name,"-",hitMonster.id, "was hit. Monster was at X:",hitMonster.x_coordinate,"Y:",hitMonster.y_coordinate)
                }
                if(hitPlayer){
                    console.log(hitPlayer.character.name, "was hit. Player was at X:",hitPlayer.x_coordinate,"Y:",hitPlayer.y_coordinate)
                }
        }else{
            let hitMonster = this.state.monsters.find(
                monsterObj => 
                    monsterObj.x_coordinate === this.getUserCharacter().x_coordinate-1 &&
                    monsterObj.y_coordinate === this.getUserCharacter().y_coordinate
                )
            let hitPlayer = this.state.players.find(
                monsterObj => 
                    monsterObj.x_coordinate === this.getUserCharacter().x_coordinate-1 &&
                    monsterObj.y_coordinate === this.getUserCharacter().y_coordinate
                )
                if(hitMonster){
                    console.log(hitMonster.monster.name,"-",hitMonster.id, "was hit. Monster was at X:",hitMonster.x_coordinate,"Y:",hitMonster.y_coordinate)
                }
                if(hitPlayer){ 
                    console.log(hitPlayer.character.name, "was hit. Player was at X:",hitPlayer.x_coordinate,"Y:",hitPlayer.y_coordinate)
                }
        }
    }
    
    //FOR TESTING PURPOSES:

    monsterMoveTest = () => {
        const randomMovement = [1,-1,0]
        let newMonsters = this.state.monsters.map(monsterObj => {
            let xValue = randomMovement[Math.floor(Math.random() * Math.floor(2))];
            let yValue = randomMovement[Math.floor(Math.random() * Math.floor(2))];

            if(monsterObj.x_coordinate+xValue >=0 && monsterObj.x_coordinate+xValue < this.state.map.x_map_size){
                monsterObj.x_coordinate+=xValue
            }

            if(monsterObj.y_coordinate+yValue >=0 && monsterObj.y_coordinate+yValue < this.state.map.y_map_size){
                monsterObj.y_coordinate+=yValue
            }

            return monsterObj
        })
        this.setState({
            monsters: newMonsters
        })
    }

    monsterDaggerStab = () => {
            // document.getElementById("monsterWeapon").classList.add("stab")
            document.querySelectorAll(".monWeap").forEach(node => node.classList.add("stab"))
            setTimeout(()=>{
                document.querySelectorAll(".monWeap").forEach(node => node.classList.remove("stab"))
            },120)
    }

    keyDownHandler = (e) => {
        let updatePlayers
        let otherPlayers = this.state.players.filter(playerObj => playerObj.character.user_id !== this.props.userObj.id)
        let newDirection

        /* ArrowRight and ArrowLeft key needs to be updated so that the character will stay put and just turn back when the opposite direction is pressed.
            Currently, the Player turns around and moves 1 tile.
        */
        //updatePlayers is the prepped new state position of the users character.
        //newRace is the prepped new state state for the where the avatar faces(either left or right by appending or removing "mirror" on the classname).
        //Monster Collision, Player Collision and WithinMapChecker can be created as helper methods to replace the conditions so it can be used on the move conditions.
        switch(e.code){
            //ADD COLUMN DIRECTION TO CHARACTERGAME WITH DEFAULT VALUE RIGHT. DIRECTION COLUMN WILL DETERMINE IF IT IS MIRRORED OR NOT.
            case "ArrowRight":

                    // !this.getUserCharacter().character.race.includes("mirror") ? 
                    // this.getUserCharacter().character.race
                    // :
                    // this.getUserCharacter().character.race.replace(' mirror','')
                newDirection = this.getUserCharacter().direction === "right" ? "left" : "right"

                updatePlayers = this.state.players.map(playerObj => {
                    if(playerObj.character.user_id === this.props.userObj.id){
                        // console.log(playerObj)
                        //x.coordinate+1 to see if there's more room right.
                        if(
                            //Map limit condition check.
                            this.getUserCharacter().x_coordinate+1 >= 0 && 
                            this.getUserCharacter().x_coordinate+1 < this.state.map.x_map_size &&
                            //Monster collision check.
                            !(this.state.monsters.find(monsterObj => monsterObj.x_coordinate===this.getUserCharacter().x_coordinate+1 &&
                             monsterObj.y_coordinate===this.getUserCharacter().y_coordinate)) &&
                            //Player collision check.
                            !(otherPlayers.find(playerObj => playerObj.x_coordinate===this.getUserCharacter().x_coordinate+1 &&
                             playerObj.y_coordinate===this.getUserCharacter().y_coordinate)) 
                             && this.getUserCharacter().direction === "right"
                            //Turn back condition check.
                            // !this.getUserCharacter().character.race.includes("mirror")
                        ){
                            playerObj.x_coordinate+=1
                        }else{
                            playerObj.direction = newDirection
                        }
                        // playerObj.character.race = newRace
                        // console.log('X:',playerObj.x_coordinate,'Y:',playerObj.y_coordinate)
                        return playerObj
                    }else{
                        return playerObj
                    }
                })

                if(this.getUserCharacter().x_coordinate >= 0 && this.getUserCharacter().x_coordinate < this.state.map.x_map_size){
                    // this.sub.send({updatePlayers})
                    this.sub.send(updatePlayers.find(characterInstObj => characterInstObj.character.user_id === this.props.userObj.id))
                    this.setState({
                        players: updatePlayers
                    })
                }
            break;

            case "ArrowLeft":
                newDirection = this.getUserCharacter().direction === "right" ? "left" : "right"
                // newDirection = 
                //     !this.getUserCharacter().character.race.includes("mirror") ? 
                //     this.getUserCharacter().character.race + " mirror"
                //     :
                //     this.getUserCharacter().character.race

                updatePlayers = this.state.players.map(playerObj => {
                    if(playerObj.character.user_id === this.props.userObj.id){
                        //x.coordinate-1 to see if there's more room left.
                        if(
                            //Map limit condition check.
                            this.getUserCharacter().x_coordinate-1 >= 0 && 
                            this.getUserCharacter().x_coordinate-1 < this.state.map.x_map_size &&
                            //Monster collision check.
                            !(this.state.monsters.find(monsterObj => monsterObj.x_coordinate===this.getUserCharacter().x_coordinate-1 &&
                             monsterObj.y_coordinate===this.getUserCharacter().y_coordinate)) &&
                             //Player collision check.
                            !(otherPlayers.find(playerObj => playerObj.x_coordinate===this.getUserCharacter().x_coordinate-1 &&
                            playerObj.y_coordinate===this.getUserCharacter().y_coordinate)) 
                            && !(this.getUserCharacter().direction === "right")
                             //Turn back condition check.
                        ){
                            playerObj.x_coordinate-=1
                        }else{
                            playerObj.direction = newDirection
                        }
                        // playerObj.character.race = newRace
                        // console.log('X:',playerObj.x_coordinate,'Y:',playerObj.y_coordinate)
                        return playerObj
                    }else{
                        return playerObj
                    }
                })

                if(this.getUserCharacter().x_coordinate >= 0 && this.getUserCharacter().x_coordinate < this.state.map.x_map_size){
                    // this.sub.send({updatePlayers})
                    this.sub.send(updatePlayers.find(characterInstObj => characterInstObj.character.user_id === this.props.userObj.id))
                    this.setState({
                        players: updatePlayers
                    })
                }
            break;

            case "ArrowUp":
                    updatePlayers = this.state.players.map(playerObj => {
                        if(playerObj.character.user_id === this.props.userObj.id){
                            //y.coordinate-1 to see if there's more room up.
                            if(
                                //Map limit condition check.
                                this.getUserCharacter().y_coordinate-1 >= 0 &&
                                this.getUserCharacter().y_coordinate-1 < this.state.map.y_map_size &&
                                //Monster collision check.
                                !(this.state.monsters.find(monsterObj => monsterObj.x_coordinate===this.getUserCharacter().x_coordinate &&
                                 monsterObj.y_coordinate===this.getUserCharacter().y_coordinate-1)) &&
                                //Player collision check.
                                 !(otherPlayers.find(monsterObj => monsterObj.x_coordinate===this.getUserCharacter().x_coordinate &&
                                 monsterObj.y_coordinate===this.getUserCharacter().y_coordinate-1))
                            ){
                                playerObj.y_coordinate-=1
                            }
                            // console.log('X:',playerObj.x_coordinate,'Y:',playerObj.y_coordinate)
                            return playerObj
                        }else{
                            return playerObj
                        }
                    })

                    if(this.getUserCharacter().y_coordinate >= 0 && this.getUserCharacter().y_coordinate < this.state.map.y_map_size){
                        // this.sub.send({updatePlayers})
                        this.sub.send(updatePlayers.find(characterInstObj => characterInstObj.character.user_id === this.props.userObj.id))
                        this.setState({
                            players: updatePlayers
                        })
                    }
            break;

            case "ArrowDown":
                    updatePlayers = this.state.players.map(playerObj => {
                        if(playerObj.character.user_id === this.props.userObj.id){
                            //y.coordinate+1 to see if there's more room down.
                            if(
                                //Map limit condition check.
                                this.getUserCharacter().y_coordinate+1 >= 0 &&
                                this.getUserCharacter().y_coordinate+1 < this.state.map.y_map_size &&
                                //Monster collition check.
                                !(this.state.monsters.find(monsterObj => monsterObj.x_coordinate===this.getUserCharacter().x_coordinate &&
                                 monsterObj.y_coordinate===this.getUserCharacter().y_coordinate+1)) &&
                                !(otherPlayers.find(monsterObj => monsterObj.x_coordinate===this.getUserCharacter().x_coordinate &&
                                 monsterObj.y_coordinate===this.getUserCharacter().y_coordinate+1))
                            ){
                                playerObj.y_coordinate+=1
                            }
                            // console.log('X:',playerObj.x_coordinate,'Y:',playerObj.y_coordinate)
                            return playerObj
                        }else{
                            return playerObj
                        }
                    })

                    if(this.getUserCharacter().y_coordinate > 0 && this.getUserCharacter().y_coordinate <= this.state.map.y_map_size){
                        // this.sub.send({updatePlayers})
                        this.sub.send(updatePlayers.find(characterInstObj => characterInstObj.character.user_id === this.props.userObj.id))
                        this.setState({
                            players: updatePlayers
                        })
                    }
            break;
            case "Space":
                    this.daggerStab();
                    this.attackHandler();
            break;
            //THIS IS JUST FOR TESTING PURPOSES
            case "KeyP":
                    this.monsterMoveTest();
            break;
            case "KeyO":
                    this.monsterDaggerStab();
            break;
            //THIS IS JUST FOR TESTING PURPOSES
            default:
                break
        }
    }
    
    getUserCharacter = () => (this.state.players.find(characterInstObj => characterInstObj.character.user_id === this.props.userObj.id ))
    
    render(){
        return(
            <div>
                
                <Screen 
                    mapObj={this.state.map} 
                    monsterObjs={this.state.monsters}
                    playerObjs={this.state.players}
                    user_id={this.props.userObj.id}
                />
                {/* <PlayerInfoContainer /> */}
            </div>
        )
    }
}

export default GameContainer