import {DispatcherInterface} from './Dispatcher/DispatcherInterface';
import {InjectionAwareInterface} from '../Di/InjectionAwareInterface';
import {DiInterface} from '../Di/DiInterface';
import {Controller} from './Controller';
import {StringHelper} from '../util/StringHelper';

export class Dispatcher implements DispatcherInterface, InjectionAwareInterface {

    protected _di: DiInterface;
    protected _controllerSuffix: string;
    protected _actionSuffix: string;
    protected _activeModule: {};
    protected _activeControllerName: string;
    protected _activeActionName: string;
    protected _activeParams: {}[];
    protected _dispatched: boolean;

    constructor() {
        this.setActionSuffix('Action');
        this.setControllerSuffix('Controller');
    }
    setModule(m: {}): void {
        this._activeModule = m;
    }
    getModule(): any {
        return this._activeModule;
    }
    setControllerSuffix(suffix: string): void {
        this._controllerSuffix = suffix;
    }
    getControllerSuffix(): string {
        return this._controllerSuffix;
    }
    setControllerName(name: string): void {
        this._activeControllerName = name;
    }
    getControllerName(): string {
        return this._activeControllerName;
    }
    setActionSuffix(suffix: string): void {
        this._actionSuffix = suffix;
    }
    getActionSuffix(): string {
        return this._actionSuffix;
    }
    setActionName(name: string): void {
        this._activeActionName = name;
    }
    getActionName(): string {
        return this._activeActionName;
    }
    setParams(params: {}[]): void {
        this._activeParams = params;
    }
    getParams(): {}[] {
        return this._activeParams;
    }
    dispatch(): void {
        if (!this._di) {
            throw new Error("A dependency injection container is required to access related dispatching services");
        }

        this._dispatched = false;

        while (!this.isFinished()) {
            let _module = this.getModule();
            if (!_module) {
                throw new Error("No Module declared");
            }
            let _controllerName = StringHelper.capitalize(StringHelper.camelize(this.getControllerName())) + this.getControllerSuffix();

            if (_module.hasOwnProperty(_controllerName)) {
                let _controllerInstance = typeof _module[_controllerName] === 'function' ? new _module[_controllerName]() : _module[_controllerName];

                if (_controllerInstance instanceof Controller) {

                    _controllerInstance.setDi(this.getDi());
                    let _s = this.getDi().getServices();
                    for (let i in _s) {
                        _controllerInstance[i] = _s[i] ;
                    }
                }

                let _actionName = StringHelper.camelize(this.getActionName()) + this.getActionSuffix();

                //console.log(_actionName)
                //console.log(_controllerInstance);

                if (typeof _controllerInstance[_actionName] === 'function') {

                    _controllerInstance[_actionName].apply(_controllerInstance, this.getParams());

                } else {
                    throw new Error("Action '" + this.getActionName() + "' was not found on controller '" + this.getControllerName() + "'");
                }
            } else {
                throw new Error("Controller '" + this.getControllerName() + "' was not found");
            }

            this._dispatched = true;
        }
    }
    forward(controller: string, action: string, params?: {}[]) {
        this._activeControllerName = controller;
        this._activeActionName = action;
        this._activeParams = params;
        this.dispatch();
    }
    isFinished(): boolean {
        return this._dispatched;
    }
    /**
    * Set the dependency injection container.
    * @param {object} di : The dependency injection container.
    */
    setDi(di: DiInterface): void {
        this._di = di;
        this._di.set('dispatcher', this, true);
    }
    /**
     * Returns the dependecy injection container.
     * @return {object} : The dependency injection container.
     */
    getDi(): DiInterface {
        return this._di;
    }
}