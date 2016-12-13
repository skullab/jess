define(["require", "exports", './Connection/ConnectionListener'], function (require, exports, ConnectionListener_1) {
    "use strict";
    var Connection = (function () {
        function Connection(base_uri) {
            this._createUri = '';
            this._readUri = '';
            this._updateUri = '';
            this._deleteUri = '';
            base_uri = base_uri || './';
            this.setBaseUri(base_uri);
            this.setCreateMethod('POST');
            this.setReadMethod('GET');
            this.setUpdateMethod('PUT');
            this.setDeleteMethod('DELETE');
        }
        Connection.prototype._resolveRequest = function (method, uri, data) {
            if (typeof data === 'string') {
                this._httpRequest.setData(data);
            }
            else if (typeof data === 'object') {
                this._httpRequest.setParams(data);
            }
            switch (method.toUpperCase()) {
                case 'POST':
                    this._httpRequest.post(uri);
                    break;
                case 'GET':
                    this._httpRequest.get(uri);
                    break;
                case 'PUT':
                    this._httpRequest.put(uri);
                    break;
                case 'DELETE':
                    this._httpRequest.delete(uri);
                    break;
            }
        };
        Connection.prototype.create = function (data) {
            var uri = this.getBaseUri() + this.getCreateUri();
            this._resolveRequest(this.getCreateMethod(), uri, data);
        };
        Connection.prototype.read = function (data) {
            var uri = this.getBaseUri() + this.getReadUri();
            this._resolveRequest(this.getReadMethod(), uri, data);
        };
        Connection.prototype.update = function (data) {
            var uri = this.getBaseUri() + this.getUpdateUri();
            this._resolveRequest(this.getUpdateMethod(), uri, data);
        };
        Connection.prototype.delete = function (data) {
            var uri = this.getBaseUri() + this.getDeleteUri();
            this._resolveRequest(this.getDeleteMethod(), uri, data);
        };
        Connection.prototype.setBaseUri = function (uri) {
            this._baseUri = uri;
        };
        Connection.prototype.getBaseUri = function () {
            return this._baseUri;
        };
        Connection.prototype.setCreateMethod = function (method) {
            this._createMethod = method;
        };
        Connection.prototype.getCreateMethod = function () {
            return this._createMethod;
        };
        Connection.prototype.setCreateUri = function (uri) {
            this._createUri = uri;
        };
        Connection.prototype.getCreateUri = function () {
            return this._createUri;
        };
        Connection.prototype.setReadMethod = function (method) {
            this._readMethod = method;
        };
        Connection.prototype.getReadMethod = function () {
            return this._readMethod;
        };
        Connection.prototype.setReadUri = function (uri) {
            this._readUri = uri;
        };
        Connection.prototype.getReadUri = function () {
            return this._readUri;
        };
        Connection.prototype.setUpdateMethod = function (method) {
            this._updateMethod = method;
        };
        Connection.prototype.getUpdateMethod = function () {
            return this._updateMethod;
        };
        Connection.prototype.setUpdateUri = function (uri) {
            this._updateUri = uri;
        };
        Connection.prototype.getUpdateUri = function () {
            return this._updateUri;
        };
        Connection.prototype.setDeleteMethod = function (method) {
            this._deleteMethod = method;
        };
        Connection.prototype.getDeleteMethod = function () {
            return this._deleteMethod;
        };
        Connection.prototype.setDeleteUri = function (uri) {
            this._deleteUri = uri;
        };
        Connection.prototype.getDeleteUri = function () {
            return this._deleteUri;
        };
        Connection.prototype.setServices = function () {
            this._httpRequest = this._di.get('httpRequest');
            this._httpRequest.setHttpListener('connectionListener', new ConnectionListener_1.ConnectionListener(this));
        };
        Connection.prototype.setDi = function (di) {
            this._di = di;
            this.setServices();
        };
        Connection.prototype.getDi = function () {
            return this._di;
        };
        return Connection;
    }());
    exports.Connection = Connection;
});
