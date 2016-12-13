import {ConnectionInterface} from '../../Connection/ConnectionInterface' ;

export interface ModelInterface {
	setSource(source:string):void;
	getSource():string;
	setSchema(schema:string):void;
	getSchema():string;
	setCreateMethod(method:string):void;
    setReadMethod(method:string):void;
    setUpdateMethod(method:string):void;
    setDeleteMethod(method:string):void;
    setConnectionService(connection:ConnectionInterface);
    getConnectionService():ConnectionInterface;
    getColumns():{};
	create(data:any);
	update(data:any);
	delete(data:any);
	save(data:any);
	count();
}