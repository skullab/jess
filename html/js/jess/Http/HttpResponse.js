define(["require", "exports", './HttpRequest'], function (require, exports, HttpRequest_1) {
    "use strict";
    var HttpResponse = (function () {
        function HttpResponse(request) {
            this._request = request;
            this.rawRequest = request.getRawRequest();
            this._resolve();
        }
        HttpResponse.prototype._resolve = function () {
            this.response = this._request.getResponse();
            this.responseType = this._request.getResponseType();
            if (this.responseType == HttpRequest_1.HttpRequest.RESPONSE_TEXT || this.responseType == '') {
                this.responseText = this._request.getResponseText();
            }
            else if (this.responseType == HttpRequest_1.HttpRequest.RESPONSE_JSON) {
                this.responseText = JSON.stringify(this.response);
            }
            if (this.responseType == HttpRequest_1.HttpRequest.RESPONSE_DOCUMENT || this.responseType == '') {
                this.responseXml = this._request.getResponseXml();
            }
            this.responseUrl = this._request.getResponseUrl();
            this.responseHeaders = this._request.getAllResponseHeaders();
            this.status = this._request.getStatus();
            this.statusText = this._request.getStatusText();
        };
        HttpResponse.prototype.toJSON = function () {
            if (this.responseType == HttpRequest_1.HttpRequest.RESPONSE_JSON) {
                return this.response;
            }
            if (this.responseType == HttpRequest_1.HttpRequest.RESPONSE_TEXT || this.responseType == '') {
                return JSON.parse(this.response);
            }
        };
        return HttpResponse;
    }());
    exports.HttpResponse = HttpResponse;
});
