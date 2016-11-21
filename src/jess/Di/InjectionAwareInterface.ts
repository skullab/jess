import {DiInterface} from './DiInterface';
export interface InjectionAwareInterface {
    /**
     * Set the dependency injection container.
     * @param {object} di : The dependency injection container.
     */
    setDi(di:DiInterface):void;
    /**
     * Returns the dependecy injection container.
     * @return {object} : The dependency injection container.
     */
    getDi():DiInterface;
}