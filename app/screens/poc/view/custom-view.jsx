var React = require('react');
var EventBus = require('./../../../libraries/eventdispatcher/EventDispatcher');

var Events = {
  BUTTON_CLICKED: "button_clicked"
};

var CustomView = React.createClass({

  propTypes: {
    text: React.PropTypes.string
  },

  handleOnClick: function () {
    EventBus.dispatch(Events.BUTTON_CLICKED);
  },

  render: function () {
    return (
        <div className="customViewContainer">
          <div className="customViewButton" onClick={this.handleOnClick}>Button</div>
          <div className="customViewText" >{this.props.text}</div>
        </div>
    );
  }

});

exports.view = CustomView;
exports.event = Events;