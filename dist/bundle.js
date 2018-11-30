/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dist/resources/planet_tilesets/sample_planet_level/tilemap.json":
/*!*************************************************************************!*\
  !*** ./dist/resources/planet_tilesets/sample_planet_level/tilemap.json ***!
  \*************************************************************************/
/*! exports provided: height, infinite, layers, nextlayerid, nextobjectid, orientation, renderorder, tiledversion, tileheight, tilesets, tilewidth, type, version, width, default */
/***/ (function(module) {

eval("module.exports = {\"height\":24,\"infinite\":false,\"layers\":[{\"data\":[5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,5,5,5,5,5,5,5,6,6,6,6,6,6,6,2,2,2,2,2,2,2,6,6,6,6,6,6,6,6,6,6,6,6,5,5,5,5,5,5,5,6,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,6,6,2,2,6,6,6,6,6,6,5,5,5,5,5,6,2,2,2,2,2,2,2,2,2,3,3,3,3,3,2,2,2,2,2,2,2,2,2,6,6,6,6,5,5,5,6,6,2,2,3,3,3,3,3,3,3,3,1,1,3,3,3,3,3,3,3,4,2,2,2,2,2,6,6,5,5,5,6,6,2,2,3,3,3,1,1,1,1,1,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,6,6,5,5,6,6,2,2,3,3,1,4,4,1,1,3,3,2,2,2,2,2,2,2,3,3,3,1,1,3,2,2,6,6,5,5,6,2,2,2,3,1,1,4,4,3,3,3,2,2,6,6,6,6,6,2,2,3,1,4,1,1,3,2,2,6,5,5,6,2,2,2,3,1,1,3,3,2,2,2,2,6,6,6,6,6,6,6,2,3,1,1,1,1,3,2,2,6,5,5,6,2,2,2,3,4,1,3,3,2,2,6,6,6,6,2,2,2,6,6,6,2,3,1,1,1,3,2,2,6,5,5,6,6,2,2,3,3,3,2,2,2,6,6,6,6,2,2,3,2,2,2,2,2,3,1,4,4,3,2,2,6,5,5,6,6,2,2,2,2,2,2,6,6,6,6,6,6,2,3,3,3,3,2,2,3,3,1,4,4,3,3,2,6,5,5,5,6,2,2,2,2,2,2,6,6,6,6,6,2,2,3,3,1,3,3,3,3,1,1,1,1,3,2,2,6,5,5,5,6,6,2,2,4,2,2,2,6,6,6,6,2,3,3,3,4,4,1,1,1,1,1,3,3,3,2,2,6,5,5,6,6,6,2,2,2,2,2,2,6,6,6,6,2,2,3,3,4,4,1,1,1,1,3,3,3,2,2,6,6,5,5,6,6,6,6,2,2,2,2,6,6,6,6,6,2,2,3,3,1,3,3,3,3,3,3,3,2,2,6,6,6,5,5,5,5,5,6,6,2,2,6,6,6,5,6,6,6,2,2,3,3,3,2,2,2,2,2,2,2,6,6,6,5,5,5,5,5,5,6,6,6,6,6,5,5,5,5,6,6,6,2,2,2,2,2,2,2,2,2,6,6,6,6,5,5,5,5,5,5,5,5,5,5,6,6,5,5,5,5,6,6,6,6,6,2,6,6,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5],\"height\":24,\"id\":1,\"name\":\"Tile Layer 1\",\"opacity\":1,\"type\":\"tilelayer\",\"visible\":true,\"width\":32,\"x\":0,\"y\":0}],\"nextlayerid\":2,\"nextobjectid\":1,\"orientation\":\"orthogonal\",\"renderorder\":\"right-down\",\"tiledversion\":\"1.2.0\",\"tileheight\":32,\"tilesets\":[{\"firstgid\":1,\"source\":\"DLZP-Custom.tsx\"}],\"tilewidth\":32,\"type\":\"map\",\"version\":1.2,\"width\":32};\n\n//# sourceURL=webpack:///./dist/resources/planet_tilesets/sample_planet_level/tilemap.json?");

/***/ }),

/***/ "./dist/resources/planet_tilesets/sample_planet_level/tileset.json":
/*!*************************************************************************!*\
  !*** ./dist/resources/planet_tilesets/sample_planet_level/tileset.json ***!
  \*************************************************************************/
