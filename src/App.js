import React from 'react';
import NavBar from './components/navbar';
import Credits from './components/credits'
import GameContainer from './containers/gamecontainer';
import Login from './components/login';
import PageNotFound from './components/pagenotfound';
import { Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import './sprites_src/players.css';
import './sprites_src/tiles.css';
import './sprites_src/monsters.css';
import './sprites_src/misc.css';
import './GameContainer.css';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      loggedInUser:{}
    }
  }

  loginUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render(){
    return (
      <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" 
          render={
            () => (this.state.loggedInUser.id ? (<Redirect to="/game"/>) : (<Redirect to="/login"/>))
          }
        />
        <Route exact path="/login" 
          render={(routeProps) => <Login loginUser={this.loginUser} {...routeProps} />} 
        />
        <Route exact path="/game" 
          render={
            ()=> (this.state.loggedInUser.id ? (<GameContainer userObj={this.state.loggedInUser} />) : (<Redirect to="/login"/>))
          } 
        />
        <Route exact path="/credits" component={Credits} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  )
  }
}

export default App;
