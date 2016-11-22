import {ControllerInterface} from './Controller/ControllerInterface';
import {DiInterface} from '../Di/DiInterface';
import {InjectionAwareInterface} from '../Di/InjectionAwareInterface';
import {View} from './View';
import {DispatcherInterface} from './Dispatcher/DispatcherInterface';

export abstract class Controller implements ControllerInterface, InjectionAwareInterface {

    private _di: DiInterface;
    protected view: View;
    protected dispatcher: DispatcherInterface;

    constructor() { }

    protected onInitialize(): any { }

    setView(view: any): void {
        if (typeof view === 'object' && view instanceof View) {
            this.view = view;
        } else if (typeof view === 'string') {
            this.view = this._di.get('viewManager').getView(view)
        }
    }
    getView(): View {
        return this.view;
    }

    protected setServices() {
        if (this._di.has('view')) {
            this.view = this._di.get('view');
        } else {
            this.view = this._di.get('application').getActiveView();
        }
        if (this._di.has('dispatcher')) {
            this.dispatcher = this._di.get('dispatcher')
        }
    }
    /**
     * Set the dependency injection container.
     * @param {object} di : The dependency injection container.
     */
    setDi(di: DiInterface): void {
        this._di = di;
        this.setServices();
    }
    /**
    * Returns the dependecy injection container.
    * @return {object} : The dependency injection container.
    */
    getDi(): DiInterface {
        return this._di;
    }
}