import {HttpRequest} from './HttpRequest';
export class HttpResponse {
	
	static ARRAY_BUFFER = "arraybuffer";
    static BLOB = "blob";
    static DOCUMENT = "document";
    static JSON = "json";
    static TEXT = "text";
	
    protected _request: XMLHttpRequest;

    public response: any;
    public responseText: string;
    public responseType: string;
    public responseUrl: string;
    public responseXml: any;
    public status: number;
    public statusText: string;
    public responseHeaders: string;
	public upload: XMLHttpRequestUpload;

    constructor(request: XMLHttpRequest) {
        this._request = request;
        this._resolve();
    }

    protected _resolve(): void {
        this.response = this._request.response;
        this.responseType = this._request.responseType;
        if (this.responseType == HttpResponse.TEXT || this.responseType == '') {
            this.responseText = this._request.responseText;
        } else if (this.responseType == HttpResponse.JSON) {
            this.responseText = JSON.stringify(this.response);
        }
        if (this.responseType == HttpResponse.DOCUMENT || this.responseType == '') {
            this.responseXml = this._request.responseXML;
        }
        this.responseUrl = this._request['responseURL'];
        this.responseHeaders = this._request.getAllResponseHeaders();
        this.status = this._request.status;
        this.statusText = this._request.statusText;
		this.upload = this._request.upload;
    }

	getResponseHeader(name: string): string {
        return this._request.getResponseHeader(name);
    }
	getTag(): string {
		return this._request['tag'] ;
	}
    toJSON(): any {
        if (this.responseType == HttpResponse.JSON) {
            return this.response;
        }
        if (this.responseType == HttpResponse.TEXT || this.responseType == '') {
            return JSON.parse(this.response);
        }
    }

}