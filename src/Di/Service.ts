import {ServiceInterface} from './Service/ServiceInterface';
export class Service implements ServiceInterface {

    protected _name: string;
    protected _service: any;
    protected _shared: boolean;
    protected _instance = null;
	protected _resolved: boolean = false;
	protected _parameters: any[] = [];
	protected _di: {} = {};

    constructor(serviceName: string, service: any, shared: boolean, di: {}) {
        this.setName(serviceName);
        this.setService(service);
        this.setShared(shared);
		this._di = di;
    }
    setName(serviceName: string): void {
        this._name = serviceName;
    }
    getName(): string {
        return this._name;
    }
    setShared(shared: boolean): void {
        this._shared = shared;
    }
    isShared(): boolean {
        return this._shared;
    }
    setService(service: any): void {
        this._service = service;
    }
    getService(): any {
        return this._service;
    }
	setParameters(parameters: any[]): void {
		this._parameters = parameters;
	}
	getParameters(): any[] {
		return this._parameters;
	}
	isResolved(): boolean {
		return this._resolved;
	}
    resolve(): any {
		if (!this.isResolved() || !this.isShared()) {
            console.log('resolving..');
			switch (typeof this._service) {
				case 'function':
					if (!this._instance || !this.isShared()) {
                        console.log('new instance..');
						this._instance = this._service.apply(this._di, this.getParameters());
					}
					break;
				default:
					this._instance = this._service;
			}
			if (this._instance && typeof this._instance['setDi'] === 'function') {
				this._instance.setDi(this._di);
			}
            this._resolved = true;
		}

        return this._instance;
    }
}