/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var loaderUtils = require("loader-utils");
var path = require("path");

var COMPILATION_KEY = '_file_loader_map';

module.exports = function(content) {
	this.cacheable && this.cacheable();
	if(!this.emitFile) throw new Error("emitFile is required from module system");
	var query = loaderUtils.parseQuery(this.query);
	var url = loaderUtils.interpolateName(this, query.name || "[hash].[ext]", {
		context: query.context || this.options.context,
		content: content,
		regExp: query.regExp
	});
	this.emitFile(url, content);
	
	this._compilation[COMPILATION_KEY] = this._compilation[COMPILATION_KEY] || {};
	this._compilation[COMPILATION_KEY][this.resource] = url;
	
	return "module.exports = __webpack_public_path__ + " + JSON.stringify(url);
}
module.exports.raw = true;
