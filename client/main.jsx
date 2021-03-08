import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { App } from '/imports/ui/App';

Meteor.subscribe('stuffs');
Meteor.subscribe('userData');

Meteor.startup(() => {
  render(<App/>, document.getElementById('react-target'));
});