import {ServiceInterface} from './Service/ServiceInterface';
export class Service implements ServiceInterface {

	protected _name: string;
	protected _service: any;
	protected _shared: boolean;
	constructor(serviceName: string, service: any, shared: boolean) {
		this.setName(serviceName);
		this.setService(service);
		this.setShared(shared);
	}
	setName(serviceName: string): void {
		this._name = serviceName;
	}
	getName(): string {
		return this._name;
	}
	setShared(shared: boolean): void {
		this._shared = shared ;
	}
	isShared(): boolean {
		return this._shared ; 
	}
	setService(service: any): void {
		this._service = service ; 
	}
	getService(): any {
		return this._service ; 
	}
	resolve() {
		 
	}
}