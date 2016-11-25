import {HttpRequest} from './HttpRequest';
export class HttpResponse {

    protected _request: HttpRequest;

    public response: any;
    public responseText: string;
    public responseType: string;
    public responseUrl: string;
    public responseXml: any;
    public status: number;
    public statusText: string;
    public responseHeaders: string;
    
    public rawRequest;

    constructor(request: HttpRequest) {
        this._request = request;
        this.rawRequest = request.getRawRequest();
        this._resolve();
    }

    protected _resolve(): void {
        this.response = this._request.getResponse();
        this.responseType = this._request.getResponseType();
        if (this.responseType == HttpRequest.RESPONSE_TEXT || this.responseType == '') {
            this.responseText = this._request.getResponseText();
        } else if (this.responseType == HttpRequest.RESPONSE_JSON) {
            this.responseText = JSON.stringify(this.response);
        }
        if (this.responseType == HttpRequest.RESPONSE_DOCUMENT || this.responseType == '') {
            this.responseXml = this._request.getResponseXml();
        }
        this.responseUrl = this._request.getResponseUrl();
        this.responseHeaders = this._request.getAllResponseHeaders();
        this.status = this._request.getStatus();
        this.statusText = this._request.getStatusText();
    }

    toJSON(): any {
        if (this.responseType == HttpRequest.RESPONSE_JSON) {
            return this.response;
        }
        if (this.responseType == HttpRequest.RESPONSE_TEXT || this.responseType == '') {
            return JSON.parse(this.response);
        }
    }

}