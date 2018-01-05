var _ = require('lodash');

var MicroEvent = require('../../../libraries/microevent/MicroEvent.js');
var TreeViewAppData = require('./model/view-app-data');
var TreeViewProps = require('./model/view-props');
var AppData = require("../store/model/view-app-data");

var ViewStore = (function () {

  var oAppData = TreeViewAppData;
  var oComponentProps = TreeViewProps;

  var triggerChange = function () {
    ViewStore.trigger('change');
  };

  var getComponentProps = function () {
    return oComponentProps;
  };

  var getAppData = function () {
    return oAppData;
  };

  return {

    text: "Hello",

    getData: function () {
      var data = {
        appData: oAppData,
        componentProps: oComponentProps
      };
      return data;
    },

    getText: function () {
      return this.text;
    },

    handleButtonClicked: function () {
      if (this.text === "Hello") {
        this.text = "World"
      } else {
        this.text = "Hello"
      }

      triggerChange();
    },

    handleQueryChange: function () {
      var searchString = document.getElementsByClassName("searchBar")[0].value;
      //console.log(searchString);
      var displayList = [];
      var originalList = AppData.getOriginalList();
      for (var index in originalList) {
        if (originalList[index].indexOf(searchString) !== -1) {
          displayList.push(originalList[index]);
        }
      }
      AppData.setDisplayList(displayList);
      triggerChange();
    },
    
    addItem: function () {
      var searchString = document.getElementsByClassName("searchBar")[0].value;
      var originalList  = AppData.getOriginalList();
      var displayList= AppData.getDisplayList();
      displayList.push(searchString);
      originalList.push(searchString);
      AppData.setOriginalList(originalList);
      AppData.setDisplayList(displayList)
      triggerChange();
    },
    
    searchAndToggleFlag: function (id, node) {
      if (node.id === id) {
        node.expand = !node.expand;
        return true;
      } else {
        for (var child in node.children) {
          if (this.searchAndToggleFlag(id, node.children[child])) {
            return true;
          }
        }
      }
    },

    handleExpand: function (id) {
      console.log(id);
      this.searchAndToggleFlag(id, AppData.getTree());
      triggerChange();
    },
    
    searchAndAdd: function (id, name, node) {
      if (node.id === id) {
        AppData.setLatestId(AppData.getLatestId() + 1);
        node.children.push({
          id: AppData.getLatestId(),
          label: name,
          expand: true,
          tab: node.tab+10,
          children: []
        });
        return true;
      } else {
        for (var child in node.children) {
          if (this.searchAndAdd(id, name, node.children[child])) {
            return true;
          }
        }
      }
    },
    
    handleAdd: function (id, name) {
      console.log(id, name);
      this.searchAndAdd(id, name, AppData.getTree());
      triggerChange();
    },

    searchIdInArray: function (id, array) {
      for (var child in array) {
        if (array[child].id === id) {
          return child;
        }
      }
      return -1;
    },

    searchAndDelete: function (id, node) {
      var index = this.searchIdInArray(id, node.children);
      if (index !== -1) {
        node.children.splice(index, 1);
        return true;
      } else {
        for (var child in node.children) {
          if (this.searchAndDelete(id, node.children[child])) {
            return true;
          }
        }
      }
    },

    handleDelete: function (id) {
      this.searchAndDelete(id, AppData.getTree());
      triggerChange();
    },


    handleFoodEaten: function () {

      triggerChange();
    }

  };

})();

MicroEvent.mixin(ViewStore);

module.exports = ViewStore;