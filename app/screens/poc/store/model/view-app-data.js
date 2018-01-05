
var AppData = (function () {

  var originalList = ['apple', 'mango', 'strawberry', 'banana', 'orange'];
  var displayList = originalList;

  var tree = {
    id: -1,
    label: "root",
    expand: true,
    tab: 5,
    children: [
      {
        id: 1,
        label: "Desktop",
        expand: true,
        tab: 10,
        children: [
          {
            id: 4,
            label: "New Folder",
            expand: true,
            tab: 20,
            children: []
          }
        ]
      },
      {
        id: 2,
        label: "workspaces",
        expand: true,
        tab: 10,
        children: []
      },
      {
        id: 3,
        label: "logs",
        expand: true,
        tab: 10,
        children: [
          {
            id: 5,
            label: "New Folder",
            expand: true,
            tab: 20,
            children: []
          }
        ]
      }
    ]
  };

  var latestId = 5;

  return {

   getOriginalList: function () {
     return originalList;
   },

   setOriginalList: function (aItems) {
     originalList = aItems;
   }, 

    getDisplayList: function () {
      return displayList;
    },

    setDisplayList: function (aItems) {
      displayList = aItems;
    },

    getTree: function () {
      return tree;
    },

    setTreee: function (oTree) {
      tree = oTree;
    },

    getLatestId() {
     return latestId;
    },

    setLatestId(iLatestId) {
     latestId = iLatestId;
    }
   
  };

})();

module.exports = AppData;