/*! exports provided: columns, image, imageheight, imagewidth, margin, name, spacing, tilecount, tiledversion, tileheight, tiles, tilewidth, type, version, default */
/***/ (function(module) {

eval("module.exports = {\"columns\":4,\"image\":\"tiles.png\",\"imageheight\":128,\"imagewidth\":128,\"margin\":0,\"name\":\"DLZP-Custom\",\"spacing\":0,\"tilecount\":16,\"tiledversion\":\"1.2.0\",\"tileheight\":32,\"tiles\":[{\"id\":0,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":true},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":1,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":true},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":2,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":true},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":3,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":4,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":true}]},{\"id\":5,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":true},{\"name\":\"water\",\"type\":\"bool\",\"value\":true}]},{\"id\":6,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":7,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":8,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":9,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":10,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":11,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":12,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":13,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":14,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]},{\"id\":15,\"properties\":[{\"name\":\"passable\",\"type\":\"bool\",\"value\":false},{\"name\":\"water\",\"type\":\"bool\",\"value\":false}]}],\"tilewidth\":32,\"type\":\"tileset\",\"version\":1.2};\n\n//# sourceURL=webpack:///./dist/resources/planet_tilesets/sample_planet_level/tileset.json?");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/index.css":
/*!*************************************************!*\
  !*** ./node_modules/css-loader!./src/index.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")(false);\n// imports\n\n\n// module\nexports.push([module.i, \"body, canvas {\\r\\n  padding: 0;\\r\\n  margin: 0;\\r\\n  border: 0;\\r\\n}\\r\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./src/index.css?./node_modules/css-loader");

/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\nmodule.exports = function(useSourceMap) {\n\tvar list = [];\n\n\t// return the list of modules as css string\n\tlist.toString = function toString() {\n\t\treturn this.map(function (item) {\n\t\t\tvar content = cssWithMappingToString(item, useSourceMap);\n\t\t\tif(item[2]) {\n\t\t\t\treturn \"@media \" + item[2] + \"{\" + content + \"}\";\n\t\t\t} else {\n\t\t\t\treturn content;\n\t\t\t}\n\t\t}).join(\"\");\n\t};\n\n\t// import a list of modules into the list\n\tlist.i = function(modules, mediaQuery) {\n\t\tif(typeof modules === \"string\")\n\t\t\tmodules = [[null, modules, \"\"]];\n\t\tvar alreadyImportedModules = {};\n\t\tfor(var i = 0; i < this.length; i++) {\n\t\t\tvar id = this[i][0];\n\t\t\tif(typeof id === \"number\")\n\t\t\t\talreadyImportedModules[id] = true;\n\t\t}\n\t\tfor(i = 0; i < modules.length; i++) {\n\t\t\tvar item = modules[i];\n\t\t\t// skip already imported module\n\t\t\t// this implementation is not 100% perfect for weird media query combinations\n\t\t\t//  when a module is imported multiple times with different media queries.\n\t\t\t//  I hope this will never occur (Hey this way we have smaller bundles)\n\t\t\tif(typeof item[0] !== \"number\" || !alreadyImportedModules[item[0]]) {\n\t\t\t\tif(mediaQuery && !item[2]) {\n\t\t\t\t\titem[2] = mediaQuery;\n\t\t\t\t} else if(mediaQuery) {\n\t\t\t\t\titem[2] = \"(\" + item[2] + \") and (\" + mediaQuery + \")\";\n\t\t\t\t}\n\t\t\t\tlist.push(item);\n\t\t\t}\n\t\t}\n\t};\n\treturn list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n\tvar content = item[1] || '';\n\tvar cssMapping = item[3];\n\tif (!cssMapping) {\n\t\treturn content;\n\t}\n\n\tif (useSourceMap && typeof btoa === 'function') {\n\t\tvar sourceMapping = toComment(cssMapping);\n\t\tvar sourceURLs = cssMapping.sources.map(function (source) {\n\t\t\treturn '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'\n\t\t});\n\n\t\treturn [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n\t}\n\n\treturn [content].join('\\n');\n}\n\n// Adapted from convert-source-map (MIT)\nfunction toComment(sourceMap) {\n\t// eslint-disable-next-line no-undef\n\tvar base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n\tvar data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;\n\n\treturn '/*# ' + data + ' */';\n}\n\n\n//# sourceURL=webpack:///./node_modules/css-loader/lib/css-base.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\tMIT License http://www.opensource.org/licenses/mit-license.php\n\tAuthor Tobias Koppers @sokra\n*/\n\nvar stylesInDom = {};\n\nvar\tmemoize = function (fn) {\n\tvar memo;\n\n\treturn function () {\n\t\tif (typeof memo === \"undefined\") memo = fn.apply(this, arguments);\n\t\treturn memo;\n\t};\n};\n\nvar isOldIE = memoize(function () {\n\t// Test for IE <= 9 as proposed by Browserhacks\n\t// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n\t// Tests for existence of standard globals is to allow style-loader\n\t// to operate correctly into non-standard environments\n\t// @see https://github.com/webpack-contrib/style-loader/issues/177\n\treturn window && document && document.all && !window.atob;\n});\n\nvar getTarget = function (target, parent) {\n  if (parent){\n    return parent.querySelector(target);\n  }\n  return document.querySelector(target);\n};\n\nvar getElement = (function (fn) {\n\tvar memo = {};\n\n\treturn function(target, parent) {\n                // If passing function in options, then use it for resolve \"head\" element.\n                // Useful for Shadow Root style i.e\n                // {\n                //   insertInto: function () { return document.querySelector(\"#foo\").shadowRoot }\n                // }\n                if (typeof target === 'function') {\n                        return target();\n                }\n                if (typeof memo[target] === \"undefined\") {\n\t\t\tvar styleTarget = getTarget.call(this, target, parent);\n\t\t\t// Special case to return head of iframe instead of iframe itself\n\t\t\tif (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n\t\t\t\ttry {\n\t\t\t\t\t// This will throw an exception if access to iframe is blocked\n\t\t\t\t\t// due to cross-origin restrictions\n\t\t\t\t\tstyleTarget = styleTarget.contentDocument.head;\n\t\t\t\t} catch(e) {\n\t\t\t\t\tstyleTarget = null;\n\t\t\t\t}\n\t\t\t}\n\t\t\tmemo[target] = styleTarget;\n\t\t}\n\t\treturn memo[target]\n\t};\n})();\n\nvar singleton = null;\nvar\tsingletonCounter = 0;\nvar\tstylesInsertedAtTop = [];\n\nvar\tfixUrls = __webpack_require__(/*! ./urls */ \"./node_modules/style-loader/lib/urls.js\");\n\nmodule.exports = function(list, options) {\n\tif (typeof DEBUG !== \"undefined\" && DEBUG) {\n\t\tif (typeof document !== \"object\") throw new Error(\"The style-loader cannot be used in a non-browser environment\");\n\t}\n\n\toptions = options || {};\n\n\toptions.attrs = typeof options.attrs === \"object\" ? options.attrs : {};\n\n\t// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n\t// tags it will allow on a page\n\tif (!options.singleton && typeof options.singleton !== \"boolean\") options.singleton = isOldIE();\n\n\t// By default, add <style> tags to the <head> element\n        if (!options.insertInto) options.insertInto = \"head\";\n\n\t// By default, add <style> tags to the bottom of the target\n\tif (!options.insertAt) options.insertAt = \"bottom\";\n\n\tvar styles = listToStyles(list, options);\n\n\taddStylesToDom(styles, options);\n\n\treturn function update (newList) {\n\t\tvar mayRemove = [];\n\n\t\tfor (var i = 0; i < styles.length; i++) {\n\t\t\tvar item = styles[i];\n\t\t\tvar domStyle = stylesInDom[item.id];\n\n\t\t\tdomStyle.refs--;\n\t\t\tmayRemove.push(domStyle);\n\t\t}\n\n\t\tif(newList) {\n\t\t\tvar newStyles = listToStyles(newList, options);\n\t\t\taddStylesToDom(newStyles, options);\n\t\t}\n\n\t\tfor (var i = 0; i < mayRemove.length; i++) {\n\t\t\tvar domStyle = mayRemove[i];\n\n\t\t\tif(domStyle.refs === 0) {\n\t\t\t\tfor (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();\n\n\t\t\t\tdelete stylesInDom[domStyle.id];\n\t\t\t}\n\t\t}\n\t};\n};\n\nfunction addStylesToDom (styles, options) {\n\tfor (var i = 0; i < styles.length; i++) {\n\t\tvar item = styles[i];\n\t\tvar domStyle = stylesInDom[item.id];\n\n\t\tif(domStyle) {\n\t\t\tdomStyle.refs++;\n\n\t\t\tfor(var j = 0; j < domStyle.parts.length; j++) {\n\t\t\t\tdomStyle.parts[j](item.parts[j]);\n\t\t\t}\n\n\t\t\tfor(; j < item.parts.length; j++) {\n\t\t\t\tdomStyle.parts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\t\t} else {\n\t\t\tvar parts = [];\n\n\t\t\tfor(var j = 0; j < item.parts.length; j++) {\n\t\t\t\tparts.push(addStyle(item.parts[j], options));\n\t\t\t}\n\n\t\t\tstylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};\n\t\t}\n\t}\n}\n\nfunction listToStyles (list, options) {\n\tvar styles = [];\n\tvar newStyles = {};\n\n\tfor (var i = 0; i < list.length; i++) {\n\t\tvar item = list[i];\n\t\tvar id = options.base ? item[0] + options.base : item[0];\n\t\tvar css = item[1];\n\t\tvar media = item[2];\n\t\tvar sourceMap = item[3];\n\t\tvar part = {css: css, media: media, sourceMap: sourceMap};\n\n\t\tif(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});\n\t\telse newStyles[id].parts.push(part);\n\t}\n\n\treturn styles;\n}\n\nfunction insertStyleElement (options, style) {\n\tvar target = getElement(options.insertInto)\n\n\tif (!target) {\n\t\tthrow new Error(\"Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.\");\n\t}\n\n\tvar lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];\n\n\tif (options.insertAt === \"top\") {\n\t\tif (!lastStyleElementInsertedAtTop) {\n\t\t\ttarget.insertBefore(style, target.firstChild);\n\t\t} else if (lastStyleElementInsertedAtTop.nextSibling) {\n\t\t\ttarget.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);\n\t\t} else {\n\t\t\ttarget.appendChild(style);\n\t\t}\n\t\tstylesInsertedAtTop.push(style);\n\t} else if (options.insertAt === \"bottom\") {\n\t\ttarget.appendChild(style);\n\t} else if (typeof options.insertAt === \"object\" && options.insertAt.before) {\n\t\tvar nextSibling = getElement(options.insertAt.before, target);\n\t\ttarget.insertBefore(style, nextSibling);\n\t} else {\n\t\tthrow new Error(\"[Style Loader]\\n\\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\\n Must be 'top', 'bottom', or Object.\\n (https://github.com/webpack-contrib/style-loader#insertat)\\n\");\n\t}\n}\n\nfunction removeStyleElement (style) {\n\tif (style.parentNode === null) return false;\n\tstyle.parentNode.removeChild(style);\n\n\tvar idx = stylesInsertedAtTop.indexOf(style);\n\tif(idx >= 0) {\n\t\tstylesInsertedAtTop.splice(idx, 1);\n\t}\n}\n\nfunction createStyleElement (options) {\n\tvar style = document.createElement(\"style\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\n\tif(options.attrs.nonce === undefined) {\n\t\tvar nonce = getNonce();\n\t\tif (nonce) {\n\t\t\toptions.attrs.nonce = nonce;\n\t\t}\n\t}\n\n\taddAttrs(style, options.attrs);\n\tinsertStyleElement(options, style);\n\n\treturn style;\n}\n\nfunction createLinkElement (options) {\n\tvar link = document.createElement(\"link\");\n\n\tif(options.attrs.type === undefined) {\n\t\toptions.attrs.type = \"text/css\";\n\t}\n\toptions.attrs.rel = \"stylesheet\";\n\n\taddAttrs(link, options.attrs);\n\tinsertStyleElement(options, link);\n\n\treturn link;\n}\n\nfunction addAttrs (el, attrs) {\n\tObject.keys(attrs).forEach(function (key) {\n\t\tel.setAttribute(key, attrs[key]);\n\t});\n}\n\nfunction getNonce() {\n\tif (false) {}\n\n\treturn __webpack_require__.nc;\n}\n\nfunction addStyle (obj, options) {\n\tvar style, update, remove, result;\n\n\t// If a transform function was defined, run it on the css\n\tif (options.transform && obj.css) {\n\t    result = typeof options.transform === 'function'\n\t\t ? options.transform(obj.css) \n\t\t : options.transform.default(obj.css);\n\n\t    if (result) {\n\t    \t// If transform returns a value, use that instead of the original css.\n\t    \t// This allows running runtime transformations on the css.\n\t    \tobj.css = result;\n\t    } else {\n\t    \t// If the transform function returns a falsy value, don't add this css.\n\t    \t// This allows conditional loading of css\n\t    \treturn function() {\n\t    \t\t// noop\n\t    \t};\n\t    }\n\t}\n\n\tif (options.singleton) {\n\t\tvar styleIndex = singletonCounter++;\n\n\t\tstyle = singleton || (singleton = createStyleElement(options));\n\n\t\tupdate = applyToSingletonTag.bind(null, style, styleIndex, false);\n\t\tremove = applyToSingletonTag.bind(null, style, styleIndex, true);\n\n\t} else if (\n\t\tobj.sourceMap &&\n\t\ttypeof URL === \"function\" &&\n\t\ttypeof URL.createObjectURL === \"function\" &&\n\t\ttypeof URL.revokeObjectURL === \"function\" &&\n\t\ttypeof Blob === \"function\" &&\n\t\ttypeof btoa === \"function\"\n\t) {\n\t\tstyle = createLinkElement(options);\n\t\tupdate = updateLink.bind(null, style, options);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\n\t\t\tif(style.href) URL.revokeObjectURL(style.href);\n\t\t};\n\t} else {\n\t\tstyle = createStyleElement(options);\n\t\tupdate = applyToTag.bind(null, style);\n\t\tremove = function () {\n\t\t\tremoveStyleElement(style);\n\t\t};\n\t}\n\n\tupdate(obj);\n\n\treturn function updateStyle (newObj) {\n\t\tif (newObj) {\n\t\t\tif (\n\t\t\t\tnewObj.css === obj.css &&\n\t\t\t\tnewObj.media === obj.media &&\n\t\t\t\tnewObj.sourceMap === obj.sourceMap\n\t\t\t) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\tupdate(obj = newObj);\n\t\t} else {\n\t\t\tremove();\n\t\t}\n\t};\n}\n\nvar replaceText = (function () {\n\tvar textStore = [];\n\n\treturn function (index, replacement) {\n\t\ttextStore[index] = replacement;\n\n\t\treturn textStore.filter(Boolean).join('\\n');\n\t};\n})();\n\nfunction applyToSingletonTag (style, index, remove, obj) {\n\tvar css = remove ? \"\" : obj.css;\n\n\tif (style.styleSheet) {\n\t\tstyle.styleSheet.cssText = replaceText(index, css);\n\t} else {\n\t\tvar cssNode = document.createTextNode(css);\n\t\tvar childNodes = style.childNodes;\n\n\t\tif (childNodes[index]) style.removeChild(childNodes[index]);\n\n\t\tif (childNodes.length) {\n\t\t\tstyle.insertBefore(cssNode, childNodes[index]);\n\t\t} else {\n\t\t\tstyle.appendChild(cssNode);\n\t\t}\n\t}\n}\n\nfunction applyToTag (style, obj) {\n\tvar css = obj.css;\n\tvar media = obj.media;\n\n\tif(media) {\n\t\tstyle.setAttribute(\"media\", media)\n\t}\n\n\tif(style.styleSheet) {\n\t\tstyle.styleSheet.cssText = css;\n\t} else {\n\t\twhile(style.firstChild) {\n\t\t\tstyle.removeChild(style.firstChild);\n\t\t}\n\n\t\tstyle.appendChild(document.createTextNode(css));\n\t}\n}\n\nfunction updateLink (link, options, obj) {\n\tvar css = obj.css;\n\tvar sourceMap = obj.sourceMap;\n\n\t/*\n\t\tIf convertToAbsoluteUrls isn't defined, but sourcemaps are enabled\n\t\tand there is no publicPath defined then lets turn convertToAbsoluteUrls\n\t\ton by default.  Otherwise default to the convertToAbsoluteUrls option\n\t\tdirectly\n\t*/\n\tvar autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;\n\n\tif (options.convertToAbsoluteUrls || autoFixUrls) {\n\t\tcss = fixUrls(css);\n\t}\n\n\tif (sourceMap) {\n\t\t// http://stackoverflow.com/a/26603875\n\t\tcss += \"\\n/*# sourceMappingURL=data:application/json;base64,\" + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + \" */\";\n\t}\n\n\tvar blob = new Blob([css], { type: \"text/css\" });\n\n\tvar oldSrc = link.href;\n\n\tlink.href = URL.createObjectURL(blob);\n\n\tif(oldSrc) URL.revokeObjectURL(oldSrc);\n}\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/addStyles.js?");

