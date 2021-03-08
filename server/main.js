import { Meteor } from 'meteor/meteor';
import './publication'

// create admin account if it does not exists
if (!Meteor.users.findOne({username: 'admin'})) {
  var password = 'admin';
  if (Meteor.settings.adminPassword) {
    password = Meteor.settings.adminPassword;
  }
  if (!Accounts.createUser({username: 'admin', 
                 					  password: password})) {
    console.log('Admin account creation error');
  }
}

console.log('Server started');