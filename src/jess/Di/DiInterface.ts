import {ServiceInterface} from './Service/ServiceInterface';

export interface DiInterface {
    /**
     * Set a service into dependency injection.
     * @param {string} serviceName : The name of the service.
     * @param {any} service : The service to store.
     * @param {boolean} shared? : Optional, set if the service is shared or not.
     * 
     * @return {object} : The raw Service object.
     */
    set(serviceName:string,service:any,shared?:boolean):ServiceInterface;
    /**
     * Returns a service.
     * @param {string} serviceName : The service name.
     * @param {array} parameters : Optional parameters to pass to service's instance.
     * @return {any} : The resolving service.
     */
    get(serviceName:string,parameters?:any[]):any;
    getServices():{};
    /**
     * Set a raw service object
     * @param {string} serviceName : The name of the service.
     * @param {object} service : The service object that implements ServiceInterface.
     */
    setRaw(serviceName:string,service:ServiceInterface):void;
    /**
     * Returns a raw service object without resolving.
     * @return {object} : The service object that implements ServiceInterface.
     */
    getRaw(serviceName:string):ServiceInterface;
    /**
     * Set a shared service into dependency injection.
     * This is a shortcut for method [set]{@link DiInterface#set}
      * @param {string} serviceName : The name of the service.
     *  @param {any} service : The service to store.
     * 
     * @return {object} : The raw Service object. 
     */
    setShared(serviceName:string,service:any):ServiceInterface;
    /**
     * Checks if service exists.
     * @param {string} serviceName : The service name.
     * @return {boolean} : true if service exists otherwise false. 
     */
    has(serviceName:string):boolean;
    /**
     * Remove a service from dependency injection.
     * @param {string} serviceName : The service name to remove.
     */
    remove(serviceName:string):void;
    /**
     * Reset the dependency injection container.
     */
    reset():void;
}