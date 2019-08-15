import React from 'react';
import PlayerCard from '../components/playercard';

class PlayerInfoContainer extends React.Component{

    renderLogs = () => {
        //limit to 5 logs
        // if(this.props.length < 5){
        //     let empty_log = 5 - this.props.length
        //     for(let i = 0; i < empty_log; i++){

        //     }
        // }else{

        // }

        let limit
        let test = []
        let array = []
        if(this.props.logs.length - 5 < 0){
            limit = 0
        }else{
            limit = this.props.logs.length - 5
        }
        for(let i = this.props.logs.length-1; i >= limit; i--){
            test.push(this.props.logs[i])
            array.push(<div key={i} className="log">{this.props.logs[i]}</div>)
        }
        console.log(test)
        return array
    }
    
    render(){
        return(
            <div id="playerinfocontainer">
                <div id="logwindow">
                    { this.props.logs.length !== 0 ? this.renderLogs() : null }
                </div>
                <PlayerCard characterObj={this.props.characterObj}/>
            </div>
        )
    }
}

export default PlayerInfoContainer