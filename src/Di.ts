import {DiInterface} from './Di/DiInterface';

export class Di implements DiInterface {
    protected _services: {} = {};
    protected _sharedServices: {} = {};

    set(serviceName: string, service: any, shared?: boolean): void {
        shared = shared || false ;
    }
    get(serviceName: string): any {
         
    }
    setShared(serviceName: string, service: any): void {
        this.set(serviceName, service, true);
    }
    getShared(serviceName: string): any { }
    has(serviceName: string): boolean {
        return this._services.hasOwnProperty(serviceName);
    }
    remove(serviceName: string): void { }
    reset(): void { }
}