define(["require", "exports"], function (require, exports) {
    "use strict";
    var Controller = (function () {
        function Controller() {
            this.onInitialize();
        }
        Controller.prototype.onInitialize = function () { };
        /**
         * Set the dependency injection container.
         * @param {object} di : The dependency injection container.
         */
        Controller.prototype.setDi = function (di) {
            this._di = di;
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
