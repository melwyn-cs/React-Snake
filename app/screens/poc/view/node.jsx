var React = require('react');
var EventBus = require('./../../../libraries/eventdispatcher/EventDispatcher');

var Events = {
  EXPAND: 'expand',
  ADD: 'add',
  DELETE: 'delete'
};

var Node = React.createClass({

  propTypes: {
    text: React.PropTypes.string
  },


  handleExpand: function (id) {
    EventBus.dispatch(Events.EXPAND, id);
  },

  handleAdd :function (id) {
    var input = prompt("Folder/Filename: ");
    console.log(input);
    EventBus.dispatch(Events.ADD, id, input);
  },

  handleDelete: function (id) {
    EventBus.dispatch(Events.DELETE, id);
  },

  display :[],

  displayComponent: function (root) {
    if (root.expand) {
      for (var child in root.children) {
        var indent = {
          'text-indent': root.tab+root.children[child].tab//,
          //'border': '1px solid'
        };
        console.log("->>>", root.children[child].id);
        this.display.push(
          <div style={indent} key={root.children[child].id}>
            <button className="expand" onClick={this.handleExpand.bind(this, root.children[child].id)}>\</button>&nbsp;&nbsp;
            <span onClick={this.handleExpand.bind(this, root.children[child].id)}>{root.children[child].label}&nbsp;&nbsp;</span>
            <button className="right" onClick={this.handleDelete.bind(this, root.children[child].id)}>Delete</button>
            <button className="right" onClick={this.handleAdd.bind(this, root.children[child].id)}>Add</button>
          </div>
        );
        this.displayComponent(root.children[child])
      }
    }
    console.log(this.display);
    return this.display;
  },
  
  render: function () {
    var root = this.props.tree;
    this.display = [];
    var display = this.displayComponent(root);
    console.log(this.display);
    return (
        <div>{display}</div>
    );
  }

});

exports.view = Node;
exports.event = Events;