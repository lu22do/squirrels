import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route, Link, Redirect, NavLink } from 'react-router-dom';

import TopBar from './TopBar.jsx';
import GamesList from './GamesList.jsx';
import NewGame from './NewGame.jsx';
import EditGame from './EditGame.jsx';
import Users from './Users.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

const Welcome = () => (
  <div className="container">
    <h1>Welcome to squirrels.io!</h1>
    <br/>
    If you know the code of an existing game, enter it here to join:
    <form action="/toto" className="form-inline">
      <label htmlFor="gameCode" className="col-sm-1 col-form-label">Code:</label>
      <input type="text" id="gameCode" className="form-control col-sm-4" />
      <input type="submit" value="Join" className="btn btn-primary" />
    </form>
    <br/>
    You can also create your own game by clicking:<br/>
    <NavLink to="/new-game" activeClassName="active" className="btn btn-primary">Create a game
    </NavLink>
  </div>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Meteor.userId() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <TopBar location={this.location}/>

          <PrivateRoute exact path='/' component={Welcome}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <PrivateRoute path='/games-list' component={GamesList}/>
          <PrivateRoute path='/new-game' component={NewGame}/>
          <PrivateRoute path='/edit-game/:id' component={EditGame}/>
          <PrivateRoute path='/users' component={Users}/>
        </div>
      </BrowserRouter>
    )
  }
}
