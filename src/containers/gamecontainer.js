import React from 'react';
import Screen from './screencontainer';
import PlayerInfoContainer from './playerinfocontainer';
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
        fetch(`${GAMES_API}2`)
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
    }
    
    render(){
        return(
            <div>
                <Screen mapObj={this.state.map}/>
                <PlayerInfoContainer />
            </div>
        )
    }
}

export default GameContainer