define(["require", "exports"], function (require, exports) {
    "use strict";
    var Service = (function () {
        function Service(serviceName, service, shared, di) {
            this._instance = null;
            this._resolved = false;
            this._parameters = [];
            this._di = {};
            this.setName(serviceName);
            this.setService(service);
            this.setShared(shared);
            this._di = di;
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
        Service.prototype.setParameters = function (parameters) {
            this._parameters = parameters;
        };
        Service.prototype.getParameters = function () {
            return this._parameters;
        };
        Service.prototype.isResolved = function () {
            return this._resolved;
        };
        Service.prototype.resolve = function () {
            if (!this.isResolved()) {
                switch (typeof this._service) {
                    case 'function':
                        if (!this._instance || !this.isShared) {
                            this._instance = this._service.apply(this._di, this.getParameters());
                        }
                        break;
                    default:
                        this._instance = this._service;
                }
            }
        };
        return Service;
    }());
    exports.Service = Service;
});
