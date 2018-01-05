var React = require('react');
var EventBus = require('./../../../libraries/eventdispatcher/EventDispatcher');

var Events = {
  CHANGE: "change"
};

var SearchBar = React.createClass({
  propTypes: {
    
  },

  handleOnChange: function () {
    //console.log(document.getElementsByClassName("searchBar")[0].value);
    //var searchString = document.getElementsByClassName("searchBar")[0].value;
    EventBus.dispatch(Events.CHANGE);
  },

  render: function () {
    return (
        <div className="search">
          <input className="searchBar" type="text" onChange={this.handleOnChange}/>
        </div>
    );
  }
});

exports.view = SearchBar;
exports.event = Events;