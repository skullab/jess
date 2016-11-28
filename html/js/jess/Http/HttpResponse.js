define(["require", "exports"], function (require, exports) {
    "use strict";
    var HttpResponse = (function () {
        function HttpResponse(request) {
            this._request = request;
            this._resolve();
        }
        HttpResponse.prototype._resolve = function () {
            this.response = this._request.response;
            this.responseType = this._request.responseType;
            if (this.responseType == HttpResponse.TEXT || this.responseType == '') {
                this.responseText = this._request.responseText;
            }
            else if (this.responseType == HttpResponse.JSON) {
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
        };
        HttpResponse.prototype.getResponseHeader = function (name) {
            return this._request.getResponseHeader(name);
        };
        HttpResponse.prototype.getTag = function () {
            return this._request['tag'];
        };
        HttpResponse.prototype.toJSON = function () {
            if (this.responseType == HttpResponse.JSON) {
                return this.response;
            }
            if (this.responseType == HttpResponse.TEXT || this.responseType == '') {
                return JSON.parse(this.response);
            }
        };
        HttpResponse.ARRAY_BUFFER = "arraybuffer";
        HttpResponse.BLOB = "blob";
        HttpResponse.DOCUMENT = "document";
        HttpResponse.JSON = "json";
        HttpResponse.TEXT = "text";
        return HttpResponse;
    }());
    exports.HttpResponse = HttpResponse;
});
