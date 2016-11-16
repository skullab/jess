export interface ServiceInterface {
	setName(serviceName:string):void;
	getName():string;
	setShared(shared:boolean):void;
	isShared():boolean;
	setService(service:any):void;
	getService():any;
	resolve():any;
}