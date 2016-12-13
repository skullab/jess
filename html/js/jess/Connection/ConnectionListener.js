define(["require", "exports"], function (require, exports) {
    "use strict";
    var ConnectionListener = (function () {
        function ConnectionListener(connection) {
            this._connection = connection;
        }
        ConnectionListener.prototype.onTimeout = function (event, response) { };
        ConnectionListener.prototype.onAbort = function (event, response) { };
        ConnectionListener.prototype.onError = function (event, response) { };
        ConnectionListener.prototype.onLoad = function (event, response) {
            console.log(response.getListenerName());
            console.log(response.response);
        };
        ConnectionListener.prototype.onLoadEnd = function (event, response) { };
        ConnectionListener.prototype.onLoadStart = function (event, response) { };
        ConnectionListener.prototype.onProgress = function (event, response) { };
        return ConnectionListener;
    }());
    exports.ConnectionListener = ConnectionListener;
});
