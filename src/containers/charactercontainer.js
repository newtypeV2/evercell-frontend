import React from 'react';
import { withRouter } from 'react-router-dom';
import CharacterCard from '../components/charactercard';

class CharacterContainer extends React.Component{

renderCharacterCards = () => this.props.userObj.characters.map(character => 
    <CharacterCard 
        key={character.id}
        characterObj={character}
        onClickHandler={this.props.selectGame}
    />
)

    render(){
        return(
            <div id="charactercontainer">
                {this.renderCharacterCards()}
            </div>
        )
    }
}

export default withRouter(CharacterContainer)
