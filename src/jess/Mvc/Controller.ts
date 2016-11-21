import {ControllerInterface} from './Controller/ControllerInterface';
import {DiInterface} from '../Di/DiInterface';
import {InjectionAwareInterface} from '../Di/InjectionAwareInterface';
import {View} from './View' ;

export abstract class Controller implements ControllerInterface, InjectionAwareInterface {
    private _di: DiInterface;
    protected view:View ;
    
    constructor(){
        this.onInitialize();
    }
    
    protected onInitialize():any{}
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