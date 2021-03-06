import {HttpRequestListener} from './HttpRequestListener';
import {HttpResponse} from './HttpResponse';

export class HttpRequest {

    static OPTIONS = 'OPTIONS';
    static GET = 'GET';
    static HEAD = 'HEAD';
    static POST = 'POST';
    static PUT = 'PUT';
    static DELETE = 'DELETE';
    static TRACE = 'TRACE';
    static CONNECT = 'CONNECT';
    static PATCH = 'PATCH';

    static RESPONSE_ARRAY_BUFFER = "arraybuffer";
    static RESPONSE_BLOB = "blob";
    static RESPONSE_DOCUMENT = "document";
    static RESPONSE_JSON = "json";
    static RESPONSE_TEXT = "text";

    static STATE_UNSENT = 0;
    static STATE_OPENED = 1;
    static STATE_HEADERS_RECEIVED = 2;
    static STATE_LOADING = 3;
    static STATE_DONE = 4;

    protected _request: XMLHttpRequest;
    protected _data: any;
    protected _bypassCache: boolean = false;
    protected _url: string;
    protected _method: string;
    protected _async: boolean = true;
    protected _username: string;
    protected _password: string;
    protected _responseType: string = "text";
    protected _timeout: number = 0;
    protected _credentials: boolean = false;
    protected _listener: HttpRequestListener;
    protected _listenerInit: boolean = false;
    protected _response: HttpResponse;
    protected _onreadystatechangeCallback: any;
    protected _params: {};

