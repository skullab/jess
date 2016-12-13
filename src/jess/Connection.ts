import {ConnectionInterface} from './Connection/ConnectionInterface';
import {ConnectionListener} from './Connection/ConnectionListener';
import {InjectionAwareInterface} from './Di/InjectionAwareInterface';
import {DiInterface} from './Di/DiInterface';
import {HttpRequest} from './Http/HttpRequest';
import {HttpResponse} from './Http/HttpResponse';
import {HttpListener} from './Http/HttpListener';

export class Connection implements ConnectionInterface, InjectionAwareInterface, HttpListener {
    protected _di: DiInterface;
    protected _baseUri: string;
    protected _createUri: string = '';
    protected _readUri: string = '';
    protected _updateUri: string = '';
    protected _deleteUri: string = '';

    protected _createMethod: string;
    protected _readMethod: string;
    protected _updateMethod: string;
    protected _deleteMethod: string;
    protected _httpRequest: HttpRequest;
    protected _callback: any;

    constructor(base_uri?: string) {
        base_uri = base_uri || './';
        this.setBaseUri(base_uri);
        this.setCreateMethod('POST');
        this.setReadMethod('GET');
        this.setUpdateMethod('PUT');
        this.setDeleteMethod('DELETE');
    }

    protected _resolveRequest(method: string, uri: string, data: any) {
        if (typeof data === 'string') {
            this._httpRequest.setData(data);
        } else if (typeof data === 'object') {
            this._httpRequest.setParams(data);
        }
        switch (method.toUpperCase()) {
            case 'POST':
                this._httpRequest.post(uri);
                break;
            case 'GET':
                this._httpRequest.get(uri);
                break;
            case 'PUT':
                this._httpRequest.put(uri);
                break;
            case 'DELETE':
                this._httpRequest.delete(uri);
                break;
        }
    }
    create(data: any) {
        let uri = this.getBaseUri() + this.getCreateUri();
        this._resolveRequest(this.getCreateMethod(), uri, data);
    }
    read(data: any) {
        let uri = this.getBaseUri() + this.getReadUri();
        this._resolveRequest(this.getReadMethod(), uri, data);
    }
    update(data: any) {
        let uri = this.getBaseUri() + this.getUpdateUri();
        this._resolveRequest(this.getUpdateMethod(), uri, data);
    }
    delete(data: any) {
        let uri = this.getBaseUri() + this.getDeleteUri();
        this._resolveRequest(this.getDeleteMethod(), uri, data);
    }
    setBaseUri(uri: string) {
        this._baseUri = uri;
    }
    getBaseUri(): string {
        return this._baseUri;
    }

    setCreateMethod(method: string): void {
        this._createMethod = method;
    }
    getCreateMethod(): string {
        return this._createMethod;
    }
    setCreateUri(uri: string): void {
        this._createUri = uri;
    }
    getCreateUri(): string {
        return this._createUri;
    }
    setReadMethod(method: string): void {
        this._readMethod = method;
    }
    getReadMethod(): string {
        return this._readMethod;
    }
    setReadUri(uri: string): void {
        this._readUri = uri;
    }
    getReadUri(): string {
        return this._readUri;
    }
    setUpdateMethod(method: string): void {
        this._updateMethod = method;
    }
    getUpdateMethod(): string {
        return this._updateMethod;
    }
    setUpdateUri(uri: string): void {
        this._updateUri = uri;
    }
    getUpdateUri(): string {
        return this._updateUri;
    }
    setDeleteMethod(method: string): void {
        this._deleteMethod = method;
    }
    getDeleteMethod(): string {
        return this._deleteMethod;
    }
    setDeleteUri(uri: string): void {
        this._deleteUri = uri;
    }
    getDeleteUri(): string {
        return this._deleteUri;
    }
    protected setServices() {
        this._httpRequest = this._di.get('httpRequest');
        this._httpRequest.setHttpListener('connectionListener', this);
    }

    onResponse(callback: (state: string, response: HttpResponse, event: Event) => void) {
        this._callback = callback;
    }
    onTimeout(event: Event, response: HttpResponse): void {
        if (typeof this._callback === 'function') {
            this._callback('timeout',response,event);
        }
    }
    onAbort(event: Event, response: HttpResponse): void {
        if (typeof this._callback === 'function') {
            this._callback('abort',response,event);
        }
    }
    onError(event: Event, response: HttpResponse): void {
        if (typeof this._callback === 'function') {
            this._callback('error',response,event);
        }
    }
    onLoad(event: Event, response: HttpResponse): void {
        if (typeof this._callback === 'function') {
            this._callback('load',response,event);
        }
    }
    onLoadEnd(event: Event, response: HttpResponse): void {
        if (typeof this._callback === 'function') {
            this._callback('loadend',response,event);
        }
    }
    onLoadStart(event: Event, response: HttpResponse): void {
        if (typeof this._callback === 'function') {
            this._callback('loadstart',response,event);
        }
    }
    onProgress(event: Event, response: HttpResponse): void {
        if (typeof this._callback === 'function') {
            this._callback('progress',response,event);
        }
    }

    setDi(di: DiInterface): void {
        this._di = di;
        this.setServices();
    }
    getDi(): DiInterface {
        return this._di;
    }

}