/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n/**\n * When source maps are enabled, `style-loader` uses a link element with a data-uri to\n * embed the css on the page. This breaks all relative urls because now they are relative to a\n * bundle instead of the current page.\n *\n * One solution is to only use full urls, but that may be impossible.\n *\n * Instead, this function \"fixes\" the relative urls to be absolute according to the current page location.\n *\n * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.\n *\n */\n\nmodule.exports = function (css) {\n  // get current location\n  var location = typeof window !== \"undefined\" && window.location;\n\n  if (!location) {\n    throw new Error(\"fixUrls requires window.location\");\n  }\n\n\t// blank or null?\n\tif (!css || typeof css !== \"string\") {\n\t  return css;\n  }\n\n  var baseUrl = location.protocol + \"//\" + location.host;\n  var currentDir = baseUrl + location.pathname.replace(/\\/[^\\/]*$/, \"/\");\n\n\t// convert each url(...)\n\t/*\n\tThis regular expression is just a way to recursively match brackets within\n\ta string.\n\n\t /url\\s*\\(  = Match on the word \"url\" with any whitespace after it and then a parens\n\t   (  = Start a capturing group\n\t     (?:  = Start a non-capturing group\n\t         [^)(]  = Match anything that isn't a parentheses\n\t         |  = OR\n\t         \\(  = Match a start parentheses\n\t             (?:  = Start another non-capturing groups\n\t                 [^)(]+  = Match anything that isn't a parentheses\n\t                 |  = OR\n\t                 \\(  = Match a start parentheses\n\t                     [^)(]*  = Match anything that isn't a parentheses\n\t                 \\)  = Match a end parentheses\n\t             )  = End Group\n              *\\) = Match anything and then a close parens\n          )  = Close non-capturing group\n          *  = Match anything\n       )  = Close capturing group\n\t \\)  = Match a close parens\n\n\t /gi  = Get all matches, not the first.  Be case insensitive.\n\t */\n\tvar fixedCss = css.replace(/url\\s*\\(((?:[^)(]|\\((?:[^)(]+|\\([^)(]*\\))*\\))*)\\)/gi, function(fullMatch, origUrl) {\n\t\t// strip quotes (if they exist)\n\t\tvar unquotedOrigUrl = origUrl\n\t\t\t.trim()\n\t\t\t.replace(/^\"(.*)\"$/, function(o, $1){ return $1; })\n\t\t\t.replace(/^'(.*)'$/, function(o, $1){ return $1; });\n\n\t\t// already a full url? no change\n\t\tif (/^(#|data:|http:\\/\\/|https:\\/\\/|file:\\/\\/\\/|\\s*$)/i.test(unquotedOrigUrl)) {\n\t\t  return fullMatch;\n\t\t}\n\n\t\t// convert the url to a full url\n\t\tvar newUrl;\n\n\t\tif (unquotedOrigUrl.indexOf(\"//\") === 0) {\n\t\t  \t//TODO: should we add protocol?\n\t\t\tnewUrl = unquotedOrigUrl;\n\t\t} else if (unquotedOrigUrl.indexOf(\"/\") === 0) {\n\t\t\t// path should be relative to the base url\n\t\t\tnewUrl = baseUrl + unquotedOrigUrl; // already starts with '/'\n\t\t} else {\n\t\t\t// path should be relative to current directory\n\t\t\tnewUrl = currentDir + unquotedOrigUrl.replace(/^\\.\\//, \"\"); // Strip leading './'\n\t\t}\n\n\t\t// send back the fixed url(...)\n\t\treturn \"url(\" + JSON.stringify(newUrl) + \")\";\n\t});\n\n\t// send back the fixed css\n\treturn fixedCss;\n};\n\n\n//# sourceURL=webpack:///./node_modules/style-loader/lib/urls.js?");

/***/ }),

