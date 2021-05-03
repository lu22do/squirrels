import React, { Component } from 'react';
import Games from '../api/games';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

class GamesList extends Component {
  deleteGame(e) {
    e.preventDefault();
    let id = e.target.getAttribute('data-id');
    Games.remove(id, function(err) {
      if (err) {
        alert('Could not delete');
      }
    });
  }

  renderGames() {
    return this.props.games().map((game) => (
      <tr key={game.id}>
        <td>{game.name}</td>
        <td>{game.attribute}</td>
        <td>{game.ownername}</td>
        <td>{game.created}</td>
        <td>
          {game.isMyGame &&
            <div>
              <Link to={`/edit-game/${game.id}`}>Edit</Link> /&nbsp;
              <a onClick={this.deleteGame} data-id={game.id} href="">Delete</a>
            </div>
          }
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <div className="container">
        {this.props.gameCount ? (
          <div>
            <h1>Games:</h1>
            <table className="table table-striped">
              <thead>
              <tr>
                <th>Name</th>
                <th>Attribute</th>
                <th>Owner</th>
                <th>Creation date</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
                {this.renderGames()}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
          No games found
          </div>
       )}
      </div>
    )
  }
}

export default withTracker(props => {
  const games = function() {
    return Games.find({}).map(function(game) {
      var user = Meteor.users.findOne(game.owner);

      var isMyGame = false;
      if (Meteor.userId() === game.owner ||
          (Meteor.user() && Meteor.user().username === 'admin')) {
        isMyGame = true;
      }

      return {name: game.name,
              attribute: game.attribute,
              created: moment(game.created).calendar(),
              id: game._id,
              ownername: user ? user.username : "unknown",
              isMyGame: isMyGame};
    });
  };
  const gameCount = Games.find({}).count();

  return {
    games,
    gameCount
  };
})(GamesList);