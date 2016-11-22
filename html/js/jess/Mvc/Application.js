var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Controller', './View', '../util/StringHelper', './View/ViewManager'], function (require, exports, Controller_1, View_1, StringHelper_1, ViewManager_1) {
    "use strict";
    var DefaultModule;
    (function (DefaultModule) {
        var DefaultIndexController = (function (_super) {
            __extends(DefaultIndexController, _super);
            function DefaultIndexController() {
                _super.apply(this, arguments);
            }
            DefaultIndexController.prototype.defaultIndexAction = function () { };
            return DefaultIndexController;
        }(Controller_1.Controller));
        DefaultModule.DefaultIndexController = DefaultIndexController;
    })(DefaultModule || (DefaultModule = {}));
    var Application = (function () {
        function Application(di) {
            this._modules = {};
            this.setDi(di);
            this._dispatcher = this.getDi().get('dispatcher');
            this.getDi().set('application', this, true);
            this.getDi().set('viewManager', new ViewManager_1.ViewManager(this.getDi()), true);
            if (this.getDi().has('view')) {
                this.getDi().get('viewManager').addView(this.getDi().get('view'));
            }
        }
        Application.prototype.setDataApplicationPrefix = function (prefix) {
            this._dataApplicationPrefix = prefix;
        };
        Application.prototype.getDataApplicationPrefix = function () {
            return this._dataApplicationPrefix;
        };
        Application.prototype._findModules = function () { };
        Application.prototype._findViews = function () {
            var prefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'view';
            var _query = '[data-' + prefix + ']';
            var _dataName = StringHelper_1.StringHelper.camelize(prefix);
            var _views = document.querySelectorAll(_query);
            for (var i = 0; i < _views.length; i++) {
                var el = _views[i];
                var viewInstance = new View_1.View(el).setName(el.dataset[_dataName]);
                this._di.get('viewManager').addView(viewInstance);
            }
        };
        Application.prototype._initialize = function () {
            var prefix = this._dataModulePrefix ? this._dataModulePrefix + '-' : '';
            var _mQuery = '[data-' + prefix + 'module]';
            var _m = document.querySelectorAll(_mQuery);
            for (var i = 0; i < _m.length; i++) {
                var e = _m[i];
                var events = e.querySelectorAll('[data-event]');
                var _loop_1 = function(_i) {
                    var _e = events[_i];
                    var _controller = _e.dataset['controller'];
                    var _action = _e.dataset['action'];
                    //let _module = _e.dataset['module'] || this.getDefaultModule();
                    var _this = this_1;
                    _e.addEventListener(_e.dataset['event'], function () {
                        _this._dispatcher.forward(_controller, _action);
                    });
                };
                var this_1 = this;
                for (var _i = 0; _i < events.length; _i++) {
                    _loop_1(_i);
                }
                var n = StringHelper_1.StringHelper.uncapitalize(StringHelper_1.StringHelper.camelize(prefix + 'module'));
                if (i == 0) {
                    this.setDefaultModule(e.dataset[n]);
                }
                var __m = {};
                __m[e.dataset[n]] = this.getDi().get(e.dataset[n]);
                this.registerModules(__m, true);
            }
        };
        Application.prototype.registerModules = function (modules, merge) {
            merge = merge || false;
            if (merge) {
                for (var i in modules) {
                    this._modules[i] = modules[i];
                }
            }
            else {
                this._modules = modules;
            }
        };
        Application.prototype.getModules = function () {
            return this._modules;
        };
        Application.prototype.setDefaultModule = function (mod) {
            switch (typeof mod) {
                case 'object':
                    this._modules['default'] = mod;
                    this._defaultModule = 'default';
                    break;
                case 'string':
                    var i = this._modules[mod] ? this._modules[mod] : this.getDi().get(mod);
                    this._defaultModule = mod;
                    this._modules[mod] = i;
            }
        };
        Application.prototype.getDefaultModule = function () {
            return this._modules[this._defaultModule];
        };
        Application.prototype.beforeHandle = function () {
            console.log('before handle');
        };
        Application.prototype._handle = function () {
            this._initialize();
            this._dispatcher.setModule(this.getDefaultModule());
            this._dispatcher.dispatch();
            this.afterHandle();
        };
        Application.prototype.handle = function () {
            var _this = this;
            this.beforeHandle();
            this.loop();
            this.afterHandle();
        };
        Application.prototype.afterHandle = function () {
            console.log('after handle');
        };
        Application.prototype.loop = function () {
            // render views
            //this._di.get('view').render();
            this._initialize();
            this._dispatcher.setModule(this.getDefaultModule());
            this._dispatcher.dispatch();
            this._di.get('view').render();
            this._initialize();
        };
        /**
        * Set the dependency injection container.
        * @param {object} di : The dependency injection container.
        */
        Application.prototype.setDi = function (di) {
            this._di = di;
        };
        /**
         * Returns the dependecy injection container.
         * @return {object} : The dependency injection container.
         */
        Application.prototype.getDi = function () {
            return this._di;
        };
        return Application;
    }());
    exports.Application = Application;
});
