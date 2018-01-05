var _ = require('lodash');

var eventBus = require('../../../libraries/eventdispatcher/EventDispatcher.js');

var ViewStore = require('../store/view-store');

var CustomViewEvents = require('../view/custom-view').event;
var SearchBarEvents = require('../view/search-bar').event;
var AddButton = require('../view/add-button').event;

var Node = require('../view/node').event;


var ViewAction = (function () {

  var oEventHandler = {};

  var handleButtonClicked = function () {
    ViewStore.handleButtonClicked();
  };
  
  var handleQueryChange = function () {
    ViewStore.handleQueryChange();
  }
  
  var addItem = function () {
    ViewStore.addItem();
  }
  
  var handleExpand = function (id) {
    ViewStore.handleExpand(id);
  }

  var handleAdd = function (id, name) {
   ViewStore.handleAdd(id, name);
  }
  
  var handleDelete = function (id) {
    ViewStore.handleDelete(id);
  }

  let handleFoodEaten = function () {
    ViewStore.handleFoodEaten();
  };

  var initiateEventHandler = function () {
    var _setEvent = _.set.bind(this, oEventHandler);


    _setEvent(CustomViewEvents.BUTTON_CLICKED, handleButtonClicked);
    _setEvent(SearchBarEvents.CHANGE, handleQueryChange);
    _setEvent(AddButton.BUTTON_CLICK, addItem);

    _setEvent(Node.EXPAND, handleExpand);
    _setEvent(Node.ADD, handleAdd);
    _setEvent(Node.DELETE, handleDelete);

    _setEvent(Node.FOOD_EATEN, handleFoodEaten);

  }.call(this);

  return {
    //Register Event Listener
    registerEvent: function () {
      _.forEach(oEventHandler, function (oHandler, sEventName) {
        eventBus.addEventListener(sEventName, oHandler);
      });
    },

    //De-Register Event Listener
    deRegisterEvent: function () {
      _.forEach(oEventHandler, function (oHandler, sEventName) {
        eventBus.removeEventListener(sEventName, oHandler);
      });
    }

  }

})();

module.exports = ViewAction;