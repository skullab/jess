define(["require", "exports", './View'], function (require, exports, View_1) {
    "use strict";
    var Controller = (function () {
        function Controller() {
        }
        Controller.prototype.onInitialize = function () { };
        Controller.prototype.setView = function (view) {
            if (typeof view === 'object' && view instanceof View_1.View) {
                this.view = view;
            }
            else if (typeof view === 'string') {
                this.view = this._di.get('viewManager').getView(view);
            }
        };
        Controller.prototype.getView = function () {
            return this.view;
        };
        Controller.prototype.setServices = function () {
            if (this._di.has('view')) {
                this.view = this._di.get('view');
            }
            else {
                this.view = this._di.get('application').getActiveView();
            }
            if (this._di.has('dispatcher')) {
                this.dispatcher = this._di.get('dispatcher');
            }
        };
        /**
         * Set the dependency injection container.
         * @param {object} di : The dependency injection container.
         */
        Controller.prototype.setDi = function (di) {
            this._di = di;
            this.setServices();
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
