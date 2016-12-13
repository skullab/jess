import {HttpResponse} from '../Http/HttpResponse' ;

export interface ConnectionInterface {
    create(data:any);
    read(data:any);
    update(data:any);
    delete(data:any);
    setBaseUri(uri:string);
    getBaseUri():string;
    setCreateMethod(method:string):void;
    getCreateMethod():string;
    setCreateUri(uri:string):void;
    getCreateUri():string;
    setReadMethod(method:string):void;
    getReadMethod():string;
    setReadUri(uri:string):void;
    getReadUri():string;
    setUpdateMethod(method:string):void;
    getUpdateMethod():string;
    setUpdateUri(uri:string):void;
    getUpdateUri():string;
    setDeleteMethod(method:string):void;
    getDeleteMethod():string;
    setDeleteUri(uri:string):void;
    getDeleteUri():string;
    onResponse(callback: (state: string, response: HttpResponse, event: Event) => void);
}