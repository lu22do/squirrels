import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data';

import Games from '../api/games';
import GameEntry from './GameEntry.jsx'

class EditGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let name = this.gameEntry.state.name;
    let attribute = this.gameEntry.state.attribute;
    let that = this;

    Games.update(this.props.game._id,
                  {$set: {name: name,
                          attribute: attribute}}, function(err, _id) {
      if (err) {
        alert('Unexpected error updating this game (' + err + ')!')
      }
      else {
        that.props.history.push('/games-list');
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && !nextProps.loaded) {
      this.setState({
        loaded: true,
        name: nextProps.game.name,
        attribute: nextProps.game.attribute
      });
    }
  }

  render() {
    if (this.props.loading) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    return (
      <GameEntry title="Edit a game:" game={this.props.game} handleSubmit={this.handleSubmit}
        ref={(gameEntry) => {this.gameEntry = gameEntry}} submitTitle="Update" hasCancelButton />
    );
  }
}

export default withRouter(withTracker(props => {
  const handle = Meteor.subscribe('games');
  const loading = !handle.ready();
  const game = Games.findOne(props.match.params.id);

  return {
    loading,
    game
  };
})(EditGame));