var React = require('react');
var EventBus = require('./../../../libraries/eventdispatcher/EventDispatcher');

var Events = {

};

var ListItems = React.createClass({
  propTypes: {

  },

  render: function () {
    console.log(this.props.list);
    var list = this.props.list;
    const data = list.map((object, i) => {
      return (
          <li key={i}>{object}</li>
      );
    });
    return (
        <div className="list-items">
          <ul>
            {data}
          </ul>
        </div>
    );
  }
});

exports.view = ListItems;
exports.event = Events;