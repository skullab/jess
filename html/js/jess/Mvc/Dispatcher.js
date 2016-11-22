define(["require", "exports", './Controller', '../util/StringHelper'], function (require, exports, Controller_1, StringHelper_1) {
    "use strict";
    var Dispatcher = (function () {
        function Dispatcher() {
            this.setActionSuffix('Action');
            this.setControllerSuffix('Controller');
            this.setControllerName('index');
            this.setActionName('index');
        }
        Dispatcher.prototype.setModule = function (m) {
            this._activeModule = m;
        };
        Dispatcher.prototype.getModule = function () {
            return this._activeModule;
        };
        Dispatcher.prototype.setControllerSuffix = function (suffix) {
            this._controllerSuffix = suffix;
        };
        Dispatcher.prototype.getControllerSuffix = function () {
            return this._controllerSuffix;
        };
        Dispatcher.prototype.setControllerName = function (name) {
            this._activeControllerName = name;
        };
        Dispatcher.prototype.getControllerName = function () {
            return this._activeControllerName;
        };
        Dispatcher.prototype.setActionSuffix = function (suffix) {
            this._actionSuffix = suffix;
        };
        Dispatcher.prototype.getActionSuffix = function () {
            return this._actionSuffix;
        };
        Dispatcher.prototype.setActionName = function (name) {
            this._activeActionName = name;
        };
        Dispatcher.prototype.getActionName = function () {
            return this._activeActionName;
        };
        Dispatcher.prototype.setParams = function (params) {
            this._activeParams = params;
        };
        Dispatcher.prototype.getParams = function () {
            return this._activeParams;
        };
        Dispatcher.prototype.dispatch = function () {
            if (!this._di) {
                throw new Error("A dependency injection container is required to access related dispatching services");
            }
            this._dispatched = false;
            while (!this.isFinished()) {
                var _module = this.getModule();
                if (!_module) {
                    throw new Error("No Module declared");
                }
                var _controllerName = StringHelper_1.StringHelper.capitalize(StringHelper_1.StringHelper.camelize(this.getControllerName())) + this.getControllerSuffix();
                if (_module.hasOwnProperty(_controllerName)) {
                    var _controllerInstance = typeof _module[_controllerName] === 'function' ? new _module[_controllerName]() : _module[_controllerName];
                    if (_controllerInstance instanceof Controller_1.Controller) {
                        _controllerInstance.setDi(this.getDi());
                        _controllerInstance.onInitialize();
                    }
                    var _actionName = StringHelper_1.StringHelper.camelize(this.getActionName()) + this.getActionSuffix();
                    if (typeof _controllerInstance[_actionName] === 'function') {
                        _controllerInstance[_actionName].apply(_controllerInstance, this.getParams());
                    }
                    else {
                        throw new Error("Action '" + this.getActionName() + "' was not found on controller '" + this.getControllerName() + "'");
                    }
                }
                else {
                    throw new Error("Controller '" + this.getControllerName() + "' was not found");
                }
                this._dispatched = true;
            }
            //this._di.get('view').render();
        };
        Dispatcher.prototype.forward = function (controller, action, params) {
            this._activeControllerName = controller;
            this._activeActionName = action;
            this._activeParams = params;
            //this.dispatch();
            this._di.get('application').loop();
        };
        Dispatcher.prototype.isFinished = function () {
            return this._dispatched;
        };
        /**
        * Set the dependency injection container.
        * @param {object} di : The dependency injection container.
        */
        Dispatcher.prototype.setDi = function (di) {
            this._di = di;
            //this._di.set('dispatcher', this, true);
        };
        /**
         * Returns the dependecy injection container.
         * @return {object} : The dependency injection container.
         */
        Dispatcher.prototype.getDi = function () {
            return this._di;
        };
        return Dispatcher;
    }());
    exports.Dispatcher = Dispatcher;
});
