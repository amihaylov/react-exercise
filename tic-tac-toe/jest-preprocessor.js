// var babel = require('babel-core');

// module.exports = {
// 	process: function(src, filename) {
// 		if (filename.indexOf('node_modules') === -1  && babel.canCompile(filename)) {
// 			return babel.transform(src, { filename: filename, stage: 1, retainLines: true, compact: false }).code;
// 		}

// 		return src;
// 	},
// };

// preprocessor.js
var ReactTools = require('react-tools');
module.exports = {
  process: function(src) {
    return ReactTools.transform(src);
  }
};