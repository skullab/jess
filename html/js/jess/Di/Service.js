define(["require", "exports"], function (require, exports) {
    "use strict";
    var Service = (function () {
        function Service(serviceName, service, shared) {
            this._instance = null;
            this.setName(serviceName);
            this.setService(service);
            this.setShared(shared);
        }
        Service.prototype.setName = function (serviceName) {
            this._name = serviceName;
        };
        Service.prototype.getName = function () {
            return this._name;
        };
        Service.prototype.setShared = function (shared) {
            this._shared = shared;
        };
        Service.prototype.isShared = function () {
            return this._shared;
        };
        Service.prototype.setService = function (service) {
            this._service = service;
        };
        Service.prototype.getService = function () {
            return this._service;
        };
        Service.prototype.resolve = function () {
            switch (typeof this._service) {
                case 'function' || 'object':
                    if (this.isShared()) {
                        if (!this._instance) {
                            this._instance = new this._service();
                        }
                    }
                    break;
                default:
            }
            return this._instance;
        };
        return Service;
    }());
    exports.Service = Service;
});
