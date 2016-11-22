import {ApplicationInterface} from './Application/ApplicationInterface';
import {InjectionAwareInterface} from '../DI/InjectionAwareInterface';
import {DiInterface} from '../Di/DiInterface';
import {Controller} from './Controller';
import {View} from './View';
import {DispatcherInterface} from './Dispatcher/DispatcherInterface';
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
    protected _dispatcher: DispatcherInterface;

    protected _dataApplicationPrefix: string;
    protected _dataControllerPrefix: string;
    protected _dataActionPrefix: string;
    protected _dataModulePrefix: string;

    constructor(di: DiInterface) {
        this.setDi(di);
        this._dispatcher = this.getDi().get('dispatcher');
        this.getDi().set('application', this, true);
        this.getDi().set('viewManager', new ViewManager(this.getDi()), true);
        if (this.getDi().has('view')) {
            this.getDi().get('viewManager').addView(this.getDi().get('view'));
        }
    }
    setDataApplicationPrefix(prefix: string) {
        this._dataApplicationPrefix = prefix;
    }
    getDataApplicationPrefix(): string {
        return this._dataApplicationPrefix;
    }
    protected _findModules() { }
    protected _findViews() {
        let prefix = (this._dataApplicationPrefix ? this._dataApplicationPrefix + '-' : '') + 'view';
        let _query = '[data-' + prefix + ']';
        let _dataName = StringHelper.camelize(prefix);
        let _views = document.querySelectorAll(_query);
        for (let i = 0; i < _views.length; i++) {
            let el = <HTMLElement>_views[i];
            let viewInstance = new View(el).setName(el.dataset[_dataName]);
            this._di.get('viewManager').addView(viewInstance);
        }
    }

    protected _initialize() {

        let prefix = this._dataModulePrefix ? this._dataModulePrefix + '-' : '';
        let _mQuery = '[data-' + prefix + 'module]';
        let _m = document.querySelectorAll(_mQuery);
        for (let i = 0; i < _m.length; i++) {
            let e = <HTMLElement>_m[i];
            let events = e.querySelectorAll('[data-event]');
            for (let _i = 0; _i < events.length; _i++) {
                let _e = <HTMLElement>events[_i];
                let _controller = _e.dataset['controller'];
                let _action = _e.dataset['action'];
                //let _module = _e.dataset['module'] || this.getDefaultModule();
                let _this = this;
                _e.addEventListener(_e.dataset['event'], function() {
                    _this._dispatcher.forward(_controller, _action);
                });

            }
            let n = StringHelper.uncapitalize(StringHelper.camelize(prefix + 'module'));
            if (i == 0) {
                this.setDefaultModule(e.dataset[n]);
            }
            let __m = {};
            __m[e.dataset[n]] = this.getDi().get(e.dataset[n]);
            this.registerModules(__m, true);
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
        switch (typeof mod) {
            case 'object':
                this._modules['default'] = mod;
                this._defaultModule = 'default';
                break;
            case 'string':
                let i = this._modules[mod] ? this._modules[mod] : this.getDi().get(mod);
                this._defaultModule = mod;
                this._modules[mod] = i;
        }
    }
    getDefaultModule(): {} {
        return this._modules[this._defaultModule];
    }
    beforeHandle() {
        console.log('before handle');

    }
    private _handle(): void {

        this._initialize();
        this._dispatcher.setModule(this.getDefaultModule());
        this._dispatcher.dispatch();
        this.afterHandle();
    }
    handle(): void {
        let _this = this;
        this.beforeHandle();
        this.loop();
        this.afterHandle();
    }
    afterHandle() {
        console.log('after handle');

    }
    loop() {
        // render views
        //this._di.get('view').render();
        this._initialize();
        this._dispatcher.setModule(this.getDefaultModule());
        this._dispatcher.dispatch();
        this._di.get('view').render();
        this._initialize();
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