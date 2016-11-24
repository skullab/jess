define(["require", "exports"], function (require, exports) {
    "use strict";
    var HttpRequest = (function () {
        function HttpRequest() {
            this._bypassCache = false;
            this._async = true;
            this._responseType = "";
            this._timeout = 0;
            this._credentials = false;
            this._listenerInit = false;
            this._request = new XMLHttpRequest();
        }
        HttpRequest.prototype.onreadystatechange = function (callback) {
            this._request.onreadystatechange = callback;
        };
        HttpRequest.prototype.abort = function () {
            this._request.abort();
        };
        HttpRequest.prototype.getAllResponseHeaders = function () {
            return this._request.getAllResponseHeaders();
        };
        HttpRequest.prototype.getResponseHeader = function (name) {
            return this._request.getResponseHeader(name);
        };
        HttpRequest.prototype.overrideMimeType = function (mimeType) {
            this._request.overrideMimeType(mimeType);
        };
        HttpRequest.prototype.setRequestHeader = function (header, value) {
            this._request.setRequestHeader(header, value);
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
        HttpRequest.prototype.readyState = function () {
            return this._request.readyState;
        };
        HttpRequest.prototype.bypassCache = function (bypass) {
            this._bypassCache = bypass;
            /*var oReq = new XMLHttpRequest();
    
            oReq.open("GET", url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime());
            oReq.send(null);*/
        };
        HttpRequest.prototype.isUnset = function () {
            return this.readyState() == HttpRequest.STATE_UNSENT;
        };
        HttpRequest.prototype.isOpened = function () {
            return this.readyState() == HttpRequest.STATE_OPENED;
        };
        HttpRequest.prototype.isHeadersReceived = function () {
            return this.readyState() == HttpRequest.STATE_HEADERS_RECEIVED;
        };
        HttpRequest.prototype.isLoading = function () {
            return this.readyState() == HttpRequest.STATE_LOADING;
        };
        HttpRequest.prototype.isDone = function () {
            return this.readyState() == HttpRequest.STATE_DONE;
        };
        HttpRequest.prototype.beforeOpen = function (method, url, async, user, password) {
            if (async === void 0) { async = true; }
            if (user === void 0) { user = null; }
            if (password === void 0) { password = null; }
            this.setMethod(method);
            if (this._bypassCache) {
                url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();
            }
            this.setUrl(url);
            this.setAsync(async);
            this.setUsername(user);
            this.setPassword(password);
            //LISTENER
            if (this._listener && !this._listenerInit) {
                var _this_1 = this;
                this._request.onabort = function (e) {
                    _this_1._listener.onAbort(e, _this_1);
                };
                this._request.onerror = function (e) {
                    _this_1._listener.onError(e, _this_1);
                };
                this._request.onload = function (e) {
                    _this_1._listener.onLoad(e, _this_1);
                };
                this._request.onloadend = function (e) {
                    _this_1._listener.onLoadEnd(e, _this_1);
                };
                this._request.onloadstart = function (e) {
                    _this_1._listener.onLoadStart(e, _this_1);
                };
                this._request.onprogress = function (e) {
                    _this_1._listener.onProgress(e, _this_1);
                };
                this._request.ontimeout = function (e) {
                    _this_1._listener.onTimeout(e, _this_1);
                };
                this._listenerInit = true;
            }
        };
        HttpRequest.prototype.open = function (method, url, async, user, password) {
            if (async === void 0) { async = true; }
            if (user === void 0) { user = null; }
            if (password === void 0) { password = null; }
            this.beforeOpen(method, url, async, user, password);
            //this._request.open(method, url, async, user, password);
            this.afterOpen();
        };
        HttpRequest.prototype.afterOpen = function () {
            if (this.isAsync()) {
                this._request.responseType = this.getResponseType();
                this._request.timeout = this.getTimeout();
                if (this.isCorsEnabled()) {
                    this._request.withCredentials = this.getCredentials();
                }
            }
        };
        HttpRequest.prototype.getResponse = function () {
            return this._request.response;
        };
        HttpRequest.prototype.getResponseText = function () {
            return this._request.responseText;
        };
        HttpRequest.prototype.getResponseUrl = function () {
            return this._request['responseURL'];
        };
        HttpRequest.prototype.getResponseXml = function () {
            return this._request.responseXML;
        };
        HttpRequest.prototype.getStatus = function () {
            return this._request.status;
        };
        HttpRequest.prototype.getStatusText = function () {
            return this._request.statusText;
        };
        HttpRequest.prototype.setTimeout = function (timeout) {
            this._timeout = timeout;
        };
        HttpRequest.prototype.getTimeout = function () {
            return this._timeout;
        };
        HttpRequest.prototype.getUpload = function () {
            return this._request.upload;
        };
        HttpRequest.prototype.setCredentials = function (credentials) {
            this._credentials = credentials;
        };
        HttpRequest.prototype.getCredentials = function () {
            return this._credentials;
        };
        HttpRequest.prototype.beforeSend = function () {
        };
        HttpRequest.prototype.send = function (data) {
            if (data === void 0) { data = null; }
            this.beforeSend();
            this._request.send(data);
            this.afterSend();
        };
        HttpRequest.prototype.afterSend = function () {
        };
        HttpRequest.prototype.setHttpRequestListener = function (listener) {
            this._listener = listener;
            this._listenerInit = false;
        };
        HttpRequest.prototype.getHttpRequestListener = function () {
            return this._listener;
        };
        HttpRequest.prototype.setAsync = function (async) {
            this._async = async;
        };
        HttpRequest.prototype.isAsync = function () {
            return this._async;
        };
        HttpRequest.prototype.isCorsEnabled = function () {
            return this._request.withCredentials !== undefined;
        };
        HttpRequest.prototype.sendBeacon = function (url, data) {
            //navigator.sendBeacon(url,data);
        };
        HttpRequest.prototype.reset = function () {
            this._request = new XMLHttpRequest();
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
        HttpRequest.RESPONSE_ARRAY_BUFFER = "arraybuffer";
        HttpRequest.RESPONSE_BLOB = "blob";
        HttpRequest.RESPONSE_DOCUMENT = "document";
        HttpRequest.RESPONSE_JSON = "json";
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
