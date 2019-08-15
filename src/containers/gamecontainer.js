import React from 'react';
import Screen from './screencontainer';
import PlayerInfoContainer from './playerinfocontainer';
import ChatContainer from './chatcontainer';
import { GAMES_API, WS_URL } from '../constants';
import ActionCable from 'actioncable';
import _ from 'lodash';

class GameContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            players: [],
            monsters: [],
            map: {},
            description: null,
            messages:[],
            logs: []
        }
    }

    componentDidMount = () => {
        // For fetching, 
        // 1 -> 10x10 MAP - 1 Char - 3 Monsters
        // 2 -> 48x16 MAP - 1 Char - 0 Monsters
        // 3 -> 20x20 MAP - 2 Char - 4 Monsters
        // 4 -> 32x32 MAP - 6 Char - all other tiles are with Monsters
        fetch(`${GAMES_API}${this.props.gameId}`)
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
        document.addEventListener('keyup', this.keyDownHandler);

        //CharacterGameChannel now handles all Game related events
        const cable = ActionCable.createConsumer(WS_URL)

        this.playersSub = cable.subscriptions.create('CharacterGameChannel', {
            received: this.handleReceivedPlayersData
        })

        this.messageLogs = cable.subscriptions.create('MessageLogsChannel', {
            received: this.handleMessageLogsData
        })

        // this.monstersSub = cable.subscriptions.create('GameMonsterChannel', {
        //     received: this.handleReceivedMonsterData
        // })
        
        // this.animationsSub = cable.subscriptions.create('AnimationChannel', {
        //     received: this.handleReceivedAnimationData
        // })
    }

    handleMessageLogsData = (data) => {
        if(data.log){
            this.setState({
                logs : [...this.state.logs,data.log]
            })
        }
        if(data.message){
            this.setState({
                messages : [...this.state.messages,data.message]
            })
        }
    }

    handleReceivedPlayersData = (data) => {
        if(data.player){
            this.setState({
                    players: this.state.players.map(playerObj => playerObj.id === data.player.id ? data.player : playerObj)
                })
        }

        if(data.monsters){
            this.setState({
                monsters : data.monsters
            })
        }

        if(data.animation){
            this.daggerStab(data.animation);
        }
        // Used for monster movement but not suitable for many monsters.
        // if(data.monsters){
        //     let new_monsters = this.state.monsters.map(monsterObj => {
        //         let new_coordinates = data.monsters.find(monster => monster.id === monsterObj.id);
        //         if(new_coordinates){
        //         monsterObj = {...monsterObj, 
        //         x_coordinate: new_coordinates.x_coordinate, 
        //         y_coordinate: new_coordinates.y_coordinate
        //         }
        //         return monsterObj
        //         }else{
        //             return monsterObj
        //         }
        //     })
        //     this.setState({
        //         players: this.state.players.map(playerObj => playerObj.id === data.player.id ? data.player : playerObj),
        //         monsters: new_monsters
        //     })
        // }else{
        //     this.setState({
        //         players: this.state.players.map(playerObj => playerObj.id === data.player.id ? data.player : playerObj),
        //     })
        // }
      }

    deBouncedAttack = _.debounce( () => { 
        this.attackHandler()
        this.playersSub.send({
            animation : this.getUserCharacter()
        })
     },130) 

    deBouncedUpdateX = _.debounce( (x_offset,y_offset,direction) => {
        let otherPlayers = this.state.players.filter(playerObj => playerObj.character.user_id !== this.props.userObj.id)    
        let updatePlayers = this.state.players.map(playerObj => {
            if(playerObj.character.user_id === this.props.userObj.id){
                // console.log(playerObj)
                //x.coordinate+1 to see if there's more room right.
                if(
                    //Map limit condition check.
                    this.getUserCharacter().x_coordinate+x_offset >= 0 && 
                    this.getUserCharacter().x_coordinate+x_offset < this.state.map.x_map_size &&
                    //Monster collision check.
                    !(this.state.monsters.find(monsterObj => 
                        monsterObj.x_coordinate===this.getUserCharacter().x_coordinate+x_offset &&
                        monsterObj.y_coordinate===this.getUserCharacter().y_coordinate+y_offset &&
                        monsterObj.hp !== 0
                    )) &&
                    //Player collision check.
                    !(otherPlayers.find(playerObj => 
                        playerObj.x_coordinate===this.getUserCharacter().x_coordinate+x_offset &&
                        playerObj.y_coordinate===this.getUserCharacter().y_coordinate+y_offset &&
                        playerObj.hp !== 0
                    )) && 
                    this.getUserCharacter().direction === direction
                    //Turn back condition check.
                    // !this.getUserCharacter().character.race.includes("mirror")
                ){
                    playerObj.x_coordinate+=x_offset
                }
                    playerObj.direction = direction
                // console.log('X:',playerObj.x_coordinate,'Y:',playerObj.y_coordinate)
                return playerObj
            }else{
                return playerObj
            }
        })
        if(this.getUserCharacter().x_coordinate >= 0 && this.getUserCharacter().x_coordinate < this.state.map.x_map_size){
            // this.playersSub.send({updatePlayers})

            this.playersSub.send({
                player : updatePlayers.find(characterInstObj => characterInstObj.character.user_id === this.props.userObj.id)
            })
            
            this.setState({
                players: updatePlayers
            })
        }
    }, 130)

    deBouncedUpdateY = _.debounce((x_offset,y_offset) => {
    let otherPlayers = this.state.players.filter(playerObj => playerObj.character.user_id !== this.props.userObj.id)   
    let updatePlayers = this.state.players.map(playerObj => {
        if(playerObj.character.user_id === this.props.userObj.id){
            //y.coordinate-1 to see if there's more room up.
            if(
                //Map limit condition check.
                this.getUserCharacter().y_coordinate+y_offset >= 0 &&
                this.getUserCharacter().y_coordinate+y_offset < this.state.map.y_map_size &&
                //Monster collision check.
                !(this.state.monsters.find(monsterObj => 
                    monsterObj.x_coordinate===this.getUserCharacter().x_coordinate+x_offset &&
                    monsterObj.y_coordinate===this.getUserCharacter().y_coordinate+y_offset &&
                    monsterObj.hp !==0
                    )) &&
                //Player collision check.
                 !(otherPlayers.find(playerObj => 
                    playerObj.x_coordinate===this.getUserCharacter().x_coordinate+x_offset &&
                    playerObj.y_coordinate===this.getUserCharacter().y_coordinate+y_offset &&
                    playerObj.hp !== 0
                    ))
            ){
                playerObj.y_coordinate+=y_offset
            }
            // console.log('X:',playerObj.x_coordinate,'Y:',playerObj.y_coordinate)
            return playerObj
        }else{
            return playerObj
        }
    })

    if(this.getUserCharacter().y_coordinate >= 0 && this.getUserCharacter().y_coordinate < this.state.map.y_map_size){
        // this.sub.send({updatePlayers})
            this.playersSub.send({
                player : updatePlayers.find(characterInstObj => characterInstObj.character.user_id === this.props.userObj.id)
            })
        this.setState({
                players: updatePlayers
            })
        }
    }, 130)

    daggerStab = (characterObj) => {
        if(characterObj.hp > 0 && document.getElementById(`${characterObj.character.name} weapon`)!== null){
            document.getElementById(`${characterObj.character.name} weapon`).classList.add("stab")
            setTimeout(()=>{
                if(document.getElementById(`${characterObj.character.name} weapon`)!==null){
                document.getElementById(`${characterObj.character.name} weapon`).classList.remove("stab")
            }
            },120)
        }
    }

    attackHandler = () => {
        if((this.getUserCharacter().direction === "right")){

            let hitMonster = this.state.monsters.find(
                monsterObj => 
                    monsterObj.x_coordinate === this.getUserCharacter().x_coordinate+1 &&
                    monsterObj.y_coordinate === this.getUserCharacter().y_coordinate &&
                    monsterObj.hp > 0
                )
            let hitPlayer = this.state.players.find(
                playerObj => 
                    playerObj.x_coordinate === this.getUserCharacter().x_coordinate+1 &&
                    playerObj.y_coordinate === this.getUserCharacter().y_coordinate &&
                    playerObj.hp > 0
                )
                if(hitMonster){
                    hitMonster.hp -= this.getUserCharacter().character.attack_damage
                    if (hitMonster.hp <= 0){
                        hitMonster.hp = 0
                        this.messageLogs.send({log : `${this.getUserCharacter().character.name} killed ${hitMonster.monster.name}`})
                    }
                    let updatedMonsters = this.state.monsters.map(monsterObj => monsterObj.id === hitMonster.id ? hitMonster : monsterObj)
                    this.playersSub.send({
                        monsters : updatedMonsters
                    })
                    this.setState({
                        monster : updatedMonsters
                    })
                }
                if(hitPlayer){
                    
                    hitPlayer.hp -= this.getUserCharacter().character.attack_damage
                    if (hitPlayer.hp <= 0){
                        hitPlayer.hp = 0
                        this.messageLogs.send({log : `${this.getUserCharacter().character.name} killed ${hitPlayer.character.name}`})
                    }
                    let updatedPlayers = this.state.players.map(playerobj => playerobj.id === hitPlayer.id ? hitPlayer : playerobj)
                    this.playersSub.send({
                        player : hitPlayer
                    })
                    this.setState({
                        players : updatedPlayers
                    })
                }
        }else{
            let hitMonster = this.state.monsters.find(
                monsterObj => 
                    monsterObj.x_coordinate === this.getUserCharacter().x_coordinate-1 &&
                    monsterObj.y_coordinate === this.getUserCharacter().y_coordinate &&
                    monsterObj.hp > 0
                )
            let hitPlayer = this.state.players.find(
                playerObj => 
                    playerObj.x_coordinate === this.getUserCharacter().x_coordinate-1 &&
                    playerObj.y_coordinate === this.getUserCharacter().y_coordinate &&
                    playerObj.hp > 0
                )
                if(hitMonster){
                    hitMonster.hp -= this.getUserCharacter().character.attack_damage
                    if (hitMonster.hp <= 0){
                        hitMonster.hp = 0
                        this.messageLogs.send({log : `${this.getUserCharacter().character.name} killed ${hitMonster.monster.name}`})
                    }
                    let updatedMonsters = this.state.monsters.map(monsterObj => monsterObj.id === hitMonster.id ? hitMonster : monsterObj)
                    this.playersSub.send({
                        monsters : updatedMonsters
                    })
                    this.setState({
                        monster : updatedMonsters
                    })
                }
                if(hitPlayer){ 

                    hitPlayer.hp -= this.getUserCharacter().character.attack_damage
                    if (hitPlayer.hp <= 0){
                        hitPlayer.hp = 0
                        this.messageLogs.send({log : `${this.getUserCharacter().character.name} killed ${hitPlayer.character.name}`})
                    }
                    let updatedPlayers = this.state.players.map(playerobj => playerobj.id === hitPlayer.id ? hitPlayer : playerobj)
                    this.playersSub.send({
                        player : hitPlayer
                    })
                    this.setState({
                        players : updatedPlayers
                    })
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


    keyDownHandler = (e) => {
        switch(e.code){
            case "ArrowRight":
            if(this.getUserCharacter().hp > 0){
                this.deBouncedUpdateX(1,0,"right")
            }
            break;

            case "ArrowLeft":
            if(this.getUserCharacter().hp > 0){
                this.deBouncedUpdateX(-1,0,"left")
            }
            break;

            case "ArrowUp":
            if(this.getUserCharacter().hp > 0){
                    this.deBouncedUpdateY(0,-1)
            }
            break;

            case "ArrowDown":
            if(this.getUserCharacter().hp > 0){
                this.deBouncedUpdateY(0,1)
            }                    
            break;
            case "Space":
                if(this.getUserCharacter().hp > 0){
                    this.deBouncedAttack()
                    
                }   
            
            break;
            //THIS IS JUST FOR TESTING PURPOSES
            case "KeyP":
            if(this.getUserCharacter().hp > 0 && this.props.userObj.id === 1){
                    this.monsterMoveTest();
            }
            break;
            case "KeyO":
            if(this.getUserCharacter().hp > 0 && this.props.userObj.id === 1){                
                    this.monsterDaggerStab();
            }
            break;
            //THIS IS JUST FOR TESTING PURPOSES
            default:
                break
        }
    }
    
    getUserCharacter = () => (this.state.players.find(characterInstObj => characterInstObj.character.user_id === this.props.userObj.id ))
    render(){
        return(
            <div id="game">
                <Screen 
                    mapObj={this.state.map} 
                    monsterObjs={this.state.monsters}
                    playerObjs={this.state.players}
                    characterObj={this.getUserCharacter()}
                    user_id={this.props.userObj.id}
                />
                <ChatContainer />
                <PlayerInfoContainer 
                    characterObj={this.getUserCharacter()}
                    logs={this.state.logs}
                />
            </div>
        )
    }
}

export default GameContainer