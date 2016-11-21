import {DiInterface} from './Di/DiInterface';
import {ServiceInterface} from './Di/Service/ServiceInterface';
import {Service} from './Di/Service';

export class Di implements DiInterface {

    protected _services: {} = {};

    /**
     * Set a service into dependency injection.
     * @param {string} serviceName : The name of the service.
     * @param {any} service : The service to store.
     * @param {boolean} shared? : Optional, set if the service is shared or not.
     */
    set(serviceName: string, service: any, shared?: boolean): ServiceInterface {
        shared = shared || false;
        return this._services[serviceName] = new Service(serviceName, service, shared, this);
    }
    /**
     * Returns a service.
     * @param {string} serviceName : The service name.
     * @param {array} parameters : Optional parameters to pass to service's instance.
     * @return {any} : The resolving service.
     */
    get(serviceName: string, parameters: any[] = []): any {
        if (this.has(serviceName)) {

            let raw = this._services[serviceName];
            if (parameters.length > 0)
                raw.setParameters(parameters);
            return raw.resolve();

        }
        throw new Error("Service '" + serviceName + "' was not found in the dependency injection container");
    }
    getServices() {
        let s = {};
        for (let name in this._services) {
            s[name] = this.get(name);
        }
        return s ;
    }
    /**
     * Set a service object
     * @param {string} serviceName : The name of the service.
     * @param {object} service : The service object that implements ServiceInterface.
     */
    setRaw(serviceName: string, service: ServiceInterface): void {
        this._services[serviceName] = service;
    }
    /**
     * Returns a service object without resolving.
     * @return {object} : The service object that implements ServiceInterface.
     */
    getRaw(serviceName: string): ServiceInterface {
        if (this.has(serviceName)) {
            return this._services[serviceName];
        }
    }
    /**
     * Set a shared service into dependency injection.
     * This is a shortcut for method [set]{@link DiInterface#set}
      * @param {string} serviceName : The name of the service.
     *  @param {any} service : The service to store.
     */
    setShared(serviceName: string, service: any): ServiceInterface {
        return this.set(serviceName, service, true);
    }
    /**
     * Checks if service exists.
     * @param {string} serviceName : The service name.
     * @return {boolean} : true if service exists otherwise false. 
     */
    has(serviceName: string): boolean {
        return this._services.hasOwnProperty(serviceName);
    }
    /**
     * Remove a service from dependency injection.
     * @param {string} serviceName : The service name to remove.
     */
    remove(serviceName: string): void {
        if (this.has(serviceName)) {
            delete this._services[serviceName];
        }
    }
    /**
     * Reset the dependency injection container.
     */
    reset(): void {
        for (let i in this._services) {
            this.remove(i);
        }
        this._services = {};
    }
}