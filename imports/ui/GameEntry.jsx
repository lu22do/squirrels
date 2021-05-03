import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'

export default class GameEntry extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      name: this.props.game ? this.props.game.name : '',
      attribute: this.props.game ? this.props.game.attribute : ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const hasCancelButton = this.props.hasCancelButton;
    return (
      <div className="container">
        <h3>{this.props.title}</h3>
        <form action="action" onSubmit={this.props.handleSubmit}>

          <div className="form-group">
            <label>Game name</label>
            <input className="form-control" type="text" name="name"
              value={this.state.name}
              onChange={this.handleInputChange} />
          </div>

          <div className="form-group">
            <label>Game attribute</label>
            <input className="form-control" type="text" name="attribute"
              value={this.state.attribute}
              onChange={this.handleInputChange} />
          </div>

          <input className="btn btn-default" type="submit" value={this.props.submitTitle}/>&nbsp;
          {hasCancelButton &&
            <Link className="btn btn-default" to="/games-list">Cancel</Link>
          }
        </form>
      </div>
    )
  }
}