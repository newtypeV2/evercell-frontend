import React from 'react';
import Screen from './screencontainer';
import PlayerInfoContainer from './playerinfocontainer';
import ChatContainer from './chatcontainer';
import { GAMES_API, WS_URL } from '../constants';
import ActionCable from 'actioncable';
// import Sound from 'react-sound';
// import BGM from '../assets/DarkThings2.mp3'
import _ from 'lodash';

class GameContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            players: [],
            monsters: [],
            map: {},
            description: null,
            messages:[],
            logs: [],
            skillCD: {skillOne : true}
        }
    }

    sendMessage = (message) => {
        this.messageLogs.send({
            body : message,
            sender : this.getUserCharacter().character.name,
            userId : this.props.userObj.id,
            gameId : this.props.gameId
        })
    }

    respawnPlayer = () => {
        this.playersSub.send({
            respawn : this.getUserCharacter(),
            gameId : this.props.gameId
        })
    }

    componentDidMount = () => {
        fetch(`${GAMES_API}${this.props.gameId}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                isLoading: false,
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
        if(data.gameId === this.props.gameId){
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
    }

    handleReceivedPlayersData = (data) => {
        if(data.gameId === this.props.gameId){
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
                if(data.animation && data.skill){
                    this.skillSmash(data.animation)
                }else{
                    this.daggerStab(data.animation);
                }
            }

            if(data.players){
                this.setState({
                    players : data.players
                })
            }
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


    deBouncedSkillSmash = _.debounce( () => { 
        this.attackHandler("smash")
        this.playersSub.send({
            animation : this.getUserCharacter(),
            skill : 1,
            gameId : this.props.gameId
        })
     },130) 

    deBouncedAttack = _.debounce( () => { 
        this.attackHandler()
        this.playersSub.send({
            animation : this.getUserCharacter(),
            gameId : this.props.gameId
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
                player : updatePlayers.find(characterInstObj => characterInstObj.character.user_id === this.props.userObj.id),
                gameId : this.props.gameId
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
                player : updatePlayers.find(characterInstObj => characterInstObj.character.user_id === this.props.userObj.id),
                gameId : this.props.gameId
            })
        this.setState({
                players: updatePlayers
            })
        }
    }, 130)


    skillSmash = (characterObj) => {
        if(document.getElementById(`${characterObj.character.name} secondaryweapon`) !== null && document.getElementById(`${characterObj.character.name}-model`) !== null ){
            let secondaryWeapon = document.getElementById(`${characterObj.character.name} secondaryweapon`)
            let wholeModel = document.getElementById(`${characterObj.character.name}-model`) 
            secondaryWeapon.classList.remove("hidden")
            wholeModel.classList.add(`--skill1-${characterObj.direction}`)
            setTimeout(()=>{
                if(secondaryWeapon !== null){
                secondaryWeapon.classList.add("hidden")
                wholeModel.classList.remove(`--skill1-${characterObj.direction}`)
            }
            },500)
        }
    }

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

    attackHandler = (skill) => {
        if(skill === "smash"){
            let hitPlayers = this.state.players.filter(
                playerObj => 
                    playerObj.x_coordinate <= this.getUserCharacter().x_coordinate+1 &&
                    playerObj.x_coordinate >= this.getUserCharacter().x_coordinate-1 &&
                    playerObj.y_coordinate <= this.getUserCharacter().y_coordinate+1 &&
                    playerObj.y_coordinate >= this.getUserCharacter().y_coordinate-1 &&
                    playerObj !== this.getUserCharacter() &&
                    playerObj.hp > 0
                )
            if (hitPlayers){
                let hp_hitPlayers = hitPlayers.map(playerObj => {
                    playerObj.hp -= this.getUserCharacter().character.attack_damage
                        if (playerObj.hp <=0){
                            playerObj.hp = 0
                            this.messageLogs.send({
                                log : `${this.getUserCharacter().character.name} killed ${playerObj.character.name}`,
                                gameId : this.props.gameId
                            })
                        }
                    return playerObj
                })
                let updatedPlayers = this.state.players.map(playerObj => {
                    let findUpdated = hp_hitPlayers.find(pObj => pObj.id === playerObj.id)
                    if(findUpdated){
                        return findUpdated
                    }else{
                        return playerObj
                    }
                })
                this.playersSub.send({
                    players : updatedPlayers,
                    gameId : this.props.gameId
                })
                // this.setState({
                //     players : updatedPlayers
                // })
                        
            }
        }else{
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
                            this.messageLogs.send({
                                log : `${this.getUserCharacter().character.name} killed ${hitMonster.monster.name}`,
                                gameId : this.props.gameId
                            })
                        }
                        let updatedMonsters = this.state.monsters.map(monsterObj => monsterObj.id === hitMonster.id ? hitMonster : monsterObj)
                        this.playersSub.send({
                            monsters : updatedMonsters,
                            gameId : this.props.gameId
                        })
                        this.setState({
                            monster : updatedMonsters
                        })
                    }
                    if(hitPlayer){
                        
                        hitPlayer.hp -= this.getUserCharacter().character.attack_damage
                        if (hitPlayer.hp <= 0){
                            hitPlayer.hp = 0
                            this.messageLogs.send({
                                log : `${this.getUserCharacter().character.name} killed ${hitPlayer.character.name}`,
                                gameId : this.props.gameId
                            })
                        }
                        let updatedPlayers = this.state.players.map(playerobj => playerobj.id === hitPlayer.id ? hitPlayer : playerobj)
                        this.playersSub.send({
                            player : hitPlayer,
                            gameId : this.props.gameId
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
                            this.messageLogs.send({
                                log : `${this.getUserCharacter().character.name} killed ${hitMonster.monster.name}`,
                                gameId : this.props.gameId
                            })
                        }
                        let updatedMonsters = this.state.monsters.map(monsterObj => monsterObj.id === hitMonster.id ? hitMonster : monsterObj)
                        this.playersSub.send({
                            monsters : updatedMonsters,
                            gameId : this.props.gameId
                        })
                        this.setState({
                            monster : updatedMonsters
                        })
                    }
                    if(hitPlayer){ 
    
                        hitPlayer.hp -= this.getUserCharacter().character.attack_damage
                        if (hitPlayer.hp <= 0){
                            hitPlayer.hp = 0
                            this.messageLogs.send({
                                log : `${this.getUserCharacter().character.name} killed ${hitPlayer.character.name}`,
                                gameId : this.props.gameId
                            })
                        }
                        let updatedPlayers = this.state.players.map(playerobj => playerobj.id === hitPlayer.id ? hitPlayer : playerobj)
                        this.playersSub.send({
                            player : hitPlayer,
                            gameId : this.props.gameId
                        })
                        this.setState({
                            players : updatedPlayers
                        })
                    }
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
            if(this.state.isLoading === false && this.getUserCharacter().hp > 0){
                this.deBouncedUpdateX(1,0,"right")
            }
            break;

            case "ArrowLeft":
            if(this.state.isLoading === false && this.getUserCharacter().hp > 0){
                this.deBouncedUpdateX(-1,0,"left")
            }
            break;

            case "ArrowUp":
            if(this.state.isLoading === false && this.getUserCharacter().hp > 0){
                    this.deBouncedUpdateY(0,-1)
            }
            break;

            case "ArrowDown":
            if(this.state.isLoading === false && this.getUserCharacter().hp > 0){
                this.deBouncedUpdateY(0,1)
            }                    
            break;
            case "Space":
                if(this.state.isLoading === false && this.getUserCharacter().hp > 0){
                    this.deBouncedAttack()
                    
                }   
            break;
            case "Digit1":
                if(this.state.isLoading === false && this.state.skillCD.skillOne && this.getUserCharacter().hp > 0){
                    // this.skillOne()
                    this.deBouncedSkillSmash()
                    this.setState({
                        skillCD : {...this.state.skillCD,skillOne : false}
                    })
                    document.removeEventListener('keyup', this.keyDownHandler);
                    setTimeout(()=>document.addEventListener('keyup', this.keyDownHandler),400)
                    setTimeout(()=>
                        {
                            this.setState({
                            skillCD : {...this.state.skillCD,skillOne : true}
                            })
                        },3000)
                    
                }   
            break
            //THIS IS JUST FOR TESTING PURPOSES
            case "KeyP":
            if(this.state.isLoading === false && this.getUserCharacter().hp > 0 && this.props.userObj.id === 1){
                    this.monsterMoveTest();
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
            <React.Fragment>
            { this.state.isLoading ?
                <div id="loadingscreen">
                    <div className="human-character-card"></div>
                    <div className="lizard-character-card"></div>
                    <div className="elf-character-card"></div>
                    <div className="wizard-character-card"></div>
                    <div>LOADING . . .</div>
                </div>
                :
                <div id="game">
                    <Screen 
                        mapObj = {this.state.map} 
                        monsterObjs = {this.state.monsters}
                        playerObjs = {this.state.players}
                        characterObj = {this.getUserCharacter()}
                        user_id = {this.props.userObj.id}
                    />
                    <PlayerInfoContainer 
                        characterObj = {this.getUserCharacter()}
                        logs = {this.state.logs}
                        respawnPlayer = {this.respawnPlayer}
                        skillCD = {this.state.skillCD}
                    />
                    <ChatContainer 
                        characterObj = {this.getUserCharacter()}
                        messages = {this.state.messages}
                        sendMessage = {this.sendMessage}
                    />
                    {/* <Sound
                        url={BGM}
                        playStatus={Sound.status.PLAYING}
                        onLoading={this.handleSongLoading}
                        onPlaying={this.handleSongPlaying}
                        onFinishedPlaying={this.handleSongFinishedPlaying}
                        loop={true}
                    /> */}
                </div>
            }
            </React.Fragment>
        )
    }
}

export default GameContainer