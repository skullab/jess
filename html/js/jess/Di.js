define(["require", "exports", './Di/Service'], function (require, exports, Service_1) {
    "use strict";
    var Di = (function () {
        function Di() {
            this._services = {};
        }
        Di.prototype.set = function (serviceName, service, shared) {
            shared = shared || false;
            this._services[serviceName] = new Service_1.Service(serviceName, service, shared);
        };
        Di.prototype.get = function (serviceName) {
        };
        Di.prototype.setShared = function (serviceName, service) {
            this.set(serviceName, service, true);
        };
        Di.prototype.getShared = function (serviceName) {
            if (this.has(serviceName) && this._services[serviceName].isShared()) {
            }
            throw new Error("Service '" + serviceName + "' was not found in the dependency injection container");
        };
        Di.prototype.has = function (serviceName) {
            return this._services.hasOwnProperty(serviceName);
        };
        Di.prototype.remove = function (serviceName) {
            if (this.has(serviceName)) {
                delete this._services[serviceName];
            }
        };
        Di.prototype.reset = function () {
            for (var i in this._services) {
                this.remove(i);
            }
            this._services = {};
        };
        return Di;
    }());
    exports.Di = Di;
});