/***/ "./src/PlanetPlayer.js":
/*!*****************************!*\
  !*** ./src/PlanetPlayer.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PlanetPlayer; });\n\r\nclass PlanetPlayer {\r\n\r\n  /**\r\n   *\r\n   * @param {BasePlanetLevel} level\r\n   */\r\n  constructor(level) {\r\n    this.level = level;\r\n    this.movePlayerToSpawn();\r\n  }\r\n\r\n  movePlayerToSpawn() {\r\n    this.x = this.level.playerSpawnX;\r\n    this.y = this.level.playerSpawnY;\r\n    // Face direction\r\n    //    N       0       -y\r\n    //  W   E   1   3   -x  +x\r\n    //    S       2       +y\r\n    this.faceDirection = this.level.playerSpawnFaceDirection;\r\n  }\r\n\r\n  /** @method\r\n   * Update logic related to player\r\n   * @param {DOMHighResTimeStamp} elaspedTime - the amount of time elapsed this frame\r\n   * @param {Input} input - the input from this and the prior frame\r\n   * @param {Game} game - the game object\r\n   */\r\n  update(elaspedTime, input, game) {\r\n    let moveLeft = input.keyPressed('ArrowLeft');\r\n    let moveRight = input.keyPressed('ArrowRight');\r\n    let moveUp = input.keyPressed('ArrowUp');\r\n    let moveDown = input.keyPressed('ArrowDown');\r\n    let interact = input.keyPressed('f');\r\n    let fire = input.keyPressed(' ');\r\n\r\n    if(moveLeft + moveRight + moveUp + moveDown === 1) {\r\n      //TODO check movable tiles\r\n      if(moveLeft) {\r\n        this.x--;\r\n        this.faceDirection = 1;\r\n      } else if (moveRight) {\r\n        this.x++;\r\n        this.faceDirection = 3;\r\n      } else if (moveUp) {\r\n        this.y--;\r\n        this.faceDirection = 0;\r\n      } else if (moveDown) {\r\n        this.y++;\r\n        this.faceDirection = 2;\r\n      }\r\n      this.level.playerMoved(this);\r\n    }\r\n\r\n    if(interact) {\r\n      if(this.faceDirection % 2 === 0) {  // Are we facing north or south?\r\n        this.level.playerInteracted(this, this.x, this.y + (this.faceDirection - 1));\r\n      } else {\r\n        this.level.playerInteracted(this, this.x + (this.faceDirection - 2), this.y);\r\n      }\r\n    }\r\n\r\n    if(fire) {\r\n      if(this.faceDirection % 2 === 0) {  // Are we facing north or south?\r\n        this.level.playerFired(this, this.x, this.y + (this.faceDirection - 1));\r\n      } else {\r\n        this.level.playerFired(this, this.x + (this.faceDirection - 2), this.y);\r\n      }\r\n    }\r\n  }\r\n\r\n  /** @method\r\n   * Render the player\r\n   * Draw here as if your visible grid is infinite, scrolling within a viewport is done by the PlanetLevelManager.\r\n   * @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame\r\n   * @param {CanvasRenderingContext2D} context - the rendering contex\r\n   */\r\n  render(elapsedTime, context) {\r\n    //TODO player render\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/PlanetPlayer.js?");

/***/ }),

