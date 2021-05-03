import React, { Component } from 'react';
import Games from '../api/games';
import { withRouter } from 'react-router-dom'; // makes history available in props

import GameEntry from './GameEntry.jsx'

class NewGame extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let name = this.gameEntry.state.name;
    let attribute = this.gameEntry.state.attribute;
    let that = this;

    if (!Games.find({name}).count()) {
      Games.insert(
        { name,
          attribute,
          owner: Meteor.userId() },
        function(err, _id) {
          if (err) {
            alert('Unexpected error creating this game! (' + err + ')');
            that.props.history.push('/');
          }
          else {
            that.props.history.push('/games-list');
          }
        }
      );
    }
    else {
      alert('This game already exists! Could not create it.')
      this.setState({
        name: '',
        attribute: ''
      });
    }
    return false;
  }

  render() {
    return (
      <GameEntry title="Create new game:" game={{name: '', attribute: ''}} handleSubmit={this.handleSubmit}
        ref={(gameEntry) => {this.gameEntry = gameEntry}} submitTitle="Create" />
    );
  }
}

export default withRouter(NewGame);