export interface ServiceInterface {
	setName(serviceName:string):void;
	getName():string;
	setShared(shared:boolean):void;
	isShared():boolean;
	setService(service:any):void;
	getService():any;
	setParameters(parameters:any[]):void;
	getParameters():any[];
	isResolved():boolean;
	resolve():any;
}