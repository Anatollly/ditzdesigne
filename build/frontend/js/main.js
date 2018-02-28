/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	var _application = __webpack_require__(2);
	
	var _application2 = _interopRequireDefault(_application);
	
	var _controller = __webpack_require__(4);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	var _data = __webpack_require__(9);
	
	var _pages = __webpack_require__(13);
	
	var _pages2 = _interopRequireDefault(_pages);
	
	var _util = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var logoMain = document.querySelector('.logo_main');
	var mainMenuItems = document.querySelectorAll('.main-menu li');
	
	logoMain.addEventListener('click', function () {
	  (0, _util.goToPage)(_pages2.default.main);
	});
	
	mainMenuItems.forEach(function (item) {
	  item.addEventListener('click', function () {
	    (0, _util.goToPage)(_pages2.default[item.className]);
	  });
	});
	
	window.fetch('./images').then(status).then(function (response) {
	  return response.json();
	}).then(function (data) {
	  _data.AppData.images = data;
	}).then(function () {
	  fetch('./albums').then(status).then(function (response) {
	    return response.json();
	  }).then(function (data) {
	    _data.AppData.albums = data;
	    showPage();
	  });
	}).catch(function () {
	  _application2.default.showErrorPage();
	});
	
	var checkValidHash = function checkValidHash(url) {
	  try {
	    var h = (0, _controller2.default)().hash.slice(1);
	    var page = 'show' + (h.charAt(0).toUpperCase() + h.slice(1)) + 'Page';
	    _application2.default[page]();
	  } catch (err) {
	    console.log('checkValidHash: ', err);
	    history.replaceState({ page: 1 }, '', '#/error');
	    (0, _util.goToPage)(_pages2.default.error);
	  }
	};
	
	// checkValidHash();
	
	window.onpopstate = function (e) {
	  checkValidHash();
	};
	
	var showPage = function showPage() {
	  if ((0, _controller2.default)().hash) {
	    checkValidHash();
	  } else {
	    (0, _util.goToPage)(_pages2.default.main);
	  }
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';
	
	(function (self) {
	  'use strict';
	
	  if (self.fetch) {
	    return;
	  }
	
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && function () {
	      try {
	        new Blob();
	        return true;
	      } catch (e) {
	        return false;
	      }
	    }(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  };
	
	  if (support.arrayBuffer) {
	    var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];
	
	    var isDataView = function isDataView(obj) {
	      return obj && DataView.prototype.isPrototypeOf(obj);
	    };
	
	    var isArrayBufferView = ArrayBuffer.isView || function (obj) {
	      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
	    };
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name');
	    }
	    return name.toLowerCase();
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value);
	    }
	    return value;
	  }
	
	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function next() {
	        var value = items.shift();
	        return { done: value === undefined, value: value };
	      }
	    };
	
	    if (support.iterable) {
	      iterator[Symbol.iterator] = function () {
	        return iterator;
	      };
	    }
	
	    return iterator;
	  }
	
	  function Headers(headers) {
	    this.map = {};
	
	    if (headers instanceof Headers) {
	      headers.forEach(function (value, name) {
	        this.append(name, value);
	      }, this);
	    } else if (Array.isArray(headers)) {
	      headers.forEach(function (header) {
	        this.append(header[0], header[1]);
	      }, this);
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function (name) {
	        this.append(name, headers[name]);
	      }, this);
	    }
	  }
	
	  Headers.prototype.append = function (name, value) {
	    name = normalizeName(name);
	    value = normalizeValue(value);
	    var oldValue = this.map[name];
	    this.map[name] = oldValue ? oldValue + ',' + value : value;
	  };
	
	  Headers.prototype['delete'] = function (name) {
	    delete this.map[normalizeName(name)];
	  };
	
	  Headers.prototype.get = function (name) {
	    name = normalizeName(name);
	    return this.has(name) ? this.map[name] : null;
	  };
	
	  Headers.prototype.has = function (name) {
	    return this.map.hasOwnProperty(normalizeName(name));
	  };
	
	  Headers.prototype.set = function (name, value) {
	    this.map[normalizeName(name)] = normalizeValue(value);
	  };
	
	  Headers.prototype.forEach = function (callback, thisArg) {
	    for (var name in this.map) {
	      if (this.map.hasOwnProperty(name)) {
	        callback.call(thisArg, this.map[name], name, this);
	      }
	    }
	  };
	
	  Headers.prototype.keys = function () {
	    var items = [];
	    this.forEach(function (value, name) {
	      items.push(name);
	    });
	    return iteratorFor(items);
	  };
	
	  Headers.prototype.values = function () {
	    var items = [];
	    this.forEach(function (value) {
	      items.push(value);
	    });
	    return iteratorFor(items);
	  };
	
	  Headers.prototype.entries = function () {
	    var items = [];
	    this.forEach(function (value, name) {
	      items.push([name, value]);
	    });
	    return iteratorFor(items);
	  };
	
	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'));
	    }
	    body.bodyUsed = true;
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function (resolve, reject) {
	      reader.onload = function () {
	        resolve(reader.result);
	      };
	      reader.onerror = function () {
	        reject(reader.error);
	      };
	    });
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    var promise = fileReaderReady(reader);
	    reader.readAsArrayBuffer(blob);
	    return promise;
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader();
	    var promise = fileReaderReady(reader);
	    reader.readAsText(blob);
	    return promise;
	  }
	
	  function readArrayBufferAsText(buf) {
	    var view = new Uint8Array(buf);
	    var chars = new Array(view.length);
	
	    for (var i = 0; i < view.length; i++) {
	      chars[i] = String.fromCharCode(view[i]);
	    }
	    return chars.join('');
	  }
	
	  function bufferClone(buf) {
	    if (buf.slice) {
	      return buf.slice(0);
	    } else {
	      var view = new Uint8Array(buf.byteLength);
	      view.set(new Uint8Array(buf));
	      return view.buffer;
	    }
	  }
	
	  function Body() {
	    this.bodyUsed = false;
	
	    this._initBody = function (body) {
	      this._bodyInit = body;
	      if (!body) {
	        this._bodyText = '';
	      } else if (typeof body === 'string') {
	        this._bodyText = body;
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body;
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body;
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString();
	      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
	        this._bodyArrayBuffer = bufferClone(body.buffer);
	        // IE 10-11 can't handle a DataView body.
	        this._bodyInit = new Blob([this._bodyArrayBuffer]);
	      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
	        this._bodyArrayBuffer = bufferClone(body);
	      } else {
	        throw new Error('unsupported BodyInit type');
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8');
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type);
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
	        }
	      }
	    };
	
	    if (support.blob) {
	      this.blob = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob);
	        } else if (this._bodyArrayBuffer) {
	          return Promise.resolve(new Blob([this._bodyArrayBuffer]));
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob');
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]));
	        }
	      };
	
	      this.arrayBuffer = function () {
	        if (this._bodyArrayBuffer) {
	          return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
	        } else {
	          return this.blob().then(readBlobAsArrayBuffer);
	        }
	      };
	    }
	
	    this.text = function () {
	      var rejected = consumed(this);
	      if (rejected) {
	        return rejected;
	      }
	
	      if (this._bodyBlob) {
	        return readBlobAsText(this._bodyBlob);
	      } else if (this._bodyArrayBuffer) {
	        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
	      } else if (this._bodyFormData) {
	        throw new Error('could not read FormData body as text');
	      } else {
	        return Promise.resolve(this._bodyText);
	      }
	    };
	
	    if (support.formData) {
	      this.formData = function () {
	        return this.text().then(decode);
	      };
	    }
	
	    this.json = function () {
	      return this.text().then(JSON.parse);
	    };
	
	    return this;
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method;
	  }
	
	  function Request(input, options) {
	    options = options || {};
	    var body = options.body;
	
	    if (input instanceof Request) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read');
	      }
	      this.url = input.url;
	      this.credentials = input.credentials;
	      if (!options.headers) {
	        this.headers = new Headers(input.headers);
	      }
	      this.method = input.method;
	      this.mode = input.mode;
	      if (!body && input._bodyInit != null) {
	        body = input._bodyInit;
	        input.bodyUsed = true;
	      }
	    } else {
	      this.url = String(input);
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit';
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers);
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET');
	    this.mode = options.mode || this.mode || null;
	    this.referrer = null;
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests');
	    }
	    this._initBody(body);
	  }
	
	  Request.prototype.clone = function () {
	    return new Request(this, { body: this._bodyInit });
	  };
	
	  function decode(body) {
	    var form = new FormData();
	    body.trim().split('&').forEach(function (bytes) {
	      if (bytes) {
	        var split = bytes.split('=');
	        var name = split.shift().replace(/\+/g, ' ');
	        var value = split.join('=').replace(/\+/g, ' ');
	        form.append(decodeURIComponent(name), decodeURIComponent(value));
	      }
	    });
	    return form;
	  }
	
	  function parseHeaders(rawHeaders) {
	    var headers = new Headers();
	    rawHeaders.split(/\r?\n/).forEach(function (line) {
	      var parts = line.split(':');
	      var key = parts.shift().trim();
	      if (key) {
	        var value = parts.join(':').trim();
	        headers.append(key, value);
	      }
	    });
	    return headers;
	  }
	
	  Body.call(Request.prototype);
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {};
	    }
	
	    this.type = 'default';
	    this.status = 'status' in options ? options.status : 200;
	    this.ok = this.status >= 200 && this.status < 300;
	    this.statusText = 'statusText' in options ? options.statusText : 'OK';
	    this.headers = new Headers(options.headers);
	    this.url = options.url || '';
	    this._initBody(bodyInit);
	  }
	
	  Body.call(Response.prototype);
	
	  Response.prototype.clone = function () {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    });
	  };
	
	  Response.error = function () {
	    var response = new Response(null, { status: 0, statusText: '' });
	    response.type = 'error';
	    return response;
	  };
	
	  var redirectStatuses = [301, 302, 303, 307, 308];
	
	  Response.redirect = function (url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code');
	    }
	
	    return new Response(null, { status: status, headers: { location: url } });
	  };
	
	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;
	
	  self.fetch = function (input, init) {
	    return new Promise(function (resolve, reject) {
	      var request = new Request(input, init);
	      var xhr = new XMLHttpRequest();
	
	      xhr.onload = function () {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
	        };
	        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options));
	      };
	
	      xhr.onerror = function () {
	        reject(new TypeError('Network request failed'));
	      };
	
	      xhr.ontimeout = function () {
	        reject(new TypeError('Network request failed'));
	      };
	
	      xhr.open(request.method, request.url, true);
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true;
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob';
	      }
	
	      request.headers.forEach(function (value, name) {
	        xhr.setRequestHeader(name, value);
	      });
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	    });
	  };
	  self.fetch.polyfill = true;
	})(typeof self !== 'undefined' ? self : undefined);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(3);
	
	var _mainPage = __webpack_require__(5);
	
	var _mainPage2 = _interopRequireDefault(_mainPage);
	
	var _aboutUsPage = __webpack_require__(14);
	
	var _aboutUsPage2 = _interopRequireDefault(_aboutUsPage);
	
	var _portfolioPage = __webpack_require__(15);
	
	var _portfolioPage2 = _interopRequireDefault(_portfolioPage);
	
	var _servicesPage = __webpack_require__(19);
	
	var _servicesPage2 = _interopRequireDefault(_servicesPage);
	
	var _technologiesPage = __webpack_require__(20);
	
	var _technologiesPage2 = _interopRequireDefault(_technologiesPage);
	
	var _contactsPage = __webpack_require__(21);
	
	var _contactsPage2 = _interopRequireDefault(_contactsPage);
	
	var _bestsellerPage = __webpack_require__(22);
	
	var _bestsellerPage2 = _interopRequireDefault(_bestsellerPage);
	
	var _interTextilePage = __webpack_require__(23);
	
	var _interTextilePage2 = _interopRequireDefault(_interTextilePage);
	
	var _sharesPage = __webpack_require__(24);
	
	var _sharesPage2 = _interopRequireDefault(_sharesPage);
	
	var _textileForRestPage = __webpack_require__(25);
	
	var _textileForRestPage2 = _interopRequireDefault(_textileForRestPage);
	
	var _uniformsPage = __webpack_require__(26);
	
	var _uniformsPage2 = _interopRequireDefault(_uniformsPage);
	
	var _errorPage = __webpack_require__(27);
	
	var _errorPage2 = _interopRequireDefault(_errorPage);
	
	var _controller = __webpack_require__(4);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Application = function () {
	  function Application() {
	    _classCallCheck(this, Application);
	  }
	
	  _createClass(Application, null, [{
	    key: 'showMainPage',
	    value: function showMainPage() {
	      (0, _util.displayElement)((0, _mainPage2.default)());
	      // hashController().hash = '/main';
	    }
	  }, {
	    key: 'showAboutUsPage',
	    value: function showAboutUsPage() {
	      (0, _util.displayElement)((0, _aboutUsPage2.default)());
	      // hashController().hash = '/aboutUs';
	    }
	  }, {
	    key: 'showPortfolioPage',
	    value: function showPortfolioPage() {
	      (0, _util.displayElement)((0, _portfolioPage2.default)());
	      // hashController().hash = '/portfolio';
	    }
	  }, {
	    key: 'showServicesPage',
	    value: function showServicesPage() {
	      (0, _util.displayElement)((0, _servicesPage2.default)());
	      // hashController().hash = '/services';
	    }
	  }, {
	    key: 'showTechnologiesPage',
	    value: function showTechnologiesPage() {
	      (0, _util.displayElement)((0, _technologiesPage2.default)());
	      // hashController().hash = '/technologies';
	    }
	  }, {
	    key: 'showContactsPage',
	    value: function showContactsPage() {
	      (0, _util.displayElement)((0, _contactsPage2.default)());
	      // hashController().hash = '/contacts';
	    }
	  }, {
	    key: 'showBestsellerPage',
	    value: function showBestsellerPage() {
	      (0, _util.displayElement)((0, _bestsellerPage2.default)());
	      // hashController().hash = '/bestseller';
	    }
	  }, {
	    key: 'showInterTextilePage',
	    value: function showInterTextilePage() {
	      (0, _util.displayElement)((0, _interTextilePage2.default)());
	      // hashController().hash = '/interTextile';
	    }
	  }, {
	    key: 'showSharesPage',
	    value: function showSharesPage() {
	      (0, _util.displayElement)((0, _sharesPage2.default)());
	      // hashController().hash = '/shares';
	    }
	  }, {
	    key: 'showTextileForRestPage',
	    value: function showTextileForRestPage() {
	      (0, _util.displayElement)((0, _textileForRestPage2.default)());
	      // hashController().hash = '/textileForRest';
	    }
	  }, {
	    key: 'showUniformsPage',
	    value: function showUniformsPage() {
	      (0, _util.displayElement)((0, _uniformsPage2.default)());
	      // hashController().hash = '/uniforms';
	    }
	  }, {
	    key: 'showErrorPage',
	    value: function showErrorPage() {
	      (0, _util.displayElement)((0, _errorPage2.default)());
	      // hashController().hash = '/error';
	    }
	  }]);
	
	  return Application;
	}();
	
	exports.default = Application;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.goToPage = exports.getAlbumName = exports.getPageName = exports.getImageName = exports.displayElement = exports.getElementFromTemplate = exports.getImageS = undefined;
	
	var _controller = __webpack_require__(4);
	
	var _controller2 = _interopRequireDefault(_controller);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mainElement = document.querySelector('.content');
	
	var createImage = function createImage(srcImage, htmlTag, nameImage) {
	  var domElement = document.createElement(htmlTag);
	  var image = new Image();
	  image.onload = function () {
	    domElement.innerHTML = nameImage || '';
	    domElement.appendChild(image);
	  };
	  image.onerror = function () {
	    domElement.innerHTML = 'Error: image-' + srcImage + ' load failure!';
	  };
	  image.src = srcImage;
	  return domElement;
	};
	
	var getImageS = exports.getImageS = function getImageS(data) {
	  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
	
	  if (data.length === 1) {
	    return createImage(data[0], 'div', name);
	  } else {
	    var ulImage = document.createElement('ul');
	    data.forEach(function (img, i) {
	      ulImage.appendChild(createImage(img, 'li', name[i]));
	    });
	    return ulImage;
	  }
	};
	
	var getElementFromTemplate = exports.getElementFromTemplate = function getElementFromTemplate(nodeElement) {
	  var node = document.createElement('span');
	  var trimElement = nodeElement.trim();
	  node.innerHTML = trimElement;
	  return node;
	};
	
	var displayElement = exports.displayElement = function displayElement(element) {
	  mainElement.innerHTML = '';
	  mainElement.appendChild(element);
	};
	
	var getImageName = exports.getImageName = function getImageName(stringPath) {
	  return decodeURIComponent(stringPath).match(/([^\/]*.(jpg|png|jpeg))$/)[1];
	};
	
	var getPageName = exports.getPageName = function getPageName(stringPath) {
	  return decodeURIComponent(stringPath).match(/([^\/]*.).(png|jpg|jpeg)$/)[1];
	};
	
	var getAlbumName = exports.getAlbumName = function getAlbumName(stringPath) {
	  return decodeURIComponent(stringPath.match(/\/([^\/]*)\/[^\/]*$/)[1]);
	};
	
	var goToPage = exports.goToPage = function goToPage(page) {
	  (0, _controller2.default)().hash = page;
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Controller = function () {
	  function Controller() {
	    _classCallCheck(this, Controller);
	  }
	
	  _createClass(Controller, [{
	    key: "hash",
	    get: function get() {
	      var hash = window.location.hash.slice(1);
	      return hash;
	    },
	    set: function set(hash) {
	      window.location.hash = hash;
	    }
	  }]);
	
	  return Controller;
	}();
	
	exports.default = function () {
	  return new Controller();
	};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _abstractPageView = __webpack_require__(6);
	
	var _abstractPageView2 = _interopRequireDefault(_abstractPageView);
	
	var _imageView = __webpack_require__(7);
	
	var _imageView2 = _interopRequireDefault(_imageView);
	
	var _data = __webpack_require__(9);
	
	var _mainSliderView = __webpack_require__(10);
	
	var _mainSliderView2 = _interopRequireDefault(_mainSliderView);
	
	var _application = __webpack_require__(2);
	
	var _application2 = _interopRequireDefault(_application);
	
	var _trustUsView = __webpack_require__(12);
	
	var _trustUsView2 = _interopRequireDefault(_trustUsView);
	
	var _util = __webpack_require__(3);
	
	var _pages = __webpack_require__(13);
	
	var _pages2 = _interopRequireDefault(_pages);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MainPageView = function (_AbstractPageView) {
	  _inherits(MainPageView, _AbstractPageView);
	
	  function MainPageView() {
	    _classCallCheck(this, MainPageView);
	
	    var _this = _possibleConstructorReturn(this, (MainPageView.__proto__ || Object.getPrototypeOf(MainPageView)).call(this));
	
	    _this.rightPictures = (0, _imageView2.default)(_data.AppData.images.mainRight);
	    return _this;
	  }
	
	  _createClass(MainPageView, [{
	    key: 'getMarkup',
	    value: function getMarkup() {
	      return '\n    <div class="row row-1">\n      <div class="row__content">\n      </div>\n    </div>\n    <div class="row row-2">\n      <div class="row__caption">\n        <div class="name">\u0425\u0438\u0442 \u043F\u0440\u043E\u0434\u0430\u0436</div>\n        <div class="image"><img src="frontend/img/pic-2.png" alt=""></div>\n      </div>\n      <div class="row__image">\n      </div>\n    </div>\n    <div class="row row-3">\n      <div class="row__caption">\n        <div class="name">\u0410\u043A\u0446\u0438\u0438</div>\n        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>\n      </div>\n      <div class="row__image row__image-threeImg">\n      </div>\n    </div>\n    <div class="row row-trust"></div>\n    ';
	    }
	  }, {
	    key: 'addElements',
	    value: function addElements() {
	      this.rightPictures.classList.add('rightPictures');
	
	      this.element.querySelector('.row-1 .row__content').appendChild((0, _mainSliderView2.default)(_data.AppData.images.mainSlider));
	      this.element.querySelector('.row-1 .row__content').appendChild(this.rightPictures);
	      this.element.querySelector('.row-2 .row__image').appendChild((0, _imageView2.default)(_data.AppData.images.mainHit));
	      this.element.querySelector('.row-3 .row__image').appendChild((0, _imageView2.default)(_data.AppData.images.mainStock));
	      this.element.querySelector('.row-trust').appendChild((0, _trustUsView2.default)());
	    }
	  }, {
	    key: 'bindHandlers',
	    value: function bindHandlers() {
	      var bestseller = this.element.querySelector('.row-2 .name');
	      var shares = this.element.querySelector('.row-3 .name');
	      var slider = this.element.querySelector('.slider-onLeft');
	      var sliderImages = this.element.querySelectorAll('.slider-onLeft li');
	      bestseller.addEventListener('click', _application2.default.showBestsellerPage);
	      shares.addEventListener('click', _application2.default.showSharesPage);
	      this.rightPictures.addEventListener('click', function (e) {
	        (0, _util.goToPage)(_pages2.default[(0, _util.getPageName)(e.target.src)]);
	      });
	      slider.addEventListener('click', function (e) {
	        if (!(e.target.localName === 'a')) {
	          sliderImages.forEach(function (li, i) {
	            if (li.classList.contains('animate')) {
	              try {
	                _application2.default['show' + _data.AppData.images.mainSlider[i].split('.')[0].split('-')[1] + 'Page']();
	              } catch (err) {
	                _application2.default.showErrorPage();
	              }
	            }
	          });
	        }
	      });
	    }
	  }]);
	
	  return MainPageView;
	}(_abstractPageView2.default);
	
	exports.default = function () {
	  return new MainPageView().element;
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(3);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AbstractPageView = function () {
	  function AbstractPageView() {
	    _classCallCheck(this, AbstractPageView);
	  }
	
	  _createClass(AbstractPageView, [{
	    key: 'getMarkup',
	    value: function getMarkup() {
	      throw new Error('Abstract method should be implemented');
	    }
	  }, {
	    key: 'addElements',
	    value: function addElements() {
	      // By default there is nothing to add
	    }
	  }, {
	    key: 'bindHandlers',
	    value: function bindHandlers() {
	      // By default there is nothing to bind
	    }
	  }, {
	    key: 'element',
	    get: function get() {
	      if (!this._element) {
	        this._element = (0, _util.getElementFromTemplate)(this.getMarkup());
	        this.addElements();
	        this.bindHandlers();
	      }
	      return this._element;
	    }
	  }]);
	
	  return AbstractPageView;
	}();
	
	exports.default = AbstractPageView;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ImageView = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(3);
	
	var _abstractView = __webpack_require__(8);
	
	var _abstractView2 = _interopRequireDefault(_abstractView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ImageView = exports.ImageView = function (_AbstractView) {
	  _inherits(ImageView, _AbstractView);
	
	  function ImageView(data) {
	    _classCallCheck(this, ImageView);
	
	    var _this = _possibleConstructorReturn(this, (ImageView.__proto__ || Object.getPrototypeOf(ImageView)).call(this));
	
	    _this.data = data;
	    return _this;
	  }
	
	  _createClass(ImageView, [{
	    key: 'getMarkup',
	    value: function getMarkup() {
	      return (0, _util.getImageS)(this.data);
	    }
	  }]);
	
	  return ImageView;
	}(_abstractView2.default);
	
	exports.default = function (data) {
	  return new ImageView(data).element;
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AbstractView = function () {
	  function AbstractView() {
	    _classCallCheck(this, AbstractView);
	  }
	
	  _createClass(AbstractView, [{
	    key: 'getMarkup',
	    value: function getMarkup() {
	      throw new Error('Abstract method should be implemented');
	    }
	  }, {
	    key: 'bindHandlers',
	    value: function bindHandlers() {
	      // By default there is nothing to bind
	    }
	  }, {
	    key: 'element',
	    get: function get() {
	      if (!this._element) {
	        this._element = this.getMarkup();
	        this.bindHandlers();
	      }
	      return this._element;
	    }
	  }]);
	
	  return AbstractView;
	}();
	
	exports.default = AbstractView;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var menuData = exports.menuData = {
	  aboutUs: ['quality', 'branding'],
	  portfolio: [],
	  services: ['uniforms', 'devDesign', 'depSpec', 'howToMakeAnOrder'],
	  materials: ['textile', 'decor'],
	  contacts: []
	};
	
	var linksData = exports.linksData = {
	  main: 'Главная',
	  aboutUs: 'О нас',
	  portfolio: 'Портфолио',
	  services: 'Услуги',
	  materials: 'Ткани и технологии',
	  contacts: 'Контакты',
	  quality: 'Гарантия качества',
	  branding: 'Брендирование',
	  uniforms: 'Униформа на заказ',
	  devDesign: 'Разработка дизайна',
	  depSpec: 'Выезд специалиста',
	  howToMakeAnOrder: 'Как сделать заказ',
	  textile: 'Текстиль для ресторана',
	  decor: 'Декор текстильный',
	  phone: '+7-913-123-45-67',
	  phone2: '+7-913-987-65-43',
	  address: 'ул. Красный проспект, д.220'
	};
	
	var albumDataVar = void 0;
	var imagesDataVar = void 0;
	
	var AppData = exports.AppData = function () {
	  function AppData() {
	    _classCallCheck(this, AppData);
	  }
	
	  _createClass(AppData, [{
	    key: 'albums',
	    set: function set(data) {
	      albumDataVar = data;
	    },
	    get: function get() {
	      return albumDataVar;
	    }
	  }, {
	    key: 'images',
	    set: function set(data) {
	      imagesDataVar = data;
	    },
	    get: function get() {
	      console.log(imagesDataVar);
	      return imagesDataVar;
	    }
	  }]);

	  return AppData;
	}();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _abstractSliderView = __webpack_require__(11);
	
	var _abstractSliderView2 = _interopRequireDefault(_abstractSliderView);
	
	var _util = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TIME_CHANGE = 3000;
	
	var MainSliderView = function (_AbstractSliderView) {
	  _inherits(MainSliderView, _AbstractSliderView);
	
	  function MainSliderView(data) {
	    _classCallCheck(this, MainSliderView);
	
	    var _this = _possibleConstructorReturn(this, (MainSliderView.__proto__ || Object.getPrototypeOf(MainSliderView)).call(this, data));
	
	    _this.timerID = 0;
	    _this.images[_this.i].classList.add('animate');
	    return _this;
	  }
	
	  _createClass(MainSliderView, [{
	    key: 'startInterval',
	    value: function startInterval() {
	      var _this2 = this;
	
	      this.timerID = setInterval(function () {
	        _this2.showNextImage();
	      }, TIME_CHANGE);
	    }
	  }, {
	    key: 'bindHandlers',
	    value: function bindHandlers() {
	      var _this3 = this;
	
	      this.arrowRight.addEventListener('click', function () {
	        clearInterval(_this3.timerID);
	        _this3.showNextImage();
	        _this3.startInterval();
	      });
	
	      this.arrowLeft.addEventListener('click', function () {
	        clearInterval(_this3.timerID);
	        _this3.showPrevImage();
	        _this3.startInterval();
	      });
	
	      this.startInterval();
	    }
	  }, {
	    key: 'getAddElement',
	    value: function getAddElement() {
	      return (0, _util.getElementFromTemplate)('<img class="slider__imgSize" src="frontend/img/empty.jpg" alt="">');
	    }
	  }, {
	    key: 'setAddClass',
	    value: function setAddClass() {
	      return 'slider-onLeft';
	    }
	  }]);
	
	  return MainSliderView;
	}(_abstractSliderView2.default);
	
	exports.default = function (data) {
	  return new MainSliderView(data).element;
	};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(3);
	
	var _abstractView = __webpack_require__(8);
	
	var _abstractView2 = _interopRequireDefault(_abstractView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AbstractSliderView = function (_AbstractView) {
	  _inherits(AbstractSliderView, _AbstractView);
	
	  function AbstractSliderView(data) {
	    _classCallCheck(this, AbstractSliderView);
	
	    var _this = _possibleConstructorReturn(this, (AbstractSliderView.__proto__ || Object.getPrototypeOf(AbstractSliderView)).call(this, data));
	
	    _this.data = data;
	    _this.sliderBox = document.createElement('div');
	    _this.arrowRight = document.createElement('a');
	    _this.arrowLeft = document.createElement('a');
	    _this.i = 0;
	    return _this;
	  }
	
	  _createClass(AbstractSliderView, [{
	    key: 'setImgOnClick',
	    value: function setImgOnClick(i) {
	      this.images[i].classList.add('animate');
	      this.i = i;
	    }
	  }, {
	    key: 'getMarkup',
	    value: function getMarkup() {
	      this.sliderBox.classList.add('slider');
	      this.arrowRight.classList.add('slider__arrowRight');
	      this.arrowLeft.classList.add('slider__arrowLeft');
	      this.sliderBox.appendChild((0, _util.getImageS)(this.data));
	      this.sliderBox.appendChild(this.arrowRight);
	      this.sliderBox.appendChild(this.arrowLeft);
	      if (this.getAddElement()) {
	        this.sliderBox.appendChild(this.getAddElement());
	      }
	      if (this.setAddClass()) {
	        this.sliderBox.classList.add(this.setAddClass());
	      }
	      return this.sliderBox;
	    }
	  }, {
	    key: 'getAddElement',
	    value: function getAddElement() {}
	  }, {
	    key: 'setAddClass',
	    value: function setAddClass() {}
	  }, {
	    key: 'showNextImage',
	    value: function showNextImage() {
	      this.images[this.i].classList.remove('animate');
	      this.i = (this.i + 1) % this.images.length;
	      this.images[this.i].classList.add('animate');
	    }
	  }, {
	    key: 'showPrevImage',
	    value: function showPrevImage() {
	      this.images[this.i].classList.remove('animate');
	      this.i = this.i || this.images.length;
	      this.i = (this.i - 1) % this.images.length;
	      this.images[this.i].classList.add('animate');
	    }
	  }, {
	    key: 'bindHandlers',
	    value: function bindHandlers() {
	      this.arrowRight.addEventListener('click', this.showNextImage.bind(this));
	      this.arrowLeft.addEventListener('click', this.showPrevImage.bind(this));
	
	      this.bindAddHandlers();
	    }
	  }, {
	    key: 'bindAddHandlers',
	    value: function bindAddHandlers() {}
	  }, {
	    key: 'images',
	    get: function get() {
	      if (!this._images) {
	        this._images = this.element.querySelectorAll('li');
	      }
	      return this._images;
	    }
	  }]);
	
	  return AbstractSliderView;
	}(_abstractView2.default);
	
	exports.default = AbstractSliderView;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _abstractPageView = __webpack_require__(6);
	
	var _abstractPageView2 = _interopRequireDefault(_abstractPageView);
	
	var _imageView = __webpack_require__(7);
	
	var _imageView2 = _interopRequireDefault(_imageView);
	
	var _data = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TrustUsView = function (_AbstractPageView) {
	  _inherits(TrustUsView, _AbstractPageView);
	
	  function TrustUsView() {
	    _classCallCheck(this, TrustUsView);
	
	    return _possibleConstructorReturn(this, (TrustUsView.__proto__ || Object.getPrototypeOf(TrustUsView)).apply(this, arguments));
	  }
	
	  _createClass(TrustUsView, [{
	    key: 'getMarkup',
	    value: function getMarkup() {
	      return '\n      <div class="row__caption">\n        <div class="name">\u041D\u0430\u043C \u0434\u043E\u0432\u0435\u0440\u044F\u044E\u0442</div>\n        <div class="image"><img src="frontend/img/pic-4.png" alt=""></div>\n      </div>\n      <div class="row__image row__image-sixImg">\n      </div>\n    ';
	    }
	  }, {
	    key: 'addElements',
	    value: function addElements() {
	      this.element.querySelector('.row__image').appendChild((0, _imageView2.default)(_data.AppData.images.logos));
	    }
	  }]);
	
	  return TrustUsView;
	}(_abstractPageView2.default);
	
	exports.default = function () {
	  return new TrustUsView().element;
	};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var pages = {
	  main: '/main',
	  aboutUs: '/aboutUs',
	  portfolio: '/portfolio',
	  services: '/services',
	  technologies: '/technologies',
	  contacts: '/contacts',
	  bestseller: '/bestseller',
	  interTextile: '/interTextile',
	  textileForRest: '/textileForRest',
	  uniforms: '/uniforms',
	  error: '/error'
	};
	
	exports.default = pages;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _abstractPageView = __webpack_require__(6);
	
	var _abstractPageView2 = _interopRequireDefault(_abstractPageView);
	
	var _imageView = __webpack_require__(7);
	
	var _imageView2 = _interopRequireDefault(_imageView);
	
	var _data = __webpack_require__(9);
	
	var _trustUsView = __webpack_require__(12);
	
	var _trustUsView2 = _interopRequireDefault(_trustUsView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AboutUsPageView = function (_AbstractPageView) {
	  _inherits(AboutUsPageView, _AbstractPageView);
	
	  function AboutUsPageView() {
	    _classCallCheck(this, AboutUsPageView);
	
	    var _this = _possibleConstructorReturn(this, (AboutUsPageView.__proto__ || Object.getPrototypeOf(AboutUsPageView)).call(this));
	
	    _this.bigTop = (0, _imageView2.default)(_data.AppData.images.aboutUsBigTop);
	    _this.rightTop = (0, _imageView2.default)(_data.AppData.images.aboutUsRightTop);
	    _this.bigBottom = (0, _imageView2.default)(_data.AppData.images.aboutUsBigBottom);
	    _this.rightBottom = (0, _imageView2.default)(_data.AppData.images.aboutUsRightBottom);
	    return _this;
	  }
	
	  _createClass(AboutUsPageView, [{
	    key: 'getMarkup',
	    value: function getMarkup() {
	      return '\n      <div class="row aboutUsPage">\n        <div class="row__caption">\n          <div class="name">\u041E \u043D\u0430\u0441</div>\n          <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>\n        </div>\n        <div class="row__content image-top">\n          <div class="slider slider-onLeft">\n            <span>\n              <img class="slider__imgSize" src="frontend/img/empty.jpg" alt="">\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class="row">\n        <div class="row__caption">\n          <div class="name"></div>\n          <div class="image"><img src="frontend/img/pic-2.png" alt=""></div>\n        </div>\n        <div class="text">\n          <p class="paragraph">\n            C\u0442\u0443\u0434\u0438\u044F \u0442\u0435\u043A\u0441\u0442\u0438\u043B\u044C\u043D\u043E\u0433\u043E \u0434\u0438\u0437\u0430\u0439\u043D\u0430 DitzDesigne \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442 \u0441\u0432\u043E\u044E \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u0432 2015 \u0433\u043E\u0434\u0443,<br>\n            \u0437\u0430 \u044D\u0442\u043E \u0432\u0440\u0435\u043C\u044F \u043C\u044B \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u043B\u0438 \u0438 \u043F\u043E\u0448\u0438\u043B\u0438 \u0431\u043E\u043B\u0435\u0435 500 \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u044B\u0445 \u0438\u0434\u0435\u0439,<br>\n            \u0441 \u043A\u043E\u0442\u043E\u0440\u044B\u043C\u0438 \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u043E\u0437\u043D\u0430\u043A\u043E\u043C\u0438\u0442\u044C\u0441\u044F \u0432 \u0440\u0430\u0437\u0434\u0435\u043B\u0435 \u043F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E.\n          </p>\n          <p class="paragraph">\n            DitzDesigne \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u0442 \u0441\u0432\u043E\u0438\u043C \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u0443\u044E \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u044E \u0438<br>\n            \u0434\u043E\u0441\u0442\u043E\u0439\u043D\u044B\u0439 \u0441\u0435\u0440\u0432\u0438\u0441 \u0431\u043B\u0430\u0433\u043E\u0434\u0430\u0440\u044F \u0440\u044F\u0434\u0443 \u043F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432:\n          </p>\n          <p class="paragraph">\n            <div class="needle needle__paragraph"></div>\n            \u0421\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0448\u0432\u0435\u0439\u043D\u044B\u0439 \u0446\u0435\u0445 \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043D\u0430\u043C \u043E\u0441\u0443\u0449\u0435\u0441\u0442\u0432\u043B\u044F\u0442\u044C<br>\n            \u043F\u043E\u0448\u0438\u0432 \u0443\u043D\u0438\u0444\u043E\u0440\u043C\u044B, \u0442\u0435\u043A\u0441\u0442\u0438\u043B\u044F \u0434\u043B\u044F \u0440\u0435\u0441\u0442\u043E\u0440\u0430\u043D\u043E\u0432, \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u043E\u0432,<br>\n            \u0441\u0435\u0440\u0432\u0438\u0441\u043E\u0432 \u0438 \u0437\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0439 \u043D\u0430 \u0437\u0430\u043A\u0430\u0437 \u043F\u0440\u0435\u043C\u0438\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0430\n          </p>\n          <p class="paragraph">\n            <div class="needle needle__paragraph"></div>\n            \u0421\u043E \u0434\u043D\u044F \u0441\u0432\u043E\u0435\u0433\u043E \u043E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u044F \u043C\u044B \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u0447\u0430\u0435\u043C \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E<br>\n            \u0441 \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u043C\u0438 \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u0430\u043C\u0438 \u0442\u0435\u043A\u0441\u0442\u0438\u043B\u044F, \u0444\u0443\u0440\u043D\u0438\u0442\u0443\u0440\u044B,<br>\n            \u043E\u0442\u0434\u0435\u043B\u043E\u0447\u043D\u044B\u0445 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432. \u0418 \u044D\u0442\u043E \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442 \u0448\u0438\u0442\u044C \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u044E<br>\n            \u043D\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u0435\u043A\u0440\u0430\u0441\u043D\u0443\u044E \u043F\u043E \u0432\u043D\u0435\u0448\u043D\u0435\u043C\u0443 \u0432\u0438\u0434\u0443,<br>\n            \u043D\u043E \u0438 \u043F\u043E \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0443 \u0438 \u0441\u0432\u043E\u0439\u0441\u0442\u0432\u0430\u043C\n          </p>\n          <p class="paragraph">\n            <div class="needle needle__paragraph"></div>\n            \u041C\u044B \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u043C \u0440\u0430\u0431\u043E\u0442\u044B \u043F\u043E \u043F\u043E\u0448\u0438\u0432\u0443, \u043A\u0430\u043A \u043F\u043E \u044D\u0441\u043A\u0438\u0437\u0430\u043C \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0430,<br>\n            \u0442\u0430\u043A \u0438 \u043F\u043E \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u043C \u0434\u0438\u0437\u0430\u0439\u043D\u0435\u0440\u0441\u043A\u0438\u043C \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0430\u043C\n          </p>\n          <p class="paragraph">\n            <div class="needle needle__paragraph"></div>\n            \u0421\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u043E \u0441\u0442\u0443\u0434\u0438\u0435\u0439 DitzDesigne \u043E\u0447\u0435\u043D\u044C \u0443\u0434\u043E\u0431\u043D\u043E.<br>\n            \u041C\u044B \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u043C \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0443 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432 \u044D\u0441\u043A\u0438\u0437\u043E\u0432,<br>\n            \u043C\u043E\u0436\u0435\u043C \u0438\u0437\u0433\u043E\u0442\u043E\u0432\u0438\u0442\u044C \u043E\u0431\u0440\u0430\u0437\u0435\u0446 \u0438, \u043F\u0440\u0438 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E\u0441\u0442\u0438,<br>\n            \u0441\u0430\u043C\u0438 \u0432\u044B\u0435\u0437\u0436\u0430\u0435\u043C \u043A \u0437\u0430\u043A\u0430\u0437\u0447\u0438\u043A\u0443 \u0434\u043B\u044F \u0441\u043D\u044F\u0442\u0438\u044F \u043C\u0435\u0440\u043E\u043A\n          </p>\n          <div class="row__caption row__caption-split">\n            <div class="name"></div>\n            <div class="image"><img src="frontend/img/pic-2.png" alt=""></div>\n          </div>\n          <p class="paragraph paragraph-bottom">\n            \u041C\u044B \u043E\u0447\u0435\u043D\u044C \u0431\u043B\u0430\u0433\u043E\u0434\u0430\u0440\u043D\u044B \u0432\u0441\u0435\u043C \u043D\u0430\u0448\u0438\u043C \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0430\u043C,<br>\n            \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043E\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442 \u043D\u0430\u043C \u0434\u043E\u0432\u0435\u0440\u0438\u0435 \u0438 \u0432\u0434\u043E\u0445\u043D\u043E\u0432\u043B\u044F\u044E\u0442<br>\n            \u043D\u0430 \u043D\u043E\u0432\u044B\u0435 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F!\n          </p>\n        </div>\n      </div>\n      <div class="row">\n        <div class="row__content image-bottom">\n          <div class="slider slider-onLeft">\n            <span>\n              <img class="slider__imgSize" src="frontend/img/empty.jpg" alt="">\n            </span>\n          </div>\n        </div>\n      </div>\n      <div class="row row-trust"></div>\n      ';
	    }
	  }, {
	    key: 'addElements',
	    value: function addElements() {
	      // this.bigTop.classList.add('animate');
	      this.rightTop.classList.add('rightPictures');
	      // this.bigBottom.classList.add('');
	      this.rightBottom.classList.add('rightPictures');
	
	      // const element = this.element.querySelector('.row .row__content.image-top .slider');
	      // this.element.querySelector('.row .row__content.image-top').insertBefore(this.rightTop, element);
	      this.element.querySelector('.row .row__content.image-top .slider').appendChild(this.bigTop);
	      this.element.querySelector('.row .row__content.image-top').appendChild(this.rightTop);
	      this.element.querySelector('.row .row__content.image-bottom .slider').appendChild(this.bigBottom);
	      this.element.querySelector('.row .row__content.image-bottom').appendChild(this.rightBottom);
	      this.element.querySelector('.row-trust').appendChild((0, _trustUsView2.default)());
	    }
	  }]);
	
	  return AboutUsPageView;
	}(_abstractPageView2.default);
	
	exports.default = function () {
	  return new AboutUsPageView().element;
	};
	
	// <span>
	//   <img class="slider__imgSize" src="frontend/img/empty.jpg" alt="">
	// </span>

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _abstractPageView = __webpack_require__(6);
	
	var _abstractPageView2 = _interopRequireDefault(_abstractPageView);
	
	var _allAlbumsView = __webpack_require__(16);
	
	var _allAlbumsView2 = _interopRequireDefault(_allAlbumsView);
	
	var _data = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PortfolioPageView = function (_AbstractPageView) {
	  _inherits(PortfolioPageView, _AbstractPageView);
	
	  function PortfolioPageView() {
	    _classCallCheck(this, PortfolioPageView);
	
	    return _possibleConstructorReturn(this, (PortfolioPageView.__proto__ || Object.getPrototypeOf(PortfolioPageView)).apply(this, arguments));
	  }
	
	  _createClass(PortfolioPageView, [{
	    key: 'getMarkup',
	    value: function getMarkup() {
	      return '<div class="row row-4">\n      <div class="row__caption">\n        <div class="name">\u041F\u043E\u0440\u0442\u0444\u043E\u043B\u0438\u043E</div>\n        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>\n      </div>\n      <div class="row__image row__image-album">\n      </div>\n    </div>';
	    }
	  }, {
	    key: 'addElements',
	    value: function addElements() {
	      var backButton = this.element.querySelector('.row-4 .row__caption .name');
	      var albumBox = this.element.querySelector('.row-4 .row__image');
	      var screenImage = this.element.querySelector('.screenImage');
	
	      albumBox.appendChild((0, _allAlbumsView2.default)(_data.AppData.albums, albumBox));
	      backButton.addEventListener('click', function () {
	        albumBox.innerHTML = '';
	        albumBox.appendChild((0, _allAlbumsView2.default)(_data.AppData.albums, albumBox));
	      });
	    }
	  }, {
	    key: 'bindHandlers',
	    value: function bindHandlers() {}
	  }]);
	
	  return PortfolioPageView;
	}(_abstractPageView2.default);
	
	exports.default = function () {
	  return new PortfolioPageView().element;
	};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _abstractView = __webpack_require__(8);
	
	var _abstractView2 = _interopRequireDefault(_abstractView);
	
	var _albumView = __webpack_require__(17);
	
	var _albumView2 = _interopRequireDefault(_albumView);
	
	var _util = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AllAlbumsView = function (_AbstractView) {
	  _inherits(AllAlbumsView, _AbstractView);
	
	  function AllAlbumsView(data, albumBox) {
	    _classCallCheck(this, AllAlbumsView);
	
	    var _this = _possibleConstructorReturn(this, (AllAlbumsView.__proto__ || Object.getPrototypeOf(AllAlbumsView)).call(this));
	
	    _this.data = data;
	    _this.coversOfAlbums = [];
	    _this.namesOfAlbums = [];
	    _this.arrData = Object.keys(_this.data);
	    _this.albumBox = albumBox;
	    return _this;
	  }
	
	  _createClass(AllAlbumsView, [{
	    key: 'getDataOfAlbum',
	    value: function getDataOfAlbum() {
	      for (var i = 0; i < this.arrData.length; i++) {
	        if (!(this.arrData[i] === 'interTextil' || this.arrData[i] === 'textileForRest' || this.arrData[i] === 'uniforms')) {
	          this.coversOfAlbums.push(this.data[this.arrData[i]][0]);
	          this.namesOfAlbums.push('<div>' + this.arrData[i] + '</div>');
	        }
	      }
	    }
	  }, {
	    key: 'getMarkup',
	    value: function getMarkup() {
	      this.getDataOfAlbum();
	      return (0, _util.getImageS)(this.coversOfAlbums, this.namesOfAlbums);
	    }
	  }, {
	    key: 'bindHandlers',
	    value: function bindHandlers() {
	      var _this2 = this;
	
	      this.element.addEventListener('click', function (e) {
	        if (e.target.src) {
	          _this2.arrData.forEach(function (name, i) {
	            if (name === (0, _util.getAlbumName)(e.target.src)) {
	              _this2.albumBox.innerHTML = '';
	              _this2.albumBox.appendChild((0, _albumView2.default)(_this2.data[name]));
	            }
	          });
	        }
	      });
	    }
	  }]);
	
	  return AllAlbumsView;
	}(_abstractView2.default);
	
	exports.default = function (data, box) {
	  return new AllAlbumsView(data, box).element;
	};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _imageView = __webpack_require__(7);
	
	var _screenSliderView = __webpack_require__(18);
	
	var _screenSliderView2 = _interopRequireDefault(_screenSliderView);
	
	var _util = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var AlbumView = function (_ImageView) {
	  _inherits(AlbumView, _ImageView);
	
	  function AlbumView(data) {
	    _classCallCheck(this, AlbumView);
	
	    var _this = _possibleConstructorReturn(this, (AlbumView.__proto__ || Object.getPrototypeOf(AlbumView)).call(this, data));
	
	    _this.data = data;
	    _this.screenImage = document.querySelector('.screenImage');
	    // this.Slider = new ScreenSliderView(this.data);
	    // this.screenImage.appendChild(this.Slider.element);
	    return _this;
	  }
	
	  _createClass(AlbumView, [{
	    key: 'getBigImagesData',
	    value: function getBigImagesData() {
	      return this.data.map(function (item) {
	        return item.replace(/albums_min/, 'albums');
	      });
	    }
	  }, {
	    key: 'bindHandlers',
	    value: function bindHandlers() {
	      var _this2 = this;
	
	      // this.Slider = new ScreenSliderView(this.getBigImagesData());
	      // this.screenImage.appendChild(this.Slider.element);
	      this.element.addEventListener('click', function (e) {
	        _this2.Slider = new _screenSliderView2.default(_this2.getBigImagesData());
	        _this2.screenImage.appendChild(_this2.Slider.element);
	        if (e.target.src) {
	          _this2.data.forEach(function (img, i) {
	            if ((0, _util.getImageName)(img) === (0, _util.getImageName)(e.target.src)) {
	              console.log('imgonclick: ', i);
	              _this2.Slider.setImgOnClick(i);
	            }
	          });
	          _this2.screenImage.classList.add('visible');
	        }
	      });
	    }
	  }]);
	
	  return AlbumView;
	}(_imageView.ImageView);
	
	exports.default = function (data) {
	  return new AlbumView(data).element;
	};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _abstractSliderView = __webpack_require__(11);
	
	var _abstractSliderView2 = _interopRequireDefault(_abstractSliderView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ScreenSliderView = function (_AbstractSliderView) {
	  _inherits(ScreenSliderView, _AbstractSliderView);
	
	  function ScreenSliderView(data) {
	    _classCallCheck(this, ScreenSliderView);
	
	    var _this = _possibleConstructorReturn(this, (ScreenSliderView.__proto__ || Object.getPrototypeOf(ScreenSliderView)).call(this, data));
	
	    _this.screenImage = document.querySelector('.screenImage');
	    _this.closeImage = document.createElement('a');
	    return _this;
	  }
	
	  _createClass(ScreenSliderView, [{
	    key: 'getAddElement',
	    value: function getAddElement() {
	      this.closeImage.classList.add('slider__closeImage');
	      return this.closeImage;
	    }
	  }, {
	    key: 'setAddClass',
	    value: function setAddClass() {
	      return 'slider-fullScreen';
	    }
	  }, {
	    key: 'bindAddHandlers',
	    value: function bindAddHandlers() {
	      var _this2 = this;
	
	      this.closeImage.addEventListener('click', function () {
	        _this2.screenImage.classList.remove('visible');
	        _this2.images[_this2.i].classList.remove('animate');
	        _this2.arrowRight.removeEventListener('click', _this2.showNextImage.bind(_this2));
	        _this2.arrowLeft.removeEventListener('click', _this2.showPrevImage.bind(_this2));
	        _this2.screenImage.innerHTML = '';
	      });
	    }
	  }]);
	
	  return ScreenSliderView;
	}(_abstractSliderView2.default);
	
	exports.default = ScreenSliderView;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _abstractPageView = __webpack_require__(6);
	
	var _abstractPageView2 = _interopRequireDefault(_abstractPageView);
	
	var _imageView = __webpack_require__(7);
	
	var _imageView2 = _interopRequireDefault(_imageView);
	
	var _data = __webpack_require__(9);
	
	var _trustUsView = __webpack_require__(12);
	
	var _trustUsView2 = _interopRequireDefault(_trustUsView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ServicesPageView = function (_AbstractPageView) {
	  _inherits(ServicesPageView, _AbstractPageView);
	
	  function ServicesPageView() {
	    _classCallCheck(this, ServicesPageView);
	
	    var _this = _possibleConstructorReturn(this, (ServicesPageView.__proto__ || Object.getPrototypeOf(ServicesPageView)).call(this));
	
	    _this.bigTop = (0, _imageView2.default)(_data.AppData.images.servicesBigTop);
	    _this.rightTop = (0, _imageView2.default)(_data.AppData.images.servicesRightTop);
	    _this.bigBottom = (0, _imageView2.default)(_data.AppData.images.servicesBigBottom);
	    _this.rightBottom = (0, _imageView2.default)(_data.AppData.images.servicesRightBottom);
	    return _this;
	  }
	
	  _createClass(ServicesPageView, [{
	    key: 'getMarkup',
	    value: function getMarkup() {
	      return '\n    <div class="row servicesPage">\n      <div class="row__caption">\n        <div class="name">\u0423\u0441\u043B\u0443\u0433\u0438</div>\n        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>\n      </div>\n      <div class="row__content image-top">\n        <div class="slider slider-onLeft">\n          <span>\n            <img class="slider__imgSize" src="frontend/img/empty.jpg" alt="">\n          </span>\n        </div>\n      </div>\n    </div>\n    <div class="row">\n      <div class="row__caption">\n        <div class="name"></div>\n        <div class="image"><img src="frontend/img/pic-2.png" alt=""></div>\n      </div>\n      <div class="text">\n        <p class="paragraph">\n          DitzDesinge \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u0442 \u0448\u0438\u0440\u043E\u043A\u0438\u0439 \u0441\u043F\u0435\u043A\u0442\u0440 \u0443\u0441\u043B\u0443\u0433 \u043F\u043E \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0435 \u0438<br>\n          \u0438\u0437\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u044E \u0442\u0435\u043A\u0441\u0442\u0438\u043B\u044C\u043D\u044B\u0445 \u0438\u0437\u0434\u0435\u043B\u0438\u0439\n        </p>\n        <p class="paragraph">\n          \u0412 DitzDesigne \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0437\u0430\u043A\u0430\u0437\u0430\u0442\u044C:\n        </p>\n        <p class="paragraph">\n          <div class="needle needle__paragraph"></div>\n          \u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u0434\u0438\u0437\u0430\u0439\u043D\u0435\u0440\u0441\u043A\u0438\u0445 \u044D\u0441\u043A\u0438\u0437\u043E\u0432 \u0443\u043D\u0438\u0444\u043E\u0440\u043C\u044B, \u0438\u043D\u0442\u0435\u0440\u044C\u0435\u0440\u043D\u043E\u0433\u043E \u0442\u0435\u043A\u0441\u0442\u0438\u043B\u044F,<br>\n          \u0442\u0435\u043A\u0441\u0442\u0438\u043B\u044F \u0434\u043B\u044F \u0437\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0439, \u0442\u0435\u043A\u0441\u0442\u0438\u043B\u044C\u043D\u044B\u0445 \u0438\u0433\u0440\u0443\u0448\u0435\u043A\n        </p>\n        <p class="paragraph">\n          <div class="needle needle__paragraph"></div>\n          \u0423\u043D\u0438\u0444\u043E\u0440\u043C\u0443 \u0434\u043B\u044F \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u0430, \u0431\u0443\u0434\u044C \u0442\u043E \u043C\u0430\u0433\u0430\u0437\u0438\u043D, \u0440\u0435\u0441\u0442\u043E\u0440\u0430\u043D,<br>\n          \u0430\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441, \u043C\u0435\u0434\u0438\u0446\u0438\u043D\u0441\u043A\u0438\u0439 \u0446\u0435\u043D\u0442\u0440,<br>\n          \u0433\u043E\u0441\u0442\u0438\u043D\u0438\u0446\u0430, \u043E\u0431\u0449\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u0430\u044F \u0441\u0430\u0443\u043D\u0430 \u0438\u043B\u0438 \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u0441\u043F\u043E\u0440\u0442\u0441\u043C\u0435\u043D\u043E\u0432.<br>\n          \u041A\u0430\u043A \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0445 \u043C\u043E\u0434\u0435\u043B\u0435\u0439, \u0442\u0430\u043A \u0438 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u0443\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0440\u0435\u0448\u0435\u043D\u0438\u044F\n        </p>\n        <p class="paragraph">\n          <div class="needle needle__paragraph"></div>\n          \u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0437\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043D\u0430\u043D\u0435\u0441\u0435\u043D\u0438\u0435 \u0412\u0430\u0448\u0435\u0433\u043E \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u0430 \u043D\u0430 \u0444\u043E\u0440\u043C\u0443 \u0440\u0430\u0437\u043B\u0438\u0447\u043D\u043E\u0433\u043E \u0442\u0438\u043F\u0430\n        </p>\n        <p class="paragraph">\n          <div class="needle needle__paragraph"></div>\n          \u0422\u0435\u043A\u0441\u0442\u0438\u043B\u044C\u043D\u044B\u0435 \u0438\u0437\u0434\u0435\u043B\u0438\u044F \u0434\u043B\u044F \u0440\u0435\u0448\u0435\u043D\u0438\u044F \u0438\u043D\u0442\u0435\u0440\u044C\u0435\u0440\u043D\u043E\u0433\u043E \u0432\u043E\u043F\u0440\u043E\u0441\u0430-<br>\n          \u0448\u0442\u043E\u0440\u044B, \u0437\u0430\u043D\u0430\u0432\u0435\u0441\u043A\u0438, \u043C\u044F\u0433\u043A\u0438\u0435 \u043F\u043E\u0434\u0443\u0448\u043A\u0438, \u0441\u0438\u0434\u0435\u043D\u0438\u044F,<br>\n          \u043D\u0435\u043E\u0431\u044B\u0447\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442\u0438\u043B\u044C\u043D\u044B\u0439 \u0434\u0435\u043A\u043E\u0440\n        </p>\n        <p class="paragraph">\n          <div class="needle needle__paragraph"></div>\n          \u0422\u0435\u043A\u0441\u0442\u0438\u043B\u044C \u0434\u043B\u044F \u0440\u0435\u0441\u0442\u043E\u0440\u0430\u043D\u0430, \u043A\u0430\u0444\u0435, \u0433\u043E\u0441\u0442\u0438\u043D\u0438\u0446\u044B- \u0441\u0442\u043E\u043B\u043E\u0432\u044B\u0439 \u0438 \u0431\u0430\u043D\u043A\u0435\u0442\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442\u0438\u043B\u044C<br>\n          \u0441\u043A\u0430\u0442\u0435\u0440\u0442\u0438, \u0441\u0430\u043B\u0444\u0435\u0442\u043A\u0438, \u043D\u0430\u043F\u0435\u0440\u043E\u043D\u044B\n        </p>\n        <p class="paragraph">\n          <div class="needle needle__paragraph"></div>\n          \u0420\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u0442\u044C \u0434\u043B\u044F \u0412\u0430\u0441 \u0440\u0435\u043A\u043B\u0430\u043C\u043D\u0443\u044E \u043F\u0440\u043E\u0434\u0443\u043A\u0446\u0438\u044E, \u0442\u0435\u043A\u0441\u0442\u0438\u043B\u044C\u043D\u044B\u0435 \u0438\u0433\u0440\u0443\u0448\u043A\u0438\n        </p>\n        <div class="row__caption row__caption-split">\n          <div class="name"></div>\n          <div class="image"><img src="frontend/img/pic-2.png" alt=""></div>\n        </div>\n        <p class="paragraph paragraph-bottom">\n          \u0423 \u0412\u0430\u0441 \u0435\u0441\u0442\u044C \u0438\u0434\u0435\u0438 \u0434\u043B\u044F \u0442\u0435\u043A\u0441\u0442\u0438\u043B\u044F \u0412\u0430\u0448\u0435\u0433\u043E \u0437\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u044F?<br>\n          \u0412 DitzDesigne \u043F\u043E\u043C\u043E\u0433\u0443\u0442 \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u0442\u044C \u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u0438 \u0441\u043E\u0437\u0434\u0430\u0442\u044C \u0438\u0445<br>\n          \u0437\u0432\u043E\u043D\u0438\u0442\u0435, \u043F\u0438\u0448\u0438\u0442\u0435 Whatsapp +7 913 704-77-78 \u0438\u043B\u0438<br>\n          \u043D\u0430 \u043F\u043E\u0447\u0442\u0443\n          <a href="mailto:ditzdesigne@mail.ru">\n            ditzdesigne@mail.ru\n          </a>\n        </p>\n        <p class="paragraph paragraph-bottom">\n        \xAB\u041A\u0440\u0430\u0441\u0438\u0432\u0430\u044F \u043E\u0434\u0435\u0436\u0434\u0430 - \u0447\u0442\u043E \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043F\u0438\u0441\u044C\u043C\u043E\xBB<br>\n        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp\u0438\u0442\u0430\u043B\u044C\u044F\u043D\u0441\u043A\u0430\u044F \u043F\u043E\u0441\u043B\u043E\u0432\u0438\u0446\u0430\n        </p>\n      </div>\n    </div>\n    <div class="row">\n      <div class="row__content image-bottom">\n        <div class="slider slider-onLeft">\n          <span>\n            <img class="slider__imgSize" src="frontend/img/empty.jpg" alt="">\n          </span>\n        </div>\n      </div>\n    </div>\n    <div class="row row-trust"></div>\n    ';
	    }
	  }, {
	    key: 'addElements',
	    value: function addElements() {
	      // this.bigTop.classList.add('animate');
	      this.rightTop.classList.add('rightPictures');
	      // this.bigBottom.classList.add('');
	      this.rightBottom.classList.add('rightPictures');
	
	      // const element = this.element.querySelector('.row .row__content.image-top .slider');
	      // this.element.querySelector('.row .row__content.image-top').insertBefore(this.rightTop, element);
	      this.element.querySelector('.row .row__content.image-top .slider').appendChild(this.bigTop);
	      this.element.querySelector('.row .row__content.image-top').appendChild(this.rightTop);
	      this.element.querySelector('.row .row__content.image-bottom .slider').appendChild(this.bigBottom);
	      this.element.querySelector('.row .row__content.image-bottom').appendChild(this.rightBottom);
	      this.element.querySelector('.row-trust').appendChild((0, _trustUsView2.default)());
	    }
	  }]);
	
	  return ServicesPageView;
	}(_abstractPageView2.default);
	
	exports.default = function () {
	  return new ServicesPageView().element;
	};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _abstractPageView = __webpack_require__(6);
	
	var _abstractPageView2 = _interopRequireDefault(_abstractPageView);
	
	var _imageView = __webpack_require__(7);
	
	var _imageView2 = _interopRequireDefault(_imageView);
	
	var _data = __webpack_require__(9);
	
	var _trustUsView = __webpack_require__(12);
	
	var _trustUsView2 = _interopRequireDefault(_trustUsView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TechnologiesPageView = function (_AbstractPageView) {
	  _inherits(TechnologiesPageView, _AbstractPageView);
	
	  function TechnologiesPageView() {
	    _classCallCheck(this, TechnologiesPageView);
	
	    var _this = _possibleConstructorReturn(this, (TechnologiesPageView.__proto__ || Object.getPrototypeOf(TechnologiesPageView)).call(this));
	
	    _this.bigTop = (0, _imageView2.default)(_data.AppData.images.technologiesBigTop);
	    _this.rightTop = (0, _imageView2.default)(_data.AppData.images.technologiesRightTop);
	    _this.bigBottom = (0, _imageView2.default)(_data.AppData.images.technologiesBigBottom);
	    _this.rightBottom = (0, _imageView2.default)(_data.AppData.images.technologiesRightBottom);
	    return _this;
	  }
	
	  _createClass(TechnologiesPageView, [{
	    key: 'getMarkup',
	    value: function getMarkup() {
	      return '\n    <div class="row technologiesPage">\n      <div class="row__caption">\n        <div class="name">\u0422\u043A\u0430\u043D\u0438 \u0438 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438</div>\n        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>\n      </div>\n      <div class="row__content image-top">\n        <div class="slider slider-onLeft">\n          <span>\n            <img class="slider__imgSize" src="frontend/img/empty.jpg" alt="">\n          </span>\n        </div>\n      </div>\n    </div>\n    <div class="row">\n      <div class="row__caption">\n        <div class="name"></div>\n        <div class="image"><img src="frontend/img/pic-2.png" alt=""></div>\n      </div>\n      <div class="text">\n        <p class="paragraph">\n          \u0412 \u0441\u0432\u043E\u0451\u043C \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u0435 DitzDesinge \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u043E\u0432\u0435\u0440\u0435\u043D\u043D\u044B\u0435 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0442\u043A\u0430\u043D\u0438 \u0438<br>\n          \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438 \u0440\u0430\u0431\u043E\u0442\u044B \u0441 \u043D\u0438\u043C\u0438.\n        </p>\n        <p class="paragraph">\n          \u0412 DitzDesigne \u043C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C \u0441 \u0442\u0430\u043A\u0438\u043C\u0438 \u0442\u043A\u0430\u043D\u044F\u043C\u0438 \u0434\u043B\u044F \u0437\u0430\u0449\u0438\u0442\u043D\u043E\u0433\u043E, \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u043E\u0433\u043E,<br>\n          \u043C\u0435\u0434\u0438\u0446\u0438\u043D\u0441\u043A\u043E\u0433\u043E \u0438 \u0441\u0435\u0440\u0432\u0438\u0441\u043D\u043E\u0433\u043E\u0442\u0435\u043A\u0441\u0442\u0438\u043B\u044F:\n        </p>\n        <p class="paragraph">\n          <div class="needle needle__paragraph"></div>\n          Carrington Textiles Ltd\xAE (\u0412\u0435\u043B\u0438\u043A\u043E\u0431\u0440\u0438\u0442\u0430\u043D\u0438\u044F)<br>\n          \u043A\u0440\u0443\u043F\u043D\u0435\u0439\u0448\u0438\u0439 \u0435\u0432\u0440\u043E\u043F\u0435\u0439\u0441\u043A\u0438\u0439 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C \u0442\u043A\u0430\u043D\u0435\u0439 \u0434\u043B\u044F \u043F\u0440\u043E\u0444\u0435\u0441\u0441\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0447\u0435\u0439 \u0438<br>\n          \u0437\u0430\u0449\u0438\u0442\u043D\u043E\u0439 \u043E\u0434\u0435\u0436\u0434\u044B. \u041E\u0434\u0435\u0436\u0434\u0430 \u0438\u0437 \u0442\u043A\u0430\u043D\u0435\u0439 \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438 \u041A\u044D\u0440\u0440\u0438\u043D\u0433\u0442\u043E\u043D (Carrington) \u2013<br>\n          \u044D\u0442\u043E \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u0430\u044F \u0441\u043F\u0435\u0446\u043E\u0434\u0435\u0436\u0434\u0430 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0430\u044F \u0441\u0430\u043C\u044B\u043C \u0432\u044B\u0441\u043E\u043A\u0438\u043C \u0442\u0440\u0435\u0431\u043E\u0432\u0430\u043D\u0438\u044F\u043C \u0438 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u0430\u043C.\n        </p>\n        <p class="paragraph">\n          <div class="needle needle__paragraph"></div>\n          Satory\xAE<br>\n          \u0421\u043C\u0435\u0441\u043E\u0432\u044B\u0435 \u0442\u043A\u0430\u043D\u0438 \u0434\u043B\u044F \u043C\u0435\u0434\u0438\u0446\u0438\u043D\u0441\u043A\u0438\u0445 \u0438\u0437\u0434\u0435\u043B\u0438\u0439 \u0438 \u0441\u0435\u0440\u0432\u0438\u0441\u043D\u043E\u0439 \u043E\u0434\u0435\u0436\u0434\u044B \u0441 \u0442\u0432\u0438\u043B\u043E\u0432\u044B\u043C \u043F\u0435\u0440\u0435\u043F\u043B\u0435\u0442\u0435\u043D\u0438\u0435\u043C.<br>\n          \u0421\u043E\u0441\u0442\u0430\u0432: 50% \u0445\u043B\u043E\u043F\u043E\u043A, 50% \u043F\u043E\u043B\u0438\u044D\u0444\u0438\u0440.<br>\n          \u041D\u0430\u0442\u0443\u0440\u0430\u043B\u044C\u043D\u044B\u0435 \u0432\u043E\u043B\u043E\u043A\u043D\u0430 \u043F\u0440\u0438\u0434\u0430\u044E\u0442 \u0442\u043A\u0430\u043D\u0438 \u0445\u043E\u0440\u043E\u0448\u0443\u044E \u0432\u043E\u0437\u0434\u0443\u0445\u043E\u043F\u0440\u043E\u043D\u0438\u0446\u0430\u0435\u043C\u043E\u0441\u0442\u044C \u0438 \u0433\u0438\u0433\u0440\u043E\u0441\u043A\u043E\u043F\u0438\u0447\u043D\u043E\u0441\u0442\u044C.<br>\n          \u0411\u043B\u0430\u0433\u043E\u0434\u0430\u0440\u044F \u043F\u043E\u043B\u0438\u044D\u0444\u0438\u0440\u0443 \u0432 \u0441\u043E\u0441\u0442\u0430\u0432\u0435, \u0442\u043A\u0430\u043D\u044C Satory\xAE \u0438\u0437\u043D\u043E\u0441\u043E\u0441\u0442\u043E\u0439\u043A\u0430\u044F \u0438 \u0444\u043E\u0440\u043C\u043E\u0443\u0441\u0442\u043E\u0439\u0447\u0438\u0432\u0430.\n        </p>\n        <div class="row__caption row__caption-split">\n          <div class="name"></div>\n          <div class="image"><img src="frontend/img/pic-2.png" alt=""></div>\n        </div>\n        <p class="paragraph">\n          \u041B\u043E\u0433\u043E\u0442\u0438\u043F \u043D\u0430 \u0444\u043E\u0440\u043C\u0435\u043D\u043D\u043E\u0439 \u043E\u0434\u0435\u0436\u0434\u0435 \u0438\u043B\u0438 \u043D\u0430 \u0438\u043D\u0442\u0435\u0440\u044C\u0435\u0440\u043D\u043E\u043C \u0442\u0435\u043A\u0441\u0442\u0438\u043B\u0435 -<br>\n          \u044D\u0442\u043E \u0412\u0430\u0448 \u0444\u0438\u0440\u043C\u0435\u043D\u043D\u044B\u0439 \u0441\u0442\u0438\u043B\u044C \u0438 \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u043D\u043E\u0441\u0442\u0438 \u043A \u043A\u043E\u043C\u043F\u0430\u043D\u0438\u0438,<br>\n          \u043D\u043E \u0438 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0440\u0435\u043A\u043B\u0430\u043C\u0430 \u043F\u0435\u0440\u0435\u0434 \u0433\u043B\u0430\u0437\u0430\u043C\u0438 \u043B\u044E\u0434\u0435\u0439.<br>\n          \u0412 DitzDesigne \u0435\u0441\u0442\u044C \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0439 \u043D\u0430\u043D\u0435\u0441\u0435\u043D\u0438\u044F \u0412\u0430\u0448\u0435\u0433\u043E \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u0430 \u043D\u0430 \u0443\u043D\u0438\u0444\u043E\u0440\u043C\u0443:\n        </p>\n        <p class="paragraph">\n          <div class="needle needle__paragraph"></div>\n          \u0428\u0435\u043B\u043A\u043E\u0433\u0440\u0430\u0444\u0438\u044F<br>\n          \u041F\u0440\u0438 \u044D\u0442\u043E\u043C \u043B\u043E\u0433\u043E\u0442\u0438\u043F \u043D\u0430\u043D\u043E\u0441\u0438\u0442\u0441\u044F \u043F\u0440\u044F\u043C\u043E \u043D\u0430 \u0442\u043A\u0430\u043D\u044C \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0439 \u0441\u0435\u0442\u043A\u0438.<br>\n          \u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430 \u043C\u0435\u0442\u043E\u0434\u0430: \u0434\u043E\u043B\u0433\u043E\u0432\u0435\u0447\u043D\u043E\u0441\u0442\u044C, \u043A\u0440\u0430\u0441\u043E\u0447\u043D\u043E\u0441\u0442\u044C.<br>\n          \u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043A\u0438: \u0434\u043E\u0440\u043E\u0433\u043E\u0432\u0438\u0437\u043D\u0430 \u043F\u0440\u0438 \u043C\u0430\u043B\u044B\u0445 \u043F\u0430\u0440\u0442\u0438\u044F\u0445.\n        </p>\n        <p class="paragraph">\n          <div class="needle needle__paragraph"></div>\n          \u0422\u0440\u0430\u043D\u0441\u0444\u0435\u0440<br>\n          \u041F\u0440\u0438 \u0442\u0430\u043A\u043E\u043C \u043C\u0435\u0442\u043E\u0434\u0435 \u043D\u0430\u043D\u0435\u0441\u0435\u043D\u0438\u044F \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u0430 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043F\u0435\u0447\u0430\u0442\u0430\u044E\u0442 \u043D\u0430 \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0439 \u0431\u0443\u043C\u0430\u0433\u0435 \u0438<br>\n          \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u044F\u0442 \u043D\u0430 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u0443\u044E \u043F\u043E\u0432\u0435\u0440\u0445\u043D\u043E\u0441\u0442\u044C (\u0442\u0435\u0440\u043C\u043E\u043F\u0435\u0440\u0435\u043D\u043E\u0441).<br>\n          \u041F\u0440\u0435\u0438\u043C\u0443\u0449\u0435\u0441\u0442\u0432\u0430: \u043E\u0447\u0435\u043D\u044C \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u0430\u044F \u043A\u0430\u0440\u0442\u0438\u043D\u043A\u0430, \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u043D\u0430\u043D\u0435\u0441\u0435\u043D\u0438\u0435 \u043D\u0430 \u043B\u044E\u0431\u043E\u0435 \u043C\u0435\u0441\u0442\u043E.<br>\n          \u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043A\u0438: \u0441\u043B\u043E\u0436\u043D\u043E\u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C\u044B\u0439 \u043F\u0440\u043E\u0446\u0435\u0441\u0441,<br>\n          \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043C\u043E\u0436\u0435\u0442 \u043F\u0440\u0438\u0432\u0435\u0441\u0442\u0438 \u043A \u043D\u0435\u043F\u043E\u043B\u043D\u043E\u043C\u0443 \u0441\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u044E \u0446\u0432\u0435\u0442\u043E\u0432.\n        </p>\n        <p class="paragraph">\n          <div class="needle needle__paragraph"></div>\n          \u0412\u044B\u0448\u0438\u0432\u043A\u0430<br>\n          \u041D\u0430\u0438\u0431\u043E\u043B\u0435\u0435 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0439 \u0438 \u043E\u043F\u0442\u0438\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u043F\u043E\u0441\u043E\u0431 \u043D\u0430\u043D\u0435\u0441\u0435\u043D\u0438\u044F \u043B\u043E\u0433\u043E\u0442\u0438\u043F\u0430.<br>\n          \u0414\u043E\u0441\u0442\u043E\u0438\u043D\u0441\u0442\u0432\u0430: \u0434\u043E\u043B\u0433\u043E\u0432\u0435\u0447\u043D\u043E\u0441\u0442\u044C, \u043D\u0430\u0434\u0435\u0436\u043D\u043E\u0441\u0442\u044C, \u043A\u0440\u0430\u0441\u043E\u0447\u043D\u043E\u0441\u0442\u044C, \u043F\u0440\u0435\u0441\u0442\u0438\u0436.<br>\n          \u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043A\u0438: \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u043C \u043D\u0435 \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u0442\u043A\u0430\u043D\u0435\u0439.\n        </p>\n        <div class="row__caption row__caption-split">\n          <div class="name"></div>\n          <div class="image"><img src="frontend/img/pic-2.png" alt=""></div>\n        </div>\n        <p class="paragraph paragraph-bottom">\n          \u0414\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0433\u043E \u043F\u0440\u043E\u0435\u043A\u0442\u0430 \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u0441\u0432\u043E\u0439 \u0442\u0438\u043F \u0442\u043A\u0430\u043D\u0438 \u0438 \u0442\u0435\u0445\u043D\u043E\u043B\u043E\u0433\u0438\u0438<br>\n          \u0441\u043F\u0435\u0446\u0438\u0430\u043B\u0438\u0441\u0442\u044B DitzDesigne \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E \u043F\u043E\u0434\u0441\u043A\u0430\u0436\u0443\u0442 \u0412\u0430\u043C \u043B\u0443\u0447\u0448\u0438\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442.<br>\n          \u0417\u0432\u043E\u043D\u0438\u0442\u0435, \u043F\u0438\u0448\u0438\u0442\u0435 Whatsapp +7 913 704-77-78 \u0438\u043B\u0438<br>\n          \u043D\u0430 \u043F\u043E\u0447\u0442\u0443\n          <a href="mailto:ditzdesigne@mail.ru">\n            ditzdesigne@mail.ru\n          </a>\n        </p>\n        <p class="paragraph paragraph-bottom paragraph-right">\n          \xAB\u041A\u043E\u0433\u0434\u0430 \u0432 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0435 \u0442\u0435\u0431\u044F \u0432\u0441\u0442\u0440\u0435\u0447\u0430\u0435\u0442 \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A<br>\n          \u0432 \u0431\u0435\u0437\u0443\u043F\u0440\u0435\u0447\u043D\u043E\u0439 \u0443\u043D\u0438\u0444\u043E\u0440\u043C\u0435,<br>\n          \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043D\u043E\u0439 \u0432 \u0444\u0438\u0440\u043C\u0435\u043D\u043D\u043E\u043C \u0441\u0442\u0438\u043B\u0435 \u0441\u0435\u0442\u0438,<br>\n          \u0442\u043E \u043F\u043E\u043D\u0438\u043C\u0430\u0435\u0448\u044C, \u0447\u0442\u043E \u044D\u0442\u043E \u0438 \u0435\u0441\u0442\u044C \u0442\u043E\u0442<br>\n          \u043D\u0435\u043D\u0430\u0432\u044F\u0437\u0447\u0438\u0432\u044B\u0439 \u0431\u0435\u0437\u0443\u043F\u0440\u0435\u0447\u043D\u044B\u0439 \u0441\u0435\u0440\u0432\u0438\u0441 \u0438 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E\xBB\n        </p>\n      </div>\n    </div>\n    <div class="row">\n      <div class="row__content image-bottom">\n        <div class="slider slider-onLeft">\n          <span>\n            <img class="slider__imgSize" src="frontend/img/empty.jpg" alt="">\n          </span>\n        </div>\n      </div>\n    </div>\n    <div class="row row-trust"></div>\n    ';
	    }
	  }, {
	    key: 'addElements',
	    value: function addElements() {
	      // this.bigTop.classList.add('animate');
	      this.rightTop.classList.add('rightPictures');
	      // this.bigBottom.classList.add('');
	      this.rightBottom.classList.add('rightPictures');
	
	      // const element = this.element.querySelector('.row .row__content.image-top .slider');
	      // this.element.querySelector('.row .row__content.image-top').insertBefore(this.rightTop, element);
	      this.element.querySelector('.row .row__content.image-top .slider').appendChild(this.bigTop);
	      this.element.querySelector('.row .row__content.image-top').appendChild(this.rightTop);
	      this.element.querySelector('.row .row__content.image-bottom .slider').appendChild(this.bigBottom);
	      this.element.querySelector('.row .row__content.image-bottom').appendChild(this.rightBottom);
	      this.element.querySelector('.row-trust').appendChild((0, _trustUsView2.default)());
	    }
	  }]);
	
	  return TechnologiesPageView;
	}(_abstractPageView2.default);
	
	exports.default = function () {
	  return new TechnologiesPageView().element;
	};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _abstractPageView = __webpack_require__(6);
	
	var _abstractPageView2 = _interopRequireDefault(_abstractPageView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ContactsPageView = function (_AbstractPageView) {
	  _inherits(ContactsPageView, _AbstractPageView);
	
	  function ContactsPageView() {
	    _classCallCheck(this, ContactsPageView);
	
	    var _this = _possibleConstructorReturn(this, (ContactsPageView.__proto__ || Object.getPrototypeOf(ContactsPageView)).call(this));
	
	    _this.head = document.querySelector('head');
	    return _this;
	  }
	
	  _createClass(ContactsPageView, [{
	    key: 'getMarkup',
	    value: function getMarkup() {
	      return '\n    <div class="row contactsPage">\n      <div class="row__caption">\n        <div class="name">\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B</div>\n        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>\n      </div>\n      <div id="contacts"></div>\n      <div class="text">\n        <div class="row__caption row__caption-split">\n          <div class="name"></div>\n          <div class="image"><img src="frontend/img/pic-2.png" alt=""></div>\n        </div>\n        <p class="paragraph paragraph-bottom paragraph-left">\n          \u041F\u043E \u0432\u0441\u0435\u043C \u0432\u043E\u043F\u0440\u043E\u0441\u0430\u043C \u0437\u0432\u043E\u043D\u0438\u0442\u0435, \u043F\u0438\u0448\u0438\u0442\u0435 Whatsapp +7 913 704-77-78<br>\n          \u0438\u043B\u0438 \u043D\u0430 \u043F\u043E\u0447\u0442\u0443\n          <a href="mailto:ditzdesigne@mail.ru">\n            ditzdesigne@mail.ru\n          </a>\n        </p>\n      </div>\n    </div>';
	    }
	  }, {
	    key: 'bindHandlers',
	    value: function bindHandlers() {
	      var oldScript = document.querySelector('head script');
	      if (oldScript) {
	        this.head.removeChild(oldScript);
	      }
	      var script = document.createElement('script');
	      script.type = 'text/javascript';
	      script.charset = 'utf-8';
	      script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A9d921e30fe6335c9e8fd994117785845e3e28e4a3a82ff7b268c2e213e296d4b&amp;height=380&amp;id=contacts';
	      this.head.appendChild(script);
	    }
	  }]);
	
	  return ContactsPageView;
	}(_abstractPageView2.default);
	
	exports.default = function () {
	  return new ContactsPageView().element;
	};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _abstractPageView = __webpack_require__(6);
	
	var _abstractPageView2 = _interopRequireDefault(_abstractPageView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var BestsellerPageView = function (_AbstractPageView) {
	  _inherits(BestsellerPageView, _AbstractPageView);
	
	  function BestsellerPageView() {
	    _classCallCheck(this, BestsellerPageView);
	
	    return _possibleConstructorReturn(this, (BestsellerPageView.__proto__ || Object.getPrototypeOf(BestsellerPageView)).apply(this, arguments));
	  }
	
	  _createClass(BestsellerPageView, [{
	    key: 'getMarkup',
	    value: function getMarkup() {
	      return '<div class="row bestsellerPage">\n      <div class="row__caption">\n        <div class="name">\u0425\u0438\u0442 \u043F\u0440\u043E\u0434\u0430\u0436</div>\n        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>\n      </div>\n    </div>';
	    }
	  }]);
	
	  return BestsellerPageView;
	}(_abstractPageView2.default);
	
	exports.default = function () {
	  return new BestsellerPageView().element;
	};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _abstractPageView = __webpack_require__(6);
	
	var _abstractPageView2 = _interopRequireDefault(_abstractPageView);
	
	var _albumView = __webpack_require__(17);
	
	var _albumView2 = _interopRequireDefault(_albumView);
	
	var _data = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var InterTextilePageView = function (_AbstractPageView) {
	  _inherits(InterTextilePageView, _AbstractPageView);
	
	  function InterTextilePageView() {
	    _classCallCheck(this, InterTextilePageView);
	
	    return _possibleConstructorReturn(this, (InterTextilePageView.__proto__ || Object.getPrototypeOf(InterTextilePageView)).apply(this, arguments));
	  }
	
	  _createClass(InterTextilePageView, [{
	    key: 'getMarkup',
	    value: function getMarkup() {
	      return '\n      <div class="row interTextilePage">\n        <div class="row__caption">\n          <div class="name">\u0418\u043D\u0442\u0435\u0440\u044C\u0435\u0440\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442\u0438\u043B\u044C</div>\n          <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>\n        </div>\n        <div class="row__image row__image-album">\n        </div>\n      </div>\n    ';
	    }
	  }, {
	    key: 'addElements',
	    value: function addElements() {
	      this.element.querySelector('.row__image').appendChild((0, _albumView2.default)(_data.AppData.albums.interTextil));
	    }
	  }]);
	
	  return InterTextilePageView;
	}(_abstractPageView2.default);
	
	exports.default = function () {
	  return new InterTextilePageView().element;
	};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _abstractPageView = __webpack_require__(6);
	
	var _abstractPageView2 = _interopRequireDefault(_abstractPageView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SharesPageView = function (_AbstractPageView) {
	  _inherits(SharesPageView, _AbstractPageView);
	
	  function SharesPageView() {
	    _classCallCheck(this, SharesPageView);
	
	    return _possibleConstructorReturn(this, (SharesPageView.__proto__ || Object.getPrototypeOf(SharesPageView)).apply(this, arguments));
	  }
	
	  _createClass(SharesPageView, [{
	    key: 'getMarkup',
	    value: function getMarkup() {
	      return '<div class="row sharesPage">\n      <div class="row__caption">\n        <div class="name">\u0410\u043A\u0446\u0438\u0438</div>\n        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>\n      </div>\n    </div>';
	    }
	  }]);
	
	  return SharesPageView;
	}(_abstractPageView2.default);
	
	exports.default = function () {
	  return new SharesPageView().element;
	};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _abstractPageView = __webpack_require__(6);
	
	var _abstractPageView2 = _interopRequireDefault(_abstractPageView);
	
	var _albumView = __webpack_require__(17);
	
	var _albumView2 = _interopRequireDefault(_albumView);
	
	var _data = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TextileForRestPageView = function (_AbstractPageView) {
	  _inherits(TextileForRestPageView, _AbstractPageView);
	
	  function TextileForRestPageView() {
	    _classCallCheck(this, TextileForRestPageView);
	
	    return _possibleConstructorReturn(this, (TextileForRestPageView.__proto__ || Object.getPrototypeOf(TextileForRestPageView)).apply(this, arguments));
	  }
	
	  _createClass(TextileForRestPageView, [{
	    key: 'getMarkup',
	    value: function getMarkup() {
	      return '<div class="row textileForRestPage">\n      <div class="row__caption">\n        <div class="name">\u0422\u0435\u043A\u0441\u0442\u0438\u043B\u044C \u0434\u043B\u044F \u0440\u0435\u0441\u0442\u043E\u0440\u0430\u043D\u043E\u0432</div>\n        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>\n      </div>\n      <div class="row__image row__image-album">\n      </div>\n    </div>';
	    }
	  }, {
	    key: 'addElements',
	    value: function addElements() {
	      this.element.querySelector('.row__image').appendChild((0, _albumView2.default)(_data.AppData.albums.textileForRest));
	    }
	  }]);
	
	  return TextileForRestPageView;
	}(_abstractPageView2.default);
	
	exports.default = function () {
	  return new TextileForRestPageView().element;
	};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _abstractPageView = __webpack_require__(6);
	
	var _abstractPageView2 = _interopRequireDefault(_abstractPageView);
	
	var _albumView = __webpack_require__(17);
	
	var _albumView2 = _interopRequireDefault(_albumView);
	
	var _data = __webpack_require__(9);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var UniformsPageView = function (_AbstractPageView) {
	  _inherits(UniformsPageView, _AbstractPageView);
	
	  function UniformsPageView() {
	    _classCallCheck(this, UniformsPageView);
	
	    return _possibleConstructorReturn(this, (UniformsPageView.__proto__ || Object.getPrototypeOf(UniformsPageView)).apply(this, arguments));
	  }
	
	  _createClass(UniformsPageView, [{
	    key: 'getMarkup',
	    value: function getMarkup() {
	      return '<div class="row uniformsPage">\n      <div class="row__caption">\n        <div class="name">\u0418\u0437\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0443\u043D\u0438\u0444\u043E\u0440\u043C\u044B \u043D\u0430 \u0437\u0430\u043A\u0430\u0437</div>\n        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>\n      </div>\n      <div class="row__image row__image-album">\n      </div>\n    </div>';
	    }
	  }, {
	    key: 'addElements',
	    value: function addElements() {
	      this.element.querySelector('.row__image').appendChild((0, _albumView2.default)(_data.AppData.albums.uniforms));
	    }
	  }]);
	
	  return UniformsPageView;
	}(_abstractPageView2.default);
	
	exports.default = function () {
	  return new UniformsPageView().element;
	};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _abstractPageView = __webpack_require__(6);
	
	var _abstractPageView2 = _interopRequireDefault(_abstractPageView);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ErrorPageView = function (_AbstractPageView) {
	  _inherits(ErrorPageView, _AbstractPageView);
	
	  function ErrorPageView() {
	    _classCallCheck(this, ErrorPageView);
	
	    return _possibleConstructorReturn(this, (ErrorPageView.__proto__ || Object.getPrototypeOf(ErrorPageView)).apply(this, arguments));
	  }
	
	  _createClass(ErrorPageView, [{
	    key: 'getMarkup',
	    value: function getMarkup() {
	      return '<div class="row errorPage">\n      <div class="row__caption">\n        <div class="name">\u0422\u0430\u043A\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442</div>\n        <div class="image"><img src="frontend/img/pic-1.png" alt=""></div>\n      </div>\n    </div>';
	    }
	  }]);
	
	  return ErrorPageView;
	}(_abstractPageView2.default);
	
	exports.default = function () {
	  return new ErrorPageView().element;
	};

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map