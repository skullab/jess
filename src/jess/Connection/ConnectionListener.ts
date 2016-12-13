import {HttpListener} from '../Http/HttpListener';
import {HttpResponse} from '../Http/HttpResponse';
import {Connection} from '../Connection';

export class ConnectionListener implements HttpListener {
    protected _connection: Connection;

    constructor(connection: Connection) {
        this._connection = connection ;
    }
    onTimeout(event: Event, response: HttpResponse): void { }
    onAbort(event: Event, response: HttpResponse): void { }
    onError(event: Event, response: HttpResponse): void { }
    onLoad(event: Event, response: HttpResponse): void {
        console.log(response.getListenerName());
        console.log(response.response);
    }
    onLoadEnd(event: Event, response: HttpResponse): void { }
    onLoadStart(event: Event, response: HttpResponse): void { }
    onProgress(event: Event, response: HttpResponse): void { }
}