/***/ "./src/PlanetTileset.js":
/*!******************************!*\
  !*** ./src/PlanetTileset.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PlanetTileset; });\n\r\nclass PlanetTileset {\r\n\r\n  constructor(tilesetJson, tilemapJson, tilesetImageFilePath) {\r\n    this.ready = false;\r\n    this.tilesetJson = tilesetJson;\r\n\r\n    // Check if the tileset is valid.\r\n    console.assert(\r\n      this.tilesetJson.tilewidth === 32 && this.tilesetJson.tileheight === 32,\r\n      \"A planet tileset json is not using 32x32 tiles! Fix the json in Tiled.\");\r\n\r\n    // Load the tileset image.\r\n    this.tileImage = new Image();\r\n    this.ready = false;\r\n    this.tileImage.onload = (() => {\r\n      this.ready = true;\r\n    });\r\n    this.tileImage.src = tilesetImageFilePath;\r\n\r\n    /// Load the tileset. Create an array of properties for each tile type which can be easily queried.\r\n    this.tileset = [];\r\n    for(let i = 0; i < this.tilesetJson.tilecount; i++) {\r\n      let properties = [];\r\n      properties[\"id\"] = this.tilesetJson.tiles[i].id;\r\n      properties[\"imageX\"] = this.tilesetJson.spacing + ((i % this.tilesetJson.columns) * (32 + this.tilesetJson.margin));\r\n      properties[\"imageY\"] = this.tilesetJson.spacing + (Math.floor(i / this.tilesetJson.columns) * (32 + this.tilesetJson.margin));\r\n\r\n      let jsonProperties = this.tilesetJson.tiles[i].properties;\r\n      for(let j = 0; j < jsonProperties.length; j++) {\r\n        properties[jsonProperties[j].name] = jsonProperties[j].value;\r\n      }\r\n\r\n      this.tileset[i] = properties;\r\n    }\r\n\r\n    // Load the tilemap.\r\n    this.tilemapJson = tilemapJson;\r\n\r\n    console.assert(\r\n      this.tilemapJson.renderorder === \"right-down\",\r\n      \"A planet tilemap json is not renderorder exported as 'right-down'! Fix the json in Tiled or manually override the json.\");\r\n\r\n    this.width = this.tilemapJson.width;\r\n    this.height = this.tilemapJson.height;\r\n    this.numberOfTilesInMap = this.width * this.height;\r\n  }\r\n\r\n  /** @method\r\n   * Retrieve the tile object for a tile at the given coordinates.\r\n   * The y coordinate can be omitted if the tiles are being indexed by a single dimension.\r\n   * @param x - X grid coordinate for the requested tile.\r\n   * @param y - Y grid coordinate for the requested tile.\r\n   * @returns An array of properties defined by that tile, including imageX, imageY, and id, as well as other custom\r\n   * properties defined in Tiled.\r\n   */\r\n  getTile(x, y) {\r\n    if(y === undefined) {\r\n      y = 0;\r\n    }\r\n\r\n    return this.tileset[\r\n      this.tilemapJson.layers[0].data[x + (this.tilemapJson.width * y)] - 1];\r\n  }\r\n\r\n  /** @method\r\n   * Render the tileset.\r\n   * Draw here as if your visible grid is infinite, scrolling within a viewport is done by the PlanetLevelManager.\r\n   * @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame\r\n   * @param {CanvasRenderingContext2D} context - the rendering context\r\n   */\r\n  render(elapsedTime, context) {\r\n    if(this.ready) {\r\n      for(let i = 0; i < this.numberOfTilesInMap; i++) {\r\n        let tile = this.getTile(i);\r\n        context.drawImage(\r\n          this.tileImage,\r\n          tile[\"imageX\"],\r\n          tile[\"imageY\"],\r\n          32,\r\n          32,\r\n          (i % this.tilemapJson.width) * 32,\r\n          Math.floor(i / this.tilemapJson.width) * 32,\r\n          32,\r\n          32);\r\n      }\r\n    }\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/PlanetTileset.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Game; });\n/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ \"./src/input.js\");\n/* harmony import */ var _menus_start_screen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menus/start-screen */ \"./src/menus/start-screen.js\");\n\r\n\r\n\r\n/** @class Game\r\n  * A class representing the high-level functionality\r\n  * of a game - the game loop, buffer swapping, etc.\r\n  */\r\nclass Game {\r\n  /** @constructor\r\n    * Creates the game instance\r\n    * @param {integer} width - the width of the game screen in pixels\r\n    * @param {integer} heght - the height of the game screen in pixels\r\n    */\r\n  constructor(width, height) {\r\n    this._start = null;\r\n    this.WIDTH = width;\r\n    this.HEIGHT = height;\r\n\r\n    // Set up the back buffer\r\n    this.backBuffer = document.createElement('canvas');\r\n    this.backBuffer.width = this.WIDTH;\r\n    this.backBuffer.height = this.HEIGHT;\r\n    this.backBufferCtx = this.backBuffer.getContext('2d');\r\n\r\n    // Set up the screen buffer\r\n    this.screenBuffer = document.createElement('canvas');\r\n    this.screenBuffer.width = this.WIDTH;\r\n    this.screenBuffer.height = this.HEIGHT;\r\n    this.screenBufferCtx = this.screenBuffer.getContext('2d');\r\n    document.body.append(this.screenBuffer);\r\n\r\n    // Set up the input object\r\n    this.input = new _input__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n\r\n    // Set up the game state stack\r\n    this.gameState = []\r\n    this.gameState.push(new _menus_start_screen__WEBPACK_IMPORTED_MODULE_1__[\"default\"]());\r\n  }\r\n  /** @method pushGameState\r\n    * Pushes the provided game state to the\r\n    * state stack.\r\n    * @param {GameState} gameState - an object that\r\n    * implements an update() and render() method.\r\n    */\r\n  pushGameState(gameState) {\r\n    this.gameState.push(gameState);\r\n  }\r\n  /** @method popGameState\r\n    * Pops the current game state from the state stack.\r\n    * @return {GameState} the popped game state object\r\n    */\r\n  popGameState() {\r\n    return this.gameState.pop();\r\n  }\r\n  /** @method update\r\n    * Updates the game state\r\n    * @param {integer} elapsedTime - the number of milliseconds per frame\r\n    */\r\n  update(elapsedTime) {\r\n    // Update the active game state\r\n    this.gameState[this.gameState.length - 1].update(elapsedTime, this.input, this);\r\n\r\n    // Update the input object\r\n    this.input.update();\r\n  }\r\n  /** @method render\r\n    * Renders the game state\r\n    * @param {integer} elapsedTime - the number of milliseconds per frame\r\n    */\r\n  render(elapsedTime) {\r\n    // Clear the back buffer\r\n    this.backBufferCtx.fillStyle = \"#000\";\r\n    this.backBufferCtx.fillRect(0,0,this.WIDTH, this.HEIGHT);\r\n\r\n    // Render the game state\r\n    this.gameState[this.gameState.length - 1].render(elapsedTime, this.backBufferCtx, this);\r\n\r\n    // Flip the back buffer\r\n    this.screenBufferCtx.drawImage(this.backBuffer, 0, 0);\r\n  }\r\n  /** @method loop\r\n    * Updates and renders the game,\r\n    * and calls itself on the next draw cycle.\r\n    * @param {DOMHighResTimestamp} timestamp - the current system time\r\n    */\r\n  loop(timestamp) {\r\n    var elapsedTime = this._frame_start ? timestamp - this._frame_start : 0;\r\n    this.update(elapsedTime);\r\n    this.render(elapsedTime);\r\n    this._frame_start = timestamp;\r\n    window.requestAnimationFrame((timestamp) => {this.loop(timestamp)});\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar content = __webpack_require__(/*! !../node_modules/css-loader!./index.css */ \"./node_modules/css-loader/index.js!./src/index.css\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///./src/index.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.css */ \"./src/index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\nvar game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]((32*32), (24*32)); //1024 x 768 (can be changed as long as factor of 32)\r\ngame.loop();\r\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/input.js":
/*!**********************!*\
  !*** ./src/input.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Input; });\n\r\n/** @module Input\r\n  * A class for handling input from the user\r\n  * will work for all keys on the keyboard\r\n  */\r\nclass Input {\r\n  /** @constructor\r\n    * Constructs a new instance of the Input class\r\n    * and attaches event listeners to the window.\r\n    */\r\n  constructor() {\r\n    this.oldState = {};\r\n    this.newState = {};\r\n\r\n    window.addEventListener('keydown', (event) => {\r\n      if(event.key.length <= 1 || event.key.charAt(0) !== 'F') {\r\n        event.preventDefault();\r\n      }\r\n      this.newState[event.key] = true;\r\n    });\r\n\r\n    window.addEventListener('keyup', (event) => {\r\n      if(event.key.length <= 1 || event.key.charAt(0) !== 'F') {\r\n        event.preventDefault();\r\n      }\r\n      this.newState[event.key] = false;\r\n    });\r\n\r\n  }\r\n\r\n  /** @method\r\n    * Copies the new state to the old state\r\n    */\r\n  update() {\r\n    this.oldState = JSON.parse(JSON.stringify(this.newState));\r\n  }\r\n\r\n  /** @method\r\n    * Returns true if the specified key is\r\n    * currently pressed.\r\n    * @param {String} key - the key to test\r\n    * @return {bool} if the key is pressed\r\n    */\r\n  keyPressed(key) {\r\n    return this.newState[key];\r\n  }\r\n\r\n  /** @method\r\n    * Returns true if the specified key\r\n    * went down this frame\r\n    * @param {String} key - the key to test\r\n    * @return {bool} if the key is pressed\r\n    */\r\n  keyDown(key) {\r\n    return this.newState[key] && !this.oldState[key];\r\n  }\r\n\r\n  /** @method\r\n    * Returns true if the specified key\r\n    * went up this frame\r\n    * @param {String} key - the key to test\r\n    * @return {bool} if the key is pressed\r\n    */\r\n  keyUp(key) {\r\n    return !this.newState[key] && this.oldState[key];\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/input.js?");

/***/ }),

/***/ "./src/menus/PlanetLevelManager.js":
/*!*****************************************!*\
  !*** ./src/menus/PlanetLevelManager.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PlanetLevelManager; });\n/* harmony import */ var _PlanetPlayer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PlanetPlayer */ \"./src/PlanetPlayer.js\");\n\r\n\r\nclass PlanetLevelManager {\r\n\r\n  constructor(level) {\r\n    this.finished = false;\r\n\r\n    this.level = level;\r\n    this.player = new _PlanetPlayer__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.level);\r\n\r\n    this.scrollingCanvas = document.createElement('canvas');\r\n    this.scrollingCanvas.width = this.level.tileset.width * 32;\r\n    this.scrollingCanvas.height = this.level.tileset.height * 32;\r\n    this.scrollingContext = this.scrollingCanvas.getContext('2d');\r\n  }\r\n\r\n  getLevel() {\r\n    return this.level;\r\n  }\r\n\r\n  getLevelIcon() {\r\n    return this.level.icon;\r\n  }\r\n\r\n  getLevelName() {\r\n    return this.level.name;\r\n  }\r\n\r\n  levelFinished() {\r\n    return this.finished;\r\n  }\r\n\r\n  playerSucceeded() {\r\n    return this.level.success;\r\n  }\r\n\r\n  /** @method\r\n   * Updates the active level and any calculations necessary for tileset scrolling\r\n   * @param {DOMHighResTimeStamp} elaspedTime - the amount of time elapsed this frame\r\n   * @param {Input} input - the input from this and the prior frame\r\n   * @param {Game} game - the game object\r\n   */\r\n  update(elaspedTime, input, game) {\r\n    if(this.level.finished) {\r\n      this.finished = true;\r\n    } else {\r\n      this.level.update(elaspedTime, input, game, this.player);\r\n      // TODO scrolling logic\r\n    }\r\n  }\r\n\r\n  /** @method\r\n   * Renders the active level and manages tileset scrolling within the scene.\r\n   * @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame\r\n   * @param {CanvasRenderingContext2D} context - the rendering context\r\n   */\r\n  render(elapsedTime, context) {\r\n    if(!this.finished) {\r\n      this.level.render(elapsedTime, this.scrollingContext, this.player);\r\n      // TODO scrolling render\r\n      context.drawImage(this.scrollingCanvas, 0, 0);\r\n    }\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/menus/PlanetLevelManager.js?");

/***/ }),

/***/ "./src/menus/start-screen.js":
/*!***********************************!*\
  !*** ./src/menus/start-screen.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return StartScreen; });\n/* harmony import */ var _PlanetLevelManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PlanetLevelManager */ \"./src/menus/PlanetLevelManager.js\");\n/* harmony import */ var _planet_levels_SamplePlanetLevel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../planet_levels/SamplePlanetLevel */ \"./src/planet_levels/SamplePlanetLevel.js\");\n/** @class StartScreen\r\n  * A starting screen for the game.\r\n  */\r\n\r\n\r\n\r\nclass StartScreen {\r\n  /** @method\r\n    * Updates the starting screen\r\n    * @param {DOMHighResTimeStamp} elaspedTime - the amount of time elapsed this frame\r\n    * @param {Input} input - the input from this and the prior frame\r\n    * @param {Game} game - the game object\r\n    */\r\n  update(elaspedTime, input, game) {\r\n    // TODO: Load inital game state object\r\n    if(input.keyPressed(' ')) {\r\n      game.pushGameState(new _PlanetLevelManager__WEBPACK_IMPORTED_MODULE_0__[\"default\"](new _planet_levels_SamplePlanetLevel__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()));;\r\n    }\r\n  }\r\n  /** @method\r\n    * Renders the starting screen.\r\n    * @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame\r\n    * @param {CanvasRenderingContext2D} context - the rendering context\r\n    */\r\n  render(elapsedTime, context) {\r\n    context.save();\r\n    context.fillStyle = 'white';\r\n    context.font = '48pt Serif';\r\n    context.fillText(\"Welcome to Space Raiders\", 280, 200);\r\n    context.font = '18pt Serif';\r\n    context.fillText(\"Press [SPACE] to Begin\", 500, 300);\r\n    context.restore();\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/menus/start-screen.js?");

/***/ }),

