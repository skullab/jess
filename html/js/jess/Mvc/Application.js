var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './Controller', './View', './Dispatcher', '../util/StringHelper', './View/ViewManager'], function (require, exports, Controller_1, View_1, Dispatcher_1, StringHelper_1, ViewManager_1) {
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
        function Application(di, prefix) {
            if (prefix === void 0) { prefix = ''; }
            this._modules = {};
            this.setDi(di);
            this.setDataApplicationPrefix(prefix);
            this._registerServices();
            this._findModules();
            this._findViews();
            //this._findEvents();
        }
        Application.prototype.setDataApplicationPrefix = function (prefix) {
            this._dataApplicationPrefix = prefix;
        };
        Application.prototype.getDataApplicationPrefix = function () {
            return this._dataApplicationPrefix;
        };
        Application.prototype._registerServices = function () {
            //console.log('register services..');
            this._di.set('application', this, true);
            if (!this._di.has('dispatcher')) {
                this._di.set('dispatcher', function () {
                    var dispatcher = new Dispatcher_1.Dispatcher();
                    return dispatcher;
                }, true);
            }
            this._dispatcher = this._di.get('dispatcher');
            if (!this._di.has('viewManager')) {
                this._di.set('viewManager', function () {
                    var vm = new ViewManager_1.ViewManager(this);
                    if (this.has('view')) {
                        var _v = this.get('view');
                        _v.setName('view');
                        vm.addView(_v);
                    }
                    return vm;
                }, true);
            }
        };
        Application.prototype._findModules = function () {
            //console.log('finding modules..');
            var prefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'module';
            var _query = '[data-' + prefix + ']';
            var _dataName = StringHelper_1.StringHelper.camelize(prefix);
            var _modules = document.querySelectorAll(_query);
            var _obj = {};
            for (var i = 0; i < _modules.length; i++) {
                var el = _modules[i];
                var _default = el.hasAttribute('default');
                var moduleInstance = this._di.get(el.dataset[_dataName]);
                _obj[el.dataset[_dataName]] = this._di.get(el.dataset[_dataName]);
                if (_default)
                    this.setDefaultModule(el.dataset[_dataName]);
            }
            this.registerModules(_obj);
            if (!this._defaultModule) {
                this.setDefaultModule(_obj[Object.keys(_obj)[0]]);
            }
        };
        Application.prototype._findViews = function () {
            //console.log('finding views..');
            var prefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'view';
            var _query = '[data-' + prefix + ']';
            var _dataName = StringHelper_1.StringHelper.camelize(prefix);
            var _views = document.querySelectorAll(_query);
            for (var i = 0; i < _views.length; i++) {
                var el = _views[i];
                var active = el.hasAttribute('active');
                var viewInstance = new View_1.View(el);
                viewInstance.setName(el.dataset[_dataName]);
                this._di.get('viewManager').addView(viewInstance);
                if (active) {
                    this.setActiveView(el.dataset[_dataName]);
                }
            }
        };
        Application.prototype._resolveParams = function (p) {
            if (!p)
                return [];
            var v = p.split(',');
            var s = [];
            for (var i in v) {
                s.push(v[i].trim());
            }
            return s;
        };
        Application.prototype._findListeners = function (root) {
            root = root || document;
            var prefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'listener';
            var _query = '[data-' + prefix + ']';
            var _dataName = StringHelper_1.StringHelper.camelize(prefix);
            var _listeners = root.querySelectorAll(_query);
            var _loop_1 = function(i) {
                var el = _listeners[i];
                var _definition = el.dataset[_dataName];
                var _obj = JSON.parse(_definition);
                var _event = _obj.event;
                var _module = _obj.module;
                var _controller = _obj.controller;
                var _action = _obj.action;
                var _paramsString = _obj.params;
                var _params = this_1._resolveParams(_paramsString);
                //console.log(_params)
                var _view = _obj.view;
                var _t = this_1;
                var _handler = function (e) {
                    console.log('fire event > ' + _event);
                    if (_view)
                        _t.setActiveView(_view);
                    //_params.shift();
                    _params.unshift(e);
                    //_params.shift();
                    _t.handle(_module, _controller, _action, _params);
                    el.removeEventListener(_event, _handler, false);
                };
                el.addEventListener(_event, _handler);
            };
            var this_1 = this;
            for (var i = 0; i < _listeners.length; i++) {
                _loop_1(i);
            }
        };
        Application.prototype._findEvents = function (root) {
            //console.log('finding events..');
            root = root || document;
            var prefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'event';
            var cPrefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'controller';
            var aPrefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'action';
            var pPrefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'params';
            var mPrefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'model';
            var modPrefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'module';
            var vPrefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'bind-view';
            var _query = '[data-' + prefix + ']';
            var _dataName = StringHelper_1.StringHelper.camelize(prefix);
            var _events = root.querySelectorAll(_query);
            var _loop_2 = function(i) {
                var el = _events[i];
                var _module = el.dataset[StringHelper_1.StringHelper.camelize(modPrefix)];
                var _controller = el.dataset[StringHelper_1.StringHelper.camelize(cPrefix)];
                var _action = el.dataset[StringHelper_1.StringHelper.camelize(aPrefix)];
                var _model = el.dataset[StringHelper_1.StringHelper.camelize(mPrefix)];
                var _paramsString = el.dataset[StringHelper_1.StringHelper.camelize(pPrefix)];
                var _params = this_2._resolveParams(_paramsString);
                var _view = el.dataset[StringHelper_1.StringHelper.camelize(vPrefix)];
                var _t = this_2;
                var _handler = function (e) {
                    console.log('fire event > ' + el.dataset[_dataName]);
                    if (_view)
                        _t.setActiveView(_view);
                    _params.push(e);
                    _t.handle(_module, _controller, _action, _params);
                    el.removeEventListener(el.dataset[_dataName], _handler, false);
                };
                el.addEventListener(el.dataset[_dataName], _handler);
            };
            var this_2 = this;
            for (var i = 0; i < _events.length; i++) {
                _loop_2(i);
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
            if (!mod)
                return;
            switch (typeof mod) {
                case 'object':
                    this._modules['default'] = mod;
                    this._defaultModule = 'default';
                    break;
                case 'string':
                    this._defaultModule = mod;
            }
        };
        Application.prototype.getDefaultModule = function () {
            return this._modules[this._defaultModule];
        };
        Application.prototype.setDefaultController = function (controller) {
            this._defaultController = controller ? controller : 'index';
        };
        Application.prototype.getDefaultController = function () {
            return this._defaultController;
        };
        Application.prototype.setDefaultAction = function (action) {
            this._defaultAction = action ? action : 'index';
        };
        Application.prototype.getDefaultAction = function () {
            return this._defaultAction;
        };
        Application.prototype.setDefaultParams = function (params) {
            this._defaultParams = params ? params : [];
        };
        Application.prototype.getDefaultParams = function () {
            return this._defaultParams;
        };
        Application.prototype.setActiveView = function (viewName) {
            this._activeView = viewName;
        };
        Application.prototype.getActiveView = function () {
            this._activeView = this._activeView ? this._activeView : (this._di.has('view') ? 'view' : 0);
            return this._di.get('viewManager').getView(this._activeView);
        };
        Application.prototype.beforeHandle = function (mod, controller, action, params) {
            //console.log('before handle > setting defaults');
            this.setDefaultModule(mod);
            this.setDefaultController(controller);
            this.setDefaultAction(action);
            this.setDefaultParams(params);
        };
        Application.prototype.handle = function (mod, controller, action, params) {
            this.beforeHandle(mod, controller, action, params);
            this._dispatcher.setModule(this.getDefaultModule());
            this._dispatcher.setControllerName(this.getDefaultController());
            this._dispatcher.setActionName(this.getDefaultAction());
            this._dispatcher.setParams(this.getDefaultParams());
            this._dispatcher.dispatch();
            this.afterHandle();
        };
        Application.prototype.beforeRender = function () {
            //console.log('before render..');
        };
        Application.prototype.afterRender = function () {
            //console.log('after render..');
        };
        Application.prototype.afterHandle = function () {
            //console.log('after handle');
            this.beforeRender();
            var view = this.getActiveView();
            view.render();
            this.afterRender();
            this._findEvents();
            this._findListeners();
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