    constructor() {

    }
    protected _createResponse(e) {
        if (this.isDone()) {
            this._response = new HttpResponse(this);
        }
    }
    getRawData() {
        return this._data;
    }
    setRawData(data: any) {
        this._data = data;
    }
    setParams(params: {}): void {
        this._params = params;
    }
    getParams(): any {
        return this._params;
    }
    getParam(name: string): any {
        return this._params[name];
    }
    appendParam(name: string, value: any) {
        this._params[name] = value;
    }
    getRawRequest() {
        return this._request;
    }
    onreadystatechange(callback: (e?) => void): void {
        //this._request.addEventListener('readystatechange', callback, false);
        this._onreadystatechangeCallback = callback;
    }
    abort(): void {
        this._request.abort();
    }
    getAllResponseHeaders() {
        return this._request.getAllResponseHeaders();
    }
    getResponseHeader(name: string): string {
        return this._request.getResponseHeader(name);
    }
    overrideMimeType(mimeType: string): void {
        this._request.overrideMimeType(mimeType);
    }
    setRequestHeader(header: string, value: string): void {
        this._request.setRequestHeader(header, value);
    }
    setUrl(url: string): void {
        this._url = url;
    }
    getUrl(): string {
        return this._url;
    }
    setData(data: any): void {
        this._data = data;
    }
    getData(): any {
        return this._data;
    }
    setUsername(username: string) {
        this._username = username;
    }
    getUsername(): string {
        return this._username;
    }
    setPassword(password: string) {
        this._password = password;
    }
    getPassword(): string {
        return this._password;
    }
    setMethod(method: string) {
        this._method = method.toUpperCase();
    }
    getMethod(): string {
        return this._method;
    }
    setResponseType(responseType: string) {
        this._responseType = responseType;
    }
    getResponseType(): string {
        return this._responseType;
    }
    readyState(): number {
        return this._request.readyState;
    }
    bypassCache(bypass: boolean) {
        this._bypassCache = bypass;
        /*var oReq = new XMLHttpRequest();

        oReq.open("GET", url + ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime());
        oReq.send(null);*/
    }
    isUnset(): boolean {
        return this.readyState() == HttpRequest.STATE_UNSENT;
    }
    isOpened(): boolean {
        return this.readyState() == HttpRequest.STATE_OPENED;
    }
    isHeadersReceived(): boolean {
        return this.readyState() == HttpRequest.STATE_HEADERS_RECEIVED;
    }
    isLoading(): boolean {
        return this.readyState() == HttpRequest.STATE_LOADING;
    }
    isDone() {
        return this.readyState() == HttpRequest.STATE_DONE;
    }
    protected beforeOpen(method: string, url: string, async: boolean = true, user: string = null, password: string = null) {
        // RESET
        this.reset();
        // 
        this.setMethod(method);
        if (this._bypassCache) {
            url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();
        }
        this.setUrl(url);
        this.setAsync(async);
        this.setUsername(user);
        this.setPassword(password);
        //LISTENER
        if (this._listener && !this._listenerInit) {
            let _this = this;
            this._request.onabort = function(e) {
                _this._listener.onAbort(e, _this);
            }
            this._request.onerror = function(e) {
                _this._listener.onError(e, _this);
            }
            this._request.onload = function(e) {
                _this._listener.onLoad(e, _this);
            }
            this._request.onloadend = function(e) {
                _this._listener.onLoadEnd(e, _this);
            }
            this._request.onloadstart = function(e) {
                _this._listener.onLoadStart(e, _this);
            }
            this._request.onprogress = function(e) {
                _this._listener.onProgress(e, _this);
            }
            this._request.ontimeout = function(e) {
                _this._listener.onTimeout(e, _this);
            }
            this._listenerInit = true;
        }
    }
    open(method: string, url: string, async: boolean = true, user: string = null, password: string = null) {
        this.beforeOpen(method, url, async, user, password);
        this._request.open(this.getMethod(), this.getUrl(), this.isAsync(), this.getUsername(), this.getPassword());
        this.afterOpen();
    }
    protected afterOpen() {
        if (this.isAsync()) {
            this._request.responseType = this.getResponseType();
            this._request.timeout = this.getTimeout();
            if (this.isCorsEnabled()) {
                this._request.withCredentials = this.getCredentials();
            }
        }
    }
    //*************************************************************************************
    get(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.GET, url, async, user, password);
    }
    post(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.POST, url, async, user, password);
    }
    head(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.HEAD, url, async, user, password);
    }
    put(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.PUT, url, async, user, password);
    }
    delete(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.DELETE, url, async, user, password);
    }
    trace(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.TRACE, url, async, user, password);
    }
    connect(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.CONNECT, url, async, user, password);
    }
    patch(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.PATCH, url, async, user, password);
    }
    options(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.OPTIONS, url, async, user, password);
    }
    //*************************************************************************************
    getHttpResponse(): HttpResponse {
        return this._response;
    }
    getResponse(): any {
        return this._request.response;
    }
    getResponseText(): string {
        return this._request.responseText;
    }
    getResponseUrl(): string {
        return this._request['responseURL'];
    }
    getResponseXml(): any {
        return this._request.responseXML;
    }
    getStatus(): number {
        return this._request.status;
    }
    getStatusText(): string {
        return this._request.statusText;
    }
    setTimeout(timeout: number): void {
        this._timeout = timeout;
    }
    getTimeout(): number {
        return this._timeout;
    }
    getUpload(): XMLHttpRequestUpload {
        return this._request.upload;
    }
    setCredentials(credentials: boolean) {
        this._credentials = credentials;
    }
    getCredentials(): boolean {
        return this._credentials;
    }
    protected beforeSend(data: any) {
        this._data = data || this._data;
        if (!this._data) {
            
        }

    }
    send(data: any = null) {
        this.beforeSend(data);
        this._request.send(data);
        this.afterSend();
    }
    protected afterSend() {

    }
    setHttpRequestListener(listener: HttpRequestListener): void {
        this._listener = listener;
        this._listenerInit = false;
    }
    getHttpRequestListener(): HttpRequestListener {
        return this._listener;
    }
    setAsync(async: boolean) {
        this._async = async;
    }
    isAsync(): boolean {
        return this._async;
    }
    isCorsEnabled() {
        return this._request.withCredentials !== undefined;
    }
    sendBeacon(url: string, data: any) {
        //navigator.sendBeacon(url,data);
    }
    reset(): void {
        this._request = new XMLHttpRequest();
        this._request.addEventListener('readystatechange', this._createResponse.bind(this), false);
        if (typeof this._onreadystatechangeCallback === 'function') {
            this._request.addEventListener('readystatechange', this._onreadystatechangeCallback, false);
        }
    }
}