/***/ "./src/planet_levels/BasePlanetLevel.js":
/*!**********************************************!*\
  !*** ./src/planet_levels/BasePlanetLevel.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return BasePlanetLevel; });\n\r\nclass BasePlanetLevel {\r\n\r\n  constructor() {\r\n    this.finished = false;\r\n    this.success = false;\r\n\r\n    this.playerSpawnX = 1;\r\n    this.playerSpawnY = 1;\r\n    this.playerSpawnFaceDirection = 1;\r\n\r\n    this.tileset = undefined;\r\n    this.icon = new Image(32, 32);\r\n    this.name = \"Base Planet Level\";\r\n  }\r\n\r\n  /** @method\r\n   * Called when the player interacts with a tile.\r\n   * @param player Representation of the player.\r\n   * @param x X grid coordinate of the interacted tile (in front of player).\r\n   * @param y Y grid coordinate of the interacted tile (in front of player).\r\n   */\r\n  playerInteracted(player, x, y) {}\r\n\r\n  /**\r\n   * Called when the player moves.\r\n   * @param player Representation of the player.\r\n   */\r\n  playerMoved(player) {}\r\n\r\n  /**\r\n   * Called when the player fires a weapon.\r\n   * @param player Representation of the player.\r\n   * @param x X grid coordinate of the tile the player fires into (in front of player).\r\n   * @param y Y grid coordinate of the tile the player fires into (in front of player).\r\n   */\r\n  playerFired(player, x, y) {}\r\n\r\n  /** @method\r\n   * Update any entities within this planet level, including the player.\r\n   * @param {DOMHighResTimeStamp} elaspedTime - the amount of time elapsed this frame\r\n   * @param {Input} input - the input from this and the prior frame\r\n   * @param {Game} game - the game object\r\n   * @param {PlanetPlayer} player - representation of the player\r\n   */\r\n  update(elaspedTime, input, game, player) {}\r\n\r\n  /** @method\r\n   * Render the tileset, the player, and any other custom entities to the provided context.\r\n   * Draw here as if your visible grid is infinite, scrolling within a viewport is done by the PlanetLevelManager.\r\n   * @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame\r\n   * @param {CanvasRenderingContext2D} context - the rendering context\r\n   * @param {PlanetPlayer} player - representation of the player\r\n   */\r\n  render(elapsedTime, context, player) {}\r\n}\n\n//# sourceURL=webpack:///./src/planet_levels/BasePlanetLevel.js?");

