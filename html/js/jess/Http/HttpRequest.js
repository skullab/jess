define(["require", "exports", './HttpResponse'], function (require, exports, HttpResponse_1) {
    "use strict";
    var HttpRequest = (function () {
        function HttpRequest() {
            this._requests = [];
            this._bypassCache = false;
            this._async = true;
            this._responseType = "text";
            this._timeout = 0;
            this._globalTimeout = 0;
            this._credentials = false;
            this._listeners = Object.create({});
            this._params = Object.create({});
            this.reset();
        }
        HttpRequest.prototype.setTag = function (tag) {
            this.getRawRequest()['tag'] = tag;
        };
        /**
         * @deprecated
         */
        HttpRequest.prototype.getTag = function () {
            return this.getRawRequest()['tag'];
        };
        HttpRequest.prototype.getRawRequest = function (index) {
            index = index || this._requests.length - 1;
            return this._requests[index];
        };
        HttpRequest.prototype.getRawRequestArray = function () {
            return this._requests;
        };
        HttpRequest.prototype.setParams = function (params) {
            this._params = params;
        };
        HttpRequest.prototype.getParams = function () {
            return this._params;
        };
        HttpRequest.prototype.getParam = function (name) {
            return this._params[name];
        };
        HttpRequest.prototype.appendParam = function (name, value) {
            this._params[name] = value;
        };
        HttpRequest.prototype.onreadystatechange = function (callback) {
            this._onreadystatechangeCallback = callback;
        };
        HttpRequest.prototype.abort = function () {
            this.getRawRequest().abort();
        };
        /**
         * @deprecated
         */
        HttpRequest.prototype.getAllResponseHeaders = function () {
            return this.getRawRequest().getAllResponseHeaders();
        };
        /**
         * @deprecated
         */
        HttpRequest.prototype.getResponseHeader = function (name) {
            return this.getRawRequest().getResponseHeader(name);
        };
        HttpRequest.prototype.overrideMimeType = function (mimeType) {
            this.getRawRequest().overrideMimeType(mimeType);
        };
        HttpRequest.prototype.setRequestHeader = function (header, value) {
            this.getRawRequest().setRequestHeader(header, value);
        };
        HttpRequest.prototype.setUrl = function (url) {
            this._url = url;
        };
        HttpRequest.prototype.getUrl = function () {
            return this._url;
        };
        HttpRequest.prototype.setData = function (data) {
            this._data = data;
        };
        HttpRequest.prototype.getData = function () {
            return this._data;
        };
        HttpRequest.prototype.setUsername = function (username) {
            this._username = username;
        };
        HttpRequest.prototype.getUsername = function () {
            return this._username;
        };
        HttpRequest.prototype.setPassword = function (password) {
            this._password = password;
        };
        HttpRequest.prototype.getPassword = function () {
            return this._password;
        };
        HttpRequest.prototype.setMethod = function (method) {
            this._method = method.toUpperCase();
        };
        HttpRequest.prototype.getMethod = function () {
            return this._method;
        };
        HttpRequest.prototype.setResponseType = function (responseType) {
            this._responseType = responseType;
        };
        HttpRequest.prototype.getResponseType = function () {
            return this._responseType;
        };
        /**
         * @deprecated
         */
        HttpRequest.prototype.readyState = function () {
            return this.getRawRequest().readyState;
        };
        HttpRequest.prototype.bypassCache = function (bypass) {
            this._bypassCache = bypass;
        };
        /**
         * @deprecated
         */
        HttpRequest.prototype.isUnset = function () {
            return this.readyState() == HttpRequest.STATE_UNSENT;
        };
        /**
         * @deprecated
         */
        HttpRequest.prototype.isOpened = function () {
            return this.readyState() == HttpRequest.STATE_OPENED;
        };
        /**
         * @deprecated
         */
        HttpRequest.prototype.isHeadersReceived = function () {
            return this.readyState() == HttpRequest.STATE_HEADERS_RECEIVED;
        };
        /**
         * @deprecated
         */
        HttpRequest.prototype.isLoading = function () {
            return this.readyState() == HttpRequest.STATE_LOADING;
        };
        /**
         * @deprecated
         */
        HttpRequest.prototype.isDone = function () {
            return this.readyState() == HttpRequest.STATE_DONE;
        };
        HttpRequest.prototype.beforeOpen = function (method, url, async, user, password) {
            if (async === void 0) { async = true; }
            if (user === void 0) { user = null; }
            if (password === void 0) { password = null; }
            this.setMethod(method);
            switch (this.getMethod()) {
                case HttpRequest.HEAD:
                case HttpRequest.GET:
                    var _p = this.getData() || this._encodeParams();
                    if (_p.length > 0) {
                        url += '?' + _p;
                    }
                    break;
            }
            if (this._bypassCache) {
                url += ((/\?/).test(url) ? "&" : "?") + 'timestamp=' + (new Date()).getTime();
            }
            this.setUrl(url);
            this.setAsync(async);
            this.setUsername(user);
            this.setPassword(password);
            var _r = this.getRawRequest();
            if (typeof this._onreadystatechangeCallback === 'function') {
                _r.addEventListener('readystatechange', this._onreadystatechangeCallback, false);
            }
            this._resetListener();
        };
        HttpRequest.prototype.open = function (method, url, async, user, password) {
            if (async === void 0) { async = true; }
            if (user === void 0) { user = null; }
            if (password === void 0) { password = null; }
            this.beforeOpen(method, url, async, user, password);
            this.getRawRequest().open(this.getMethod(), this.getUrl(), this.isAsync(), this.getUsername(), this.getPassword());
            this.afterOpen();
        };
        HttpRequest.prototype.afterOpen = function () {
        };
        //*************************************************************************************
        HttpRequest.prototype.get = function (url, async, user, password) {
            if (async === void 0) { async = true; }
            if (user === void 0) { user = null; }
            if (password === void 0) { password = null; }
            this.open(HttpRequest.GET, url, async, user, password);
            return this.send(null);
        };
        HttpRequest.prototype.post = function (url, async, user, password) {
            if (async === void 0) { async = true; }
            if (user === void 0) { user = null; }
            if (password === void 0) { password = null; }
            this.open(HttpRequest.POST, url, async, user, password);
            this.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            return this.send(this.getData());
        };
        HttpRequest.prototype.head = function (url, async, user, password) {
            if (async === void 0) { async = true; }
            if (user === void 0) { user = null; }
            if (password === void 0) { password = null; }
            this.open(HttpRequest.HEAD, url, async, user, password);
            return this.send(null);
        };
        HttpRequest.prototype.put = function (url, async, user, password) {
            if (async === void 0) { async = true; }
            if (user === void 0) { user = null; }
            if (password === void 0) { password = null; }
            this.open(HttpRequest.PUT, url, async, user, password);
            return this.send(this.getData());
        };
        HttpRequest.prototype.delete = function (url, async, user, password) {
            if (async === void 0) { async = true; }
            if (user === void 0) { user = null; }
            if (password === void 0) { password = null; }
            this.open(HttpRequest.DELETE, url, async, user, password);
            return this.send(this.getData());
        };
        HttpRequest.prototype.trace = function (url, async, user, password) {
            if (async === void 0) { async = true; }
            if (user === void 0) { user = null; }
            if (password === void 0) { password = null; }
            this.open(HttpRequest.TRACE, url, async, user, password);
            return this.send(this.getData());
        };
        HttpRequest.prototype.connect = function (url, async, user, password) {
            if (async === void 0) { async = true; }
            if (user === void 0) { user = null; }
            if (password === void 0) { password = null; }
            this.open(HttpRequest.CONNECT, url, async, user, password);
            return this.send(this.getData());
        };
        HttpRequest.prototype.patch = function (url, async, user, password) {
            if (async === void 0) { async = true; }
            if (user === void 0) { user = null; }
            if (password === void 0) { password = null; }
            this.open(HttpRequest.PATCH, url, async, user, password);
            return this.send(this.getData());
        };
        HttpRequest.prototype.options = function (url, async, user, password) {
            if (async === void 0) { async = true; }
            if (user === void 0) { user = null; }
            if (password === void 0) { password = null; }
            this.open(HttpRequest.OPTIONS, url, async, user, password);
            return this.send(this.getData());
        };
        //*************************************************************************************
        /**
         * @deprecated
         */
        HttpRequest.prototype.getResponse = function () {
            return this.getRawRequest().response;
        };
        /**
         * @deprecated
         */
        HttpRequest.prototype.getResponseText = function () {
            return this.getRawRequest().responseText;
        };
        /**
         * @deprecated
         */
        HttpRequest.prototype.getResponseUrl = function () {
            return this.getRawRequest()['responseURL'];
        };
        /**
         * @deprecated
         */
        HttpRequest.prototype.getResponseXml = function () {
            return this.getRawRequest().responseXML;
        };
        /**
         * @deprecated
         */
        HttpRequest.prototype.getStatus = function () {
            return this.getRawRequest().status;
        };
        /**
         * @deprecated
         */
        HttpRequest.prototype.getStatusText = function () {
            return this.getRawRequest().statusText;
        };
        HttpRequest.prototype.setTimeout = function (timeout) {
            this._timeout = timeout;
        };
        HttpRequest.prototype.getTimeout = function () {
            return this._timeout;
        };
        HttpRequest.prototype.setGlobalTimeout = function (timeout) {
            this._globalTimeout = timeout;
        };
        HttpRequest.prototype.getGlobalTimeout = function () {
            return this._globalTimeout;
        };
        /**
         * @deprecated
         */
        HttpRequest.prototype.getUpload = function () {
            return this.getRawRequest().upload;
        };
        HttpRequest.prototype.setCredentials = function (credentials) {
            this._credentials = credentials;
        };
        HttpRequest.prototype.getCredentials = function () {
            return this._credentials;
        };
        HttpRequest.prototype._fixedEncodeURIComponent = function (str) {
            return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
                return '%' + c.charCodeAt(0).toString(16);
            });
        };
        HttpRequest.prototype._encodeParams = function () {
            var params = this.getParams();
            var _encoded = '';
            for (var name_1 in params) {
                if (params.hasOwnProperty(name_1)) {
                    if (_encoded.length > 0) {
                        _encoded += '&';
                    }
                    _encoded += name_1 + '=' + this._fixedEncodeURIComponent(params[name_1]);
                }
            }
            return _encoded;
        };
        HttpRequest.prototype.beforeSend = function (data) {
            data = data || this.getData() || this._encodeParams();
            if (this.isAsync()) {
                this.getRawRequest().responseType = this.getResponseType();
                this.getRawRequest().timeout = this.getTimeout() || this.getGlobalTimeout();
                if (this.isCorsEnabled()) {
                    this.getRawRequest().withCredentials = this.getCredentials();
                }
            }
            return data;
        };
        HttpRequest.prototype.send = function (data) {
            if (data === void 0) { data = null; }
            var _d = this.beforeSend(data);
            var _r = this.getRawRequest();
            _r.send(_d);
            return this.afterSend(_r);
        };
        HttpRequest.prototype.afterSend = function (request) {
            this.reset();
            return request;
        };
        HttpRequest.prototype.setHttpListener = function (name, listener, once) {
            if (once === void 0) { once = false; }
            this._listeners[name] = { 'listener': listener, 'once': once, 'consumed': false };
        };
        HttpRequest.prototype.getHttpListener = function (name) {
            if (this._listeners.hasOwnProperty(name)) {
                return this._listeners[name].listener;
            }
            return null;
        };
        HttpRequest.prototype.removeHttpListener = function (name) {
            if (this._listeners.hasOwnProperty(name)) {
                delete this._listeners[name];
            }
        };
        HttpRequest.prototype.setAsync = function (async) {
            this._async = async;
        };
        HttpRequest.prototype.isAsync = function () {
            return this._async;
        };
        HttpRequest.prototype.isCorsEnabled = function () {
            return this.getRawRequest().withCredentials !== undefined;
        };
        HttpRequest.prototype.sendBeacon = function (url, data) {
            //navigator.sendBeacon(url,data);
        };
        HttpRequest.prototype.reset = function () {
            this._requests.push(new XMLHttpRequest());
            this.setTimeout(0);
        };
        HttpRequest.prototype._resetListener = function () {
            var _r = this.getRawRequest();
            var _this = this;
            var _loop_1 = function(n) {
                if (this_1._listeners.hasOwnProperty(n)) {
                    _r.addEventListener('timeout', function (e) {
                        if (_this._listeners[n].once && _this._listeners[n].consumed)
                            return;
                        _this._listeners[n].listener.onTimeout(e, new HttpResponse_1.HttpResponse(this, n));
                    }, false);
                    _r.addEventListener('abort', function (e) {
                        if (_this._listeners[n].once && _this._listeners[n].consumed)
                            return;
                        _this._listeners[n].listener.onAbort(e, new HttpResponse_1.HttpResponse(this, n));
                    }, false);
                    _r.addEventListener('error', function (e) {
                        if (_this._listeners[n].once && _this._listeners[n].consumed)
                            return;
                        _this._listeners[n].listener.onError(e, new HttpResponse_1.HttpResponse(this, n));
                    }, false);
                    _r.addEventListener('loadstart', function (e) {
                        if (_this._listeners[n].once && _this._listeners[n].consumed)
                            return;
                        //_this._listeners[n].consumed = false;
                        _this._listeners[n].listener.onLoadStart(e, new HttpResponse_1.HttpResponse(this, n));
                    }, false);
                    _r.addEventListener('progress', function (e) {
                        if (_this._listeners[n].once && _this._listeners[n].consumed)
                            return;
                        _this._listeners[n].listener.onProgress(e, new HttpResponse_1.HttpResponse(this, n));
                    }, false);
                    _r.addEventListener('load', function (e) {
                        if (_this._listeners[n].once && _this._listeners[n].consumed)
                            return;
                        _this._listeners[n].listener.onLoad(e, new HttpResponse_1.HttpResponse(this, n));
                    }, false);
                    _r.addEventListener('loadend', function (e) {
                        if (_this._listeners[n].once && _this._listeners[n].consumed)
                            return;
                        _this._listeners[n].listener.onLoadEnd(e, new HttpResponse_1.HttpResponse(this, n));
                        _this._listeners[n].consumed = true;
                    }, false);
                }
            };
            var this_1 = this;
            for (var n in this._listeners) {
                _loop_1(n);
            }
        };
        HttpRequest.OPTIONS = 'OPTIONS';
        HttpRequest.GET = 'GET';
        HttpRequest.HEAD = 'HEAD';
        HttpRequest.POST = 'POST';
        HttpRequest.PUT = 'PUT';
        HttpRequest.DELETE = 'DELETE';
        HttpRequest.TRACE = 'TRACE';
        HttpRequest.CONNECT = 'CONNECT';
        HttpRequest.PATCH = 'PATCH';
        /**
         * @deprecated
         */
        HttpRequest.RESPONSE_ARRAY_BUFFER = "arraybuffer";
        /**
         * @deprecated
         */
        HttpRequest.RESPONSE_BLOB = "blob";
        /**
         * @deprecated
         */
        HttpRequest.RESPONSE_DOCUMENT = "document";
        /**
         * @deprecated
         */
        HttpRequest.RESPONSE_JSON = "json";
        /**
         * @deprecated
         */
        HttpRequest.RESPONSE_TEXT = "text";
        HttpRequest.STATE_UNSENT = 0;
        HttpRequest.STATE_OPENED = 1;
        HttpRequest.STATE_HEADERS_RECEIVED = 2;
        HttpRequest.STATE_LOADING = 3;
        HttpRequest.STATE_DONE = 4;
        return HttpRequest;
    }());
    exports.HttpRequest = HttpRequest;
});
