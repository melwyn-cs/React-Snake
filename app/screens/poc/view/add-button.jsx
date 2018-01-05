var React = require('react');
var EventBus = require('./../../../libraries/eventdispatcher/EventDispatcher');

var Events = {
    BUTTON_CLICK: "button_click"
};

var AddButton = React.createClass({
  propTypes: {

  },

  addItem: function () {
    EventBus.dispatch(Events.BUTTON_CLICK);
  },
  
  render: function () {
    return (
        <button className="add" onClick={this.addItem}>Add</button>
    );
  }
});

exports.view = AddButton;
exports.event = Events;