define(["require", "exports", './View'], function (require, exports, View_1) {
    "use strict";
    var Controller = (function () {
        function Controller() {
        }
        Controller.prototype.onInitialize = function () { };
        Controller.prototype.setRootElement = function (element) {
            this.element = element;
        };
        Controller.prototype.getRootElement = function () {
            return this.element;
        };
        Controller.prototype.setView = function (view) {
            if (typeof view === 'object' && view instanceof View_1.View) {
                this.view = view;
            }
            else if (typeof view === 'string') {
                this.view = this.getDi().get(view);
            }
        };
        Controller.prototype.getView = function () {
            return this.view;
        };
        /**
         * Set the dependency injection container.
         * @param {object} di : The dependency injection container.
         */
        Controller.prototype.setDi = function (di) {
            this._di = di;
            var _s = this._di.getServices();
            for (var name_1 in _s) {
                this[name_1] = _s[name_1];
            }
        };
        /**
        * Returns the dependecy injection container.
        * @return {object} : The dependency injection container.
        */
        Controller.prototype.getDi = function () {
            return this._di;
        };
        return Controller;
    }());
    exports.Controller = Controller;
});
