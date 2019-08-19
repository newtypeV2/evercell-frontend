import React from 'react';
import NavBar from './components/navbar';
import Credits from './components/credits'
import GameContainer from './containers/gamecontainer';
import Login from './components/login';
import PageNotFound from './components/pagenotfound';
import CharacterContainer from './containers/charactercontainer';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { TOKEN_URL } from './constants';
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

  logoutUser = () => {
    localStorage.clear()
    this.setState({
      loggedInUser : {},
      selectedGame: 0
    },() => {window.location.reload()})
  }
  
  selectGame = (gameid) => {
    this.setState({
      selectedGame: gameid
    })
    this.props.history.push("/game")
  }
  
  componentDidMount = () => {
      if(localStorage.jwt){
        fetch(TOKEN_URL,{
          headers: {"Authentication": `Bearer ${localStorage.jwt}`}
        })
        .then(res => res.json())
        .then(userObj =>{
          this.loginUser(userObj)
        })
      }
  }
  render(){
    return (
      <div className="App">
      <NavBar 
        loggedInUser = {this.state.loggedInUser}
        logoutUser = {this.logoutUser}
      />
      <Switch>
        <Route exact path="/" 
          render={
            () => (this.state.loggedInUser.id ?
              (<Redirect to="/characters"/>)
              :
              (<Redirect to="/login"/>))
          }
        />
        <Route exact path="/login" 
          render={
            () => (this.state.loggedInUser.id ?
              (<Redirect to="/characters"/>)
              :
              <Login loginUser={this.loginUser}  />
            )
          } 
        />
        <Route exact path="/characters" 
          render={
            ()=> (this.state.loggedInUser.id ? 
              (<CharacterContainer 
                userObj={this.state.loggedInUser} 
                selectGame={this.selectGame} 
              />)
              :
              (<Redirect to="/login"/>))
          } 
        />
        <Route exact path="/game" 
          render={
            ()=> (this.state.loggedInUser.id && this.state.selectedGame !== 0 ? 
              (<GameContainer 
                userObj={this.state.loggedInUser} 
                gameId={this.state.selectedGame} 
              />)
              : 
              (<Redirect to="/login"/>))
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
