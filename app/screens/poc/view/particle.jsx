var React = require('react');
var EventBus = require('./../../../libraries/eventdispatcher/EventDispatcher');
var _ = require('lodash');
var Events = {

};

var Particle = React.createClass({
  propTypes: {
    x: React.PropTypes.number,
    y: React.PropTypes.number,
    backgroundColor: React.PropTypes.string
  },

  render: function () {
    let oProps = this.props;
    let oStyle = {
      top: oProps.y,
      left: oProps.x,
    };
    if (!_.isEmpty(oProps.backgroundColor)) {
      oStyle.backgroundColor = oProps.backgroundColor;
    }

    return (
      <div className="particle" style={oStyle}>
      </div>
    );
  }
});

exports.view = Particle;
exports.event = Events;