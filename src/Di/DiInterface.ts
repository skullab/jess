export interface DiInterface {
    /**
     * Set a service into dependency injection.
     * @param {string} serviceName : The name of the service.
     * @param {any} service : The service to store.
     * @param {boolean} shared? : Optional, set if the service is shared or not.
     */
    set(serviceName:string,service:any,shared?:boolean):void;
    /**
     * Returns a service.
     * @param {string} serviceName : The service name.
     * @return {any} : The service.
     */
    get(serviceName:string):any;
    /**
     * Set a shared service into dependency injection.
      * @param {string} serviceName : The name of the service.
     *  @param {any} service : The service to store.
     */
    setShared(serviceName:string,service:any):void;
    /**
     * Returns a shared service.
     * @param {string} serviceName : The service name.
     * @return {any} : The service.
     */
    getShared(serviceName:string):any;
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