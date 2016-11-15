define(["require", "exports"], function (require, exports) {
    "use strict";
    var Di = (function () {
        function Di() {
            this._services = {};
            this._sharedServices = {};
        }
        Di.prototype.set = function (serviceName, service, shared) {
            shared = shared || false;
        };
        Di.prototype.get = function (serviceName) {
        };
        Di.prototype.setShared = function (serviceName, service) {
            this.set(serviceName, service, true);
        };
        Di.prototype.getShared = function (serviceName) { };
        Di.prototype.has = function (serviceName) {
            return this._services.hasOwnProperty(serviceName);
        };
        Di.prototype.remove = function (serviceName) { };
        Di.prototype.reset = function () { };
        return Di;
    }());
    exports.Di = Di;
});
