var React = require('react');
var ViewController = require('./app/screens/poc/controller/view-controller.jsx');
var ViewStore = require('./app/screens/poc/store/view-store.js');
var ViewAction = require('./app/screens/poc/action/view-action.js');

React.render(<ViewController store = {ViewStore} action={ViewAction}/>,
                document.getElementById('container'));


