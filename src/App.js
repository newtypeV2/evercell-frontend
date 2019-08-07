import React from 'react';
import NavBar from './components/navbar';
import GameContainer from './containers/gamecontainer';
import './App.css';
import './sprites_src/players.css';
import './sprites_src/tiles.css';
import './sprites_src/misc.css';
import './GameContainer.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <GameContainer />
    </div>
  );
}

export default App;