/***/ }),

/***/ "./src/planet_levels/SamplePlanetLevel.js":
/*!************************************************!*\
  !*** ./src/planet_levels/SamplePlanetLevel.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SamplePlanetLevel; });\n/* harmony import */ var _BasePlanetLevel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BasePlanetLevel */ \"./src/planet_levels/BasePlanetLevel.js\");\n/* harmony import */ var _PlanetTileset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../PlanetTileset */ \"./src/PlanetTileset.js\");\n\r\n\r\n\r\nclass SamplePlanetLevel extends _BasePlanetLevel__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\r\n\r\n  constructor() {\r\n    super();\r\n\r\n    this.playerSpawnX = 10;\r\n    this.playerSpawnY = 10;\r\n    this.playerSpawnFaceDirection = 1;\r\n\r\n    this.tileset = new _PlanetTileset__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\r\n      __webpack_require__(/*! ../../dist/resources/planet_tilesets/sample_planet_level/tileset.json */ \"./dist/resources/planet_tilesets/sample_planet_level/tileset.json\"),\r\n      __webpack_require__(/*! ../../dist/resources/planet_tilesets/sample_planet_level/tilemap.json */ \"./dist/resources/planet_tilesets/sample_planet_level/tilemap.json\"),\r\n      \"resources/planet_tilesets/sample_planet_level/tiles.png\");\r\n    this.icon = new Image(32, 32);\r\n    this.name = \"Sample Planet Level\";\r\n  }\r\n\r\n  /** @method\r\n   * Called when the player interacts with a tile.\r\n   * @param player Representation of the player.\r\n   * @param x X grid coordinate of the interacted tile (in front of player).\r\n   * @param y Y grid coordinate of the interacted tile (in front of player).\r\n   */\r\n  playerInteracted(player, x, y) {\r\n\r\n  }\r\n\r\n  /**\r\n   * Called when the player moves.\r\n   * @param player Representation of the player.\r\n   */\r\n  playerMoved(player) {\r\n\r\n  }\r\n\r\n  /**\r\n   * Called when the player fires a weapon.\r\n   * @param player Representation of the player.\r\n   * @param x X grid coordinate of the tile the player fires into (in front of player).\r\n   * @param y Y grid coordinate of the tile the player fires into (in front of player).\r\n   */\r\n  playerFired(player, x, y) {\r\n\r\n  }\r\n\r\n  /** @method\r\n   * Update any entities within this planet level, including the player.\r\n   * @param {DOMHighResTimeStamp} elaspedTime - the amount of time elapsed this frame\r\n   * @param {Input} input - the input from this and the prior frame\r\n   * @param {Game} game - the game object\r\n   * @param {PlanetPlayer} player - representation of the player\r\n   */\r\n  update(elaspedTime, input, game, player) {\r\n    player.update(elaspedTime, input, game);\r\n  }\r\n\r\n  /** @method\r\n   * Render the tileset, the player, and any other custom entities to the provided context.\r\n   * Draw here as if your visible grid is infinite, scrolling within a viewport is done by the PlanetLevelManager.\r\n   * @param {DOMHighResTimeStamp} elapsedTime - the amount of time elapsed this frame\r\n   * @param {CanvasRenderingContext2D} context - the rendering context\r\n   * @param {PlanetPlayer} player - representation of the player\r\n   */\r\n  render(elapsedTime, context, player) {\r\n    this.tileset.render(elapsedTime, context);\r\n    player.render(elapsedTime, context);\r\n  }\r\n}\n\n//# sourceURL=webpack:///./src/planet_levels/SamplePlanetLevel.js?");

/***/ })

/******/ });