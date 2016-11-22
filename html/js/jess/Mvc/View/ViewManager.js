define(["require", "exports", '../View', '../../util/ArrayList'], function (require, exports, View_1, ArrayList_1) {
    "use strict";
    var ViewManager = (function () {
        function ViewManager(di, views) {
            this.setDi(di);
            this._views = new ArrayList_1.ArrayList(views);
        }
        ViewManager.prototype.viewExists = function (index) {
            if (typeof index === 'number') {
                return this.getView(index) !== undefined;
            }
            if (typeof index === 'string') {
                return this.getViewByName(index) !== null;
            }
            if (typeof index === 'object' && index instanceof View_1.View) {
                var check = false;
                for (var _i = 0, _a = this.toArray(); _i < _a.length; _i++) {
                    var v = _a[_i];
                    if (v === index) {
                        check = true;
                        break;
                    }
                }
                return check;
            }
            return false;
        };
        ViewManager.prototype.getViewByName = function (name) {
            for (var _i = 0, _a = this.toArray(); _i < _a.length; _i++) {
                var v = _a[_i];
                if (v.getName() == name) {
                    return v;
                }
            }
            return null;
        };
        ViewManager.prototype.getView = function (index) {
            if (typeof index === 'number') {
                return this._views.get(index);
            }
            else if (typeof index === 'string') {
                return this.getViewByName(index);
            }
        };
        ViewManager.prototype.addView = function (view) {
            if (this._di.has('viewEngine')) {
                view.setViewEngine(this._di.get('viewEngine'));
            }
            this._views.add(view);
        };
        ViewManager.prototype.removeView = function (view) {
            this._views.remove(view);
        };
        ViewManager.prototype.renderView = function (index) {
            this.getView(index).render();
        };
        ViewManager.prototype.renderAll = function () {
            for (var _i = 0, _a = this.toArray(); _i < _a.length; _i++) {
                var v = _a[_i];
                v.render();
            }
        };
        ViewManager.prototype.toArray = function () {
            return this._views.toArray();
        };
        /**
         * Set the dependency injection container.
         * @param {object} di : The dependency injection container.
         */
        ViewManager.prototype.setDi = function (di) {
            this._di = di;
        };
        /**
         * Returns the dependecy injection container.
         * @return {object} : The dependency injection container.
         */
        ViewManager.prototype.getDi = function () {
            return this._di;
        };
        return ViewManager;
    }());
    exports.ViewManager = ViewManager;
});
