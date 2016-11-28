import {HttpListener} from './HttpListener';
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

	/**
	 * @deprecated
	 */
    static RESPONSE_ARRAY_BUFFER = "arraybuffer";
	/**
	 * @deprecated
	 */
    static RESPONSE_BLOB = "blob";
	/**
	 * @deprecated
	 */
    static RESPONSE_DOCUMENT = "document";
	/**
	 * @deprecated
	 */
    static RESPONSE_JSON = "json";
	/**
	 * @deprecated
	 */
    static RESPONSE_TEXT = "text";

    static STATE_UNSENT = 0;
    static STATE_OPENED = 1;
    static STATE_HEADERS_RECEIVED = 2;
    static STATE_LOADING = 3;
    static STATE_DONE = 4;

    protected _requests: XMLHttpRequest[] = [];
    protected _data: any;
    protected _bypassCache: boolean = false;
    protected _url: string;
    protected _method: string;
    protected _async: boolean = true;
    protected _username: string;
    protected _password: string;
    protected _responseType: string = "text";
    protected _timeout: number = 0;
	protected _globalTimeout: number = 0;
    protected _credentials: boolean = false;
    protected _listener: HttpListener;
    protected _onreadystatechangeCallback: any;
    protected _params: {};

    constructor() {
		this.reset();
	}
	setTag(tag: string): void {
		this.getRawRequest()['tag'] = tag;
	}
	/**
	 * @deprecated
	 */
	getTag(): string {
		return this.getRawRequest()['tag'];
	}
	getRawRequest(index?: number): XMLHttpRequest {
		index = index || this._requests.length - 1;
		return this._requests[index];
	}
	getRawRequestArray(): XMLHttpRequest[] {
		return this._requests;
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
    onreadystatechange(callback: (e?) => void): void {
		this._onreadystatechangeCallback = callback;
    }
    abort(): void {
        this.getRawRequest().abort();
    }
	/**
	 * @deprecated
	 */
    getAllResponseHeaders() {
        return this.getRawRequest().getAllResponseHeaders();
    }
	/**
	 * @deprecated
	 */
    getResponseHeader(name: string): string {
        return this.getRawRequest().getResponseHeader(name);
    }
    overrideMimeType(mimeType: string): void {
        this.getRawRequest().overrideMimeType(mimeType);
    }
    setRequestHeader(header: string, value: string): void {
        this.getRawRequest().setRequestHeader(header, value);
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
	/**
	 * @deprecated
	 */
    readyState(): number {
        return this.getRawRequest().readyState;
    }
    bypassCache(bypass: boolean) {
        this._bypassCache = bypass;
    }
	/**
	 * @deprecated
	 */
    isUnset(): boolean {
        return this.readyState() == HttpRequest.STATE_UNSENT;
    }
	/**
	 * @deprecated
	 */
    isOpened(): boolean {
        return this.readyState() == HttpRequest.STATE_OPENED;
    }
	/**
	 * @deprecated
	 */
    isHeadersReceived(): boolean {
        return this.readyState() == HttpRequest.STATE_HEADERS_RECEIVED;
    }
	/**
	 * @deprecated
	 */
    isLoading(): boolean {
        return this.readyState() == HttpRequest.STATE_LOADING;
    }
	/**
	 * @deprecated
	 */
    isDone() {
        return this.readyState() == HttpRequest.STATE_DONE;
    }

    protected beforeOpen(method: string, url: string, async: boolean = true, user: string = null, password: string = null) {

        this.setMethod(method);
		switch (this.getMethod()) {
			case HttpRequest.HEAD:
			case HttpRequest.GET:
				let _p = this._encodeParams();
				if (_p.length > 0) {
					url += '?' + _p;
				}
				break;
		}
        if (this._bypassCache) {
            url += ((/\?/).test(url) ? "&" : "?") + 'timestamp=' + (new Date()).getTime();
        }
        this.setUrl(url);
        this.setAsync(async);
        this.setUsername(user);
        this.setPassword(password);

		let _r = this.getRawRequest();
		if (typeof this._onreadystatechangeCallback === 'function') {
			_r.addEventListener('readystatechange', this._onreadystatechangeCallback, false);
		}
		this._resetListener();
    }
    open(method: string, url: string, async: boolean = true, user: string = null, password: string = null) {
        this.beforeOpen(method, url, async, user, password);
        this.getRawRequest().open(this.getMethod(), this.getUrl(), this.isAsync(), this.getUsername(), this.getPassword());
        this.afterOpen();
    }

    protected afterOpen() {

    }
    //*************************************************************************************
    get(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.GET, url, async, user, password);
		this.send(null);
    }
    post(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.POST, url, async, user, password);
		this.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		this.send(this.getData());
    }
    head(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.HEAD, url, async, user, password);
		this.send(null);
    }
    put(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.PUT, url, async, user, password);
		this.send(this.getData());
    }
    delete(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.DELETE, url, async, user, password);
		this.send(this.getData());
    }
    trace(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.TRACE, url, async, user, password);
		this.send(this.getData());
    }
    connect(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.CONNECT, url, async, user, password);
		this.send(this.getData());
    }
    patch(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.PATCH, url, async, user, password);
		this.send(this.getData());
    }
    options(url: string, async: boolean = true, user: string = null, password: string = null) {
        this.open(HttpRequest.OPTIONS, url, async, user, password);
		this.send(this.getData());
    }
    //*************************************************************************************
	/**
	 * @deprecated
	 */
    getResponse(): any {
        return this.getRawRequest().response;
    }
	/**
	 * @deprecated
	 */
    getResponseText(): string {
        return this.getRawRequest().responseText;
    }
	/**
	 * @deprecated
	 */
    getResponseUrl(): string {
        return this.getRawRequest()['responseURL'];
    }
	/**
	 * @deprecated
	 */
    getResponseXml(): any {
        return this.getRawRequest().responseXML;
    }
	/**
	 * @deprecated
	 */
    getStatus(): number {
        return this.getRawRequest().status;
    }
	/**
	 * @deprecated
	 */
    getStatusText(): string {
        return this.getRawRequest().statusText;
    }
    setTimeout(timeout: number): void {
        this._timeout = timeout;
    }
    getTimeout(): number {
        return this._timeout;
    }
	setGlobalTimeout(timeout: number): void {
		this._globalTimeout = timeout ;
	}
	getGlobalTimeout():number{
		return this._globalTimeout ;
	}
	/**
	 * @deprecated
	 */
    getUpload(): XMLHttpRequestUpload {
        return this.getRawRequest().upload;
    }
    setCredentials(credentials: boolean) {
        this._credentials = credentials;
    }
    getCredentials(): boolean {
        return this._credentials;
    }
	protected _fixedEncodeURIComponent(str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
			return '%' + c.charCodeAt(0).toString(16);
		});
	}
	protected _encodeParams(): String {
		let params = this.getParams();
		let _encoded = '';
		for (let name in params) {
			if (params.hasOwnProperty(name)) {
				if (_encoded.length > 0) {
					_encoded += '&';
				}
				_encoded += name + '=' + this._fixedEncodeURIComponent(params[name]);
			}
		}
		return _encoded;
	}
    protected beforeSend(data: any): any {
        data = data || this.getData() || this._encodeParams();
		
		if (this.isAsync()) {
            this.getRawRequest().responseType = this.getResponseType();
            this.getRawRequest().timeout = this.getTimeout() || this.getGlobalTimeout() ;
            if (this.isCorsEnabled()) {
                this.getRawRequest().withCredentials = this.getCredentials();
            }
        }
		
		return data;
    }
    send(data: any = null) {
        let _d = this.beforeSend(data);
        this.getRawRequest().send(_d);
        this.afterSend();
    }
    protected afterSend() {
		this.reset();
    }
    setHttpListener(listener: HttpListener): void {
        this._listener = listener;
    }
    getHttpListener(): HttpListener {
        return this._listener;
    }
    setAsync(async: boolean) {
        this._async = async;
    }
    isAsync(): boolean {
        return this._async;
    }
    isCorsEnabled() {
        return this.getRawRequest().withCredentials !== undefined;
    }
    sendBeacon(url: string, data: any) {
        //navigator.sendBeacon(url,data);
    }
    reset(): void {
		this._requests.push(new XMLHttpRequest());
		this.setTimeout(0);
    }
	protected _resetListener() {
		if (this._listener) {
			let _r = this.getRawRequest();
			let _this = this;
			_r.addEventListener('timeout', function(e) {
				_this._listener.onTimeout(e, new HttpResponse(this));
			}, false);
			_r.addEventListener('abort', function(e) {
				_this._listener.onAbort(e, new HttpResponse(this));
			}, false);
			_r.addEventListener('error', function(e) {
				_this._listener.onError(e, new HttpResponse(this));
			}, false);
			_r.addEventListener('loadstart', function(e) {
				_this._listener.onLoadStart(e, new HttpResponse(this));
			}, false);
			_r.addEventListener('progress', function(e) {
				_this._listener.onProgress(e, new HttpResponse(this));
			}, false);
			_r.addEventListener('load', function(e) {
				_this._listener.onLoad(e, new HttpResponse(this));
			}, false);
			_r.addEventListener('loadend', function(e) {
				_this._listener.onLoadEnd(e, new HttpResponse(this));
			}, false);
		}
	}
}