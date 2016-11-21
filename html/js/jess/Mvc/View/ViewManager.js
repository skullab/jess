define(["require", "exports", '../View', '../../util/ArrayList'], function (require, exports, View_1, ArrayList_1) {
    "use strict";
    var ViewManager = (function () {
        function ViewManager(di, views) {
            this._dataViewPrefix = '';
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
            return this._views.get(index);
        };
        ViewManager.prototype.addView = function (view) {
            this._views.add(view);
        };
        ViewManager.prototype.addAllDataView = function (query) {
            if (query === void 0) { query = ''; }
            var n = this.getAllDataView();
            for (var i = 0; i < n.length; i++) {
                var e = n[i];
                var v = new View_1.View(e);
                v.setName(e.dataset[this._dataViewPrefix + 'View']);
                var viewEngine = this.getDi().get('viewEngine');
                if (viewEngine)
                    v.setViewEngine(viewEngine);
                this.addView(v);
            }
        };
        ViewManager.prototype.removeView = function (view) {
            this._views.remove(view);
        };
        ViewManager.prototype.renderView = function (index) {
            var v = this._views.get(index);
            if (v && v instanceof View_1.View) {
                v.render();
            }
        };
        ViewManager.prototype.renderAll = function () {
            for (var _i = 0, _a = this.toArray(); _i < _a.length; _i++) {
                var v = _a[_i];
                v.render();
            }
        };
        ViewManager.prototype.setDataViewPrefix = function (prefix) {
            this._dataViewPrefix = prefix;
        };
        ViewManager.prototype.getDataViewPrefix = function () {
            return this._dataViewPrefix;
        };
        ViewManager.prototype.getDataView = function (name) {
            var prefix = this._dataViewPrefix !== '' ? this._dataViewPrefix + '-' : '';
            return document.querySelector('[data-' + prefix + 'view="' + name + '"]');
        };
        ViewManager.prototype.getAllDataView = function (query) {
            if (query === void 0) { query = ''; }
            var prefix = this._dataViewPrefix !== '' ? this._dataViewPrefix + '-' : '';
            query += '[data-' + prefix + 'view]';
            return document.querySelectorAll(query);
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
