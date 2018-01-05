var React = require('react');
var AppData = require('../store/model/view-app-data');

var CustomView = require('../view/custom-view').view;
var SearchBar = require('../view/search-bar').view;
var ListItems = require('../view/list-items').view;
var AddButton = require('../view/add-button').view;
var Node = require('../view/node').view;
var SnakeApp = require('../view/snake-app').view;

var ViewController = React.createClass({

  propTypes: {
    store: React.PropTypes.object.isRequired,
    action: React.PropTypes.object.isRequired
  },

  getInitialState: function () {

    var initialState = {
      appData: this.getStore().getData().appData,
      componentProps: this.getStore().getData().componentProps
    };

    return initialState;

  },

  componentDidMount: function () {
    this.getStore().bind('change', this.handleViewStateChanged);
    this.props.action.registerEvent();
  },

  componentWillUnmount: function () {
    this.getStore().unbind('change', this.handleViewStateChanged);
    this.props.action.deRegisterEvent();
  },

  handleViewStateChanged: function () {

    var changedState = {
      appData: this.getStore().getData().appData,
      componentProps: this.getStore().getData().componentProps
    };

    this.setState(changedState);
  },

  getStore: function () {
    return this.props.store;
  },

  render: function () {

    var sText = this.getStore().getText();


    // return (
    //     <div className="viewsContainer">
    //       <SnakeApp />
    //       <CustomView text={sText}/>
    //       <SearchBar />
    //       <AddButton />
    //       <ListItems list={AppData.getDisplayList()}/>
    //
    //
    //       <div className="treeTask">
    //         <Node tree={AppData.getTree()}/>
    //       </div>
    //     </div>
    // );

    return (<SnakeApp />);
  }

});

module.exports = ViewController;