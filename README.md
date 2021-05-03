This project is based on https://github.com/lu22do/accounts-boilerplate-react but updated for latest package versions (e.g. Meteor 2.x, react xx, ...).

This is a meteor/react/bootstrap boilerplate for an app manipulating some data (a collection of 'games' defined by a schemas) and protected by accounts using a user name for login. It uses react-router.

Regarding account management, there is an 'admin' account who can see and administer the users (and any game data). Login is required to use the app and only the owner can delete/edit his own game. The Admin password can be set in the settings.json file.

The UI react components are the following:
- App
- Topbar
- Auth:
    - Login
    - Register
- Games:
    - Game list
    - New game (uses GameEntry component)
    - Edit game (uses GameEntry component)
- Users:
    - User list

This project was created by adding the following meteor packages to an app created with --react flag:
- accounts-password
- twbs:bootstrap
- momentjs:moment
- aldeed:collection2 & aldeed:schema-deny
and the following npm packages:
- react-router-dom
- simpl-schema

Possible improvements:
- for error handling, use real UI component rather than alert() - actually alert() don't seem to work with react-router
- add unit test
- add a 'Game detail' UI component as real app would usually have more details than can be shown in 'Game list'
- investigate why game updates are not reflected dynamically (only add/remove) in list and edit views


