var ReactTools = require('react-tools');
module.exports = {
  process: function (src, file) {
    if (/.css$/.test(file)) {
      return '';
    }
    return ReactTools.transform(src);
  }
};