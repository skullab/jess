import {DiInterface} from './Di/DiInterface';
import {Service} from './Di/Service';

export class Di implements DiInterface {
    protected _services: {} = {};

    set(serviceName: string, service: any, shared?: boolean): void {
		shared = shared || false;
		this._services[serviceName] = new Service(serviceName, service, shared);
    }

    get(serviceName: string): any {

    }
    setShared(serviceName: string, service: any): void {
        this.set(serviceName, service, true);
    }
    getShared(serviceName: string): any {
		if (this.has(serviceName) && this._services[serviceName].isShared()) {
			
		}
		throw new Error("Service '" + serviceName + "' was not found in the dependency injection container");
	}
    has(serviceName: string): boolean {
		return this._services.hasOwnProperty(serviceName);
    }
    remove(serviceName: string): void {
		if (this.has(serviceName)) {
			delete this._services[serviceName];
		}
	}
    reset(): void {
		for (let i in this._services) {
			this.remove(i);
		}
		this._services = {};
	}
}