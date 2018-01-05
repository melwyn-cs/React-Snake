var React = require('react');
var EventBus = require('./../../../libraries/eventdispatcher/EventDispatcher');
var SnakeBody = require('./snake-body').view;

const Particle = require('./particle').view;

var Events = {

};

var SnakeApp = React.createClass({
  propTypes: {

  },

  render: function () {
    return (
        <div className="mainMap">
          <SnakeBody />
        </div>
    );
  }
});

exports.view = SnakeApp;
exports.event = Events;