import {ControllerInterface} from './Controller/ControllerInterface';
import {DiInterface} from '../Di/DiInterface';
import {InjectionAwareInterface} from '../Di/InjectionAwareInterface';
import {View} from './View';

export abstract class Controller implements ControllerInterface, InjectionAwareInterface {
    private _di: DiInterface;
    protected view: View;
    protected element: Element;

    constructor() {}

    protected onInitialize(): any { }

    setRootElement(element: Element) {
        this.element = element;
    }
    getRootElement(): Element {
        return this.element ;
    }
    setView(view: any): void {
        if (typeof view === 'object' && view instanceof View) {
            this.view = view;
        } else if (typeof view === 'string') {
            this.view = this.getDi().get(view);
        }
    }
    getView(): View {
        return this.view;
    }
    /**
     * Set the dependency injection container.
     * @param {object} di : The dependency injection container.
     */
    setDi(di: DiInterface): void {
        this._di = di;
        let _s = this._di.getServices();
        for (let name in _s) {
            this[name] = _s[name];
        }
    }
    /**
    * Returns the dependecy injection container.
    * @return {object} : The dependency injection container.
    */
    getDi(): DiInterface {
        return this._di;
    }
}