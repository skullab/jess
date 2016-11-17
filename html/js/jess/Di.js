define(["require", "exports", './Di/Service'], function (require, exports, Service_1) {
    "use strict";
    var Di = (function () {
        function Di() {
            this._services = {};
        }
        /**
         * Set a service into dependency injection.
         * @param {string} serviceName : The name of the service.
         * @param {any} service : The service to store.
         * @param {boolean} shared? : Optional, set if the service is shared or not.
         */
        Di.prototype.set = function (serviceName, service, shared) {
            shared = shared || false;
            return this._services[serviceName] = new Service_1.Service(serviceName, service, shared, this);
        };
        /**
         * Returns a service.
         * @param {string} serviceName : The service name.
         * @param {array} parameters : Optional parameters to pass to service's instance.
         * @return {any} : The resolving service.
         */
        Di.prototype.get = function (serviceName, parameters) {
            if (parameters === void 0) { parameters = []; }
            if (this.has(serviceName)) {
                var raw = this._services[serviceName];
                if (parameters.length > 0)
                    raw.setParameters(parameters);
                return raw.resolve();
            }
            throw new Error("Service '" + serviceName + "' was not found in the dependency injection container");
        };
        /**
         * Set a service object
         * @param {string} serviceName : The name of the service.
         * @param {object} service : The service object that implements ServiceInterface.
         */
        Di.prototype.setRaw = function (serviceName, service) {
            this._services[serviceName] = service;
        };
        /**
         * Returns a service object without resolving.
         * @return {object} : The service object that implements ServiceInterface.
         */
        Di.prototype.getRaw = function (serviceName) {
            if (this.has(serviceName)) {
                return this._services[serviceName];
            }
        };
        /**
         * Set a shared service into dependency injection.
         * This is a shortcut for method [set]{@link DiInterface#set}
          * @param {string} serviceName : The name of the service.
         *  @param {any} service : The service to store.
         */
        Di.prototype.setShared = function (serviceName, service) {
            return this.set(serviceName, service, true);
        };
        /**
         * Checks if service exists.
         * @param {string} serviceName : The service name.
         * @return {boolean} : true if service exists otherwise false.
         */
        Di.prototype.has = function (serviceName) {
            return this._services.hasOwnProperty(serviceName);
        };
        /**
         * Remove a service from dependency injection.
         * @param {string} serviceName : The service name to remove.
         */
        Di.prototype.remove = function (serviceName) {
            if (this.has(serviceName)) {
                delete this._services[serviceName];
            }
        };
        /**
         * Reset the dependency injection container.
         */
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
