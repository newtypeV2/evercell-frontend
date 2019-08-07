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
    }

    testHandler = (e) => {
        debugger
    }
    
    render(){
        return(
            <div >
                <Screen mapObj={this.state.map} characterObj={this.state.character}/>
                <PlayerInfoContainer />
            </div>
        )
    }
}

export default GameContainer