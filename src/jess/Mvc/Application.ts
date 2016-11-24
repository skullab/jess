import {ApplicationInterface} from './Application/ApplicationInterface';
import {InjectionAwareInterface} from '../DI/InjectionAwareInterface';
import {DiInterface} from '../Di/DiInterface';
import {Controller} from './Controller';
import {View} from './View';
import {DispatcherInterface} from './Dispatcher/DispatcherInterface';
import {Dispatcher} from './Dispatcher';
import {StringHelper} from '../util/StringHelper';
import {ViewManager} from './View/ViewManager';

module DefaultModule {
    export class DefaultIndexController extends Controller {
        defaultIndexAction() { }
    }
}

export class Application implements ApplicationInterface, InjectionAwareInterface {

    protected _di: DiInterface;
    protected _modules: {} = {};
    protected _events: any;
    protected _windowLoaded: boolean;

    protected _defaultModule: string;
    protected _defaultController: string;
    protected _defaultAction: string;
    protected _defaultParams: {}[];

    protected _activeView: string | number;

    protected _dispatcher: DispatcherInterface;

    protected _dataApplicationPrefix: string;

    constructor(di: DiInterface, prefix: string = '') {

        this.setDi(di);
        this.setDataApplicationPrefix(prefix);

        this._registerServices();
        this._findViews();
        this._di.get('viewManager').parseAll();
        this._findModules();
        this._di.get('viewManager').renderAll();
        //this._findEvents();
    }

    setDataApplicationPrefix(prefix: string) {
        this._dataApplicationPrefix = prefix;
    }
    getDataApplicationPrefix(): string {
        return this._dataApplicationPrefix;
    }
    protected _registerServices() {
        //console.log('register services..');
        this._di.set('application', this, true);

        if (!this._di.has('dispatcher')) {
            this._di.set('dispatcher', function() {
                let dispatcher = new Dispatcher();
                return dispatcher;
            }, true);
        }
        this._dispatcher = this._di.get('dispatcher')

        if (!this._di.has('viewManager')) {
            this._di.set('viewManager', function() {
                let vm = new ViewManager(this);
                if (this.has('view')) {
                    let _v = this.get('view');
                    _v.setName('view');
                    vm.addView(_v);
                }
                return vm;
            }, true);
        }
    }
    protected _findModules() {
        //console.log('finding modules..');
        let prefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'module';
        let _query = '[data-' + prefix + ']';
        let _dataName = StringHelper.camelize(prefix);
        let _modules = document.querySelectorAll(_query);
        let _obj = {};

        for (let i = 0; i < _modules.length; i++) {
            let el = <HTMLElement>_modules[i];
            let _default = el.hasAttribute('default');
            let moduleInstance = this._di.get(el.dataset[_dataName]);
            _obj[el.dataset[_dataName]] = this._di.get(el.dataset[_dataName]);
            if (_default) this.setDefaultModule(el.dataset[_dataName]);

        }
        this.registerModules(_obj);
        if (!this._defaultModule) {
            this.setDefaultModule(_obj[Object.keys(_obj)[0]]);
        }
    }
    protected _findViews() {
        //console.log('finding views..');
        let prefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'view';
        let _query = '[data-' + prefix + ']';
        let _dataName = StringHelper.camelize(prefix);
        let _views = document.querySelectorAll(_query);

        for (let i = 0; i < _views.length; i++) {
            let el = <HTMLElement>_views[i];
            let active = el.hasAttribute('active');
            let viewInstance = new View(el);
            viewInstance.setName(el.dataset[_dataName]);
            this._di.get('viewManager').addView(viewInstance);
            if (active) {
                this.setActiveView(el.dataset[_dataName]);
            }
        }
    }

