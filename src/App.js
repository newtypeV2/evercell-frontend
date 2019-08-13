import React from 'react';
import NavBar from './components/navbar';
import Credits from './components/credits'
import GameContainer from './containers/gamecontainer';
import Login from './components/login';
import PageNotFound from './components/pagenotfound';
import CharacterContainer from './containers/charactercontainer';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import './App.css';
import './sprites_src/players.css';
import './sprites_src/tiles.css';
import './sprites_src/monsters.css';
import './sprites_src/misc.css';
import './GameContainer.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loggedInUser:{},
      selectedGame: 0
    }
  }

  loginUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  selectGame = (gameid) => {
    this.setState({
      selectedGame: gameid
    })
    this.props.history.push("/game")
  }

  render(){
    return (
      <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" 
          render={
            () => (this.state.loggedInUser.id ? (<Redirect to="/characters"/>) : (<Redirect to="/login"/>))
          }
        />
        <Route exact path="/login" 
          render={
            (routeProps) => <Login loginUser={this.loginUser} {...routeProps} />
          } 
        />
        <Route exact path="/characters" 
          render={
            (routeProps)=> (this.state.loggedInUser.id ? (<CharacterContainer userObj={this.state.loggedInUser} selectGame={this.selectGame} {...routeProps} />) : (<Redirect to="/login"/>))
          } 
        />
        <Route exact path="/game" 
          render={
            ()=> (this.state.loggedInUser.id && this.state.selectedGame !== 0 ? (<GameContainer userObj={this.state.loggedInUser} gameId={this.state.selectedGame} />) : (<Redirect to="/login"/>))
          } 
        />
        <Route exact path="/credits" component={Credits} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  )
  }
}

export default withRouter(App);