    protected _resolveParams(p: string): {}[] {
        if (!p) return [];
        let v = p.split(',');
        let s = [];
        for (let i in v) {
            s.push(v[i].trim());
        }
        return s;
    }
    protected _findListeners(root?: any) {
        root = root || document;
        let prefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'listener';
        let _query = '[data-' + prefix + ']';
        let _dataName = StringHelper.camelize(prefix);
        let _listeners = root.querySelectorAll(_query);

        for (let i = 0; i < _listeners.length; i++) {
            let el = <HTMLElement>_listeners[i];
            let _definition = el.dataset[_dataName];
            let _obj = JSON.parse(_definition);
            _obj = Array.isArray(_obj) ? _obj : [_obj];

            for (let _o of _obj) {

                let _event = _o.event;
                let _module = _o.module;
                let _controller = _o.controller;
                let _action = _o.action

                let _paramsString = _o.params;
                let _params = this._resolveParams(_paramsString);
                let _view = _o.view;

                let _t = this;

                let _handler = function(e) {
                    console.log('fire event > ' + _event);
                    if (_view) _t.setActiveView(_view);
                    _params.unshift(e);
                    _t.handle(_module, _controller, _action, _params);
                    el.removeEventListener(_event, _handler, false);
                    e.stopPropagation();
                }
                el.addEventListener(_event, _handler);
            }
        }
    }
    protected _findEvents(root?: any) {
        //console.log('finding events..');
        root = root || document;

        let prefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'event';
        let cPrefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'controller';
        let aPrefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'action';
        let pPrefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'params';
        let mPrefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'model';
        let modPrefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'module';

        let vPrefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'bind-view';

        let _query = '[data-' + prefix + ']';
        let _dataName = StringHelper.camelize(prefix);

        let _events = root.querySelectorAll(_query);

        for (let i = 0; i < _events.length; i++) {
            let el = <HTMLElement>_events[i];

            let _module = el.dataset[StringHelper.camelize(modPrefix)];
            let _controller = el.dataset[StringHelper.camelize(cPrefix)];
            let _action = el.dataset[StringHelper.camelize(aPrefix)];
            let _model = el.dataset[StringHelper.camelize(mPrefix)];

            let _paramsString = el.dataset[StringHelper.camelize(pPrefix)];

            let _params = this._resolveParams(_paramsString);
            let _view = el.dataset[StringHelper.camelize(vPrefix)];
            let _t = this;

            let _handler = function(e) {
                console.log('fire event > ' + el.dataset[_dataName]);
                if (_view) _t.setActiveView(_view);
                _params.unshift(e);
                _t.handle(_module, _controller, _action, _params);
                el.removeEventListener(el.dataset[_dataName], _handler, false);
            }

            el.addEventListener(el.dataset[_dataName], _handler);
        }
    }

    registerModules(modules: any, merge?: boolean): void {
        merge = merge || false;
        if (merge) {
            for (let i in modules) {
                this._modules[i] = modules[i];
            }
        } else {
            this._modules = modules;
        }
    }
    getModules(): {} {
        return this._modules;
    }
    setDefaultModule(mod: any): void {
        if (!mod) return;

        switch (typeof mod) {
            case 'object':
                this._modules['default'] = mod;
                this._defaultModule = 'default';
                break;
            case 'string':
                this._defaultModule = mod;
        }
    }
    getDefaultModule(): {} {
        return this._modules[this._defaultModule];
    }
    setDefaultController(controller: string): void {
        this._defaultController = controller ? controller : 'index';
    }
    getDefaultController(): string {
        return this._defaultController;
    }
    setDefaultAction(action: string): void {
        this._defaultAction = action ? action : 'index';
    }
    getDefaultAction(): string {
        return this._defaultAction;
    }
    setDefaultParams(params: {}[]): void {
        this._defaultParams = params ? params : [];
    }
    getDefaultParams(): {}[] {
        return this._defaultParams
    }
    setActiveView(viewName: string) {
        this._activeView = viewName;
    }
    getActiveView() {
        this._activeView = this._activeView ? this._activeView : (this._di.has('view') ? 'view' : 0);
        return this._di.get('viewManager').getView(this._activeView);
    }
    protected beforeHandle(mod?: string, controller?: string, action?: string, params?: {}[]) {
        //console.log('before handle > setting defaults');
        //this.getActiveView().parse();
        this.setDefaultModule(mod);
        this.setDefaultController(controller);
        this.setDefaultAction(action);
        this.setDefaultParams(params);
    }

    handle(mod?: string, controller?: string, action?: string, params?: {}[]): void {
        this.beforeHandle(mod, controller, action, params);
        this._dispatcher.setModule(this.getDefaultModule());
        this._dispatcher.setControllerName(this.getDefaultController());
        this._dispatcher.setActionName(this.getDefaultAction());
        this._dispatcher.setParams(this.getDefaultParams());
        this._dispatcher.dispatch();
        this.afterHandle();
    }

    protected beforeRender() {
        //console.log('before render..');
    }
    protected afterRender() {
        //console.log('after render..');
    }

    protected afterHandle() {
        //console.log('after handle');
        this.beforeRender();
        let view = this.getActiveView();
        view.render();
        this.afterRender();
        this._findEvents();
        this._findListeners();
    }

    /**
    * Set the dependency injection container.
    * @param {object} di : The dependency injection container.
    */
    setDi(di: DiInterface): void {
        this._di = di;
    }
    /**
     * Returns the dependecy injection container.
     * @return {object} : The dependency injection container.
     */
    getDi(): DiInterface {
        return this._di;
    }
}