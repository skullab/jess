define(["require", "exports", '../util/StringHelper', './Application'], function (require, exports, StringHelper_1, Application_1) {
    "use strict";
    var Model = (function () {
        function Model(values) {
            this.__$$schema = '';
            this.__$$primaryKeyName = 'id';
            this.setDi(Application_1.Application.DI);
            var _source = StringHelper_1.StringHelper.uncamelize(this.constructor['name']);
            this.setSource(_source);
            //this.setBaseUri(_source);
            this.__$$columns = [];
            if (values)
                this.setValues(values);
            this.onInitialize();
        }
        Model.prototype.onInitialize = function () { };
        Model.prototype.setPrimaryKeyName = function (name) {
            this.__$$primaryKeyName = name;
        };
        Model.prototype.getPrimaryKeyName = function () {
            return this.__$$primaryKeyName;
        };
        Model.prototype.setValues = function (values) {
            this.__$$values = values;
        };
        Model.prototype.setBaseUri = function (uri) {
            this.__$$connection.setBaseUri(uri);
        };
        Model.prototype.getValues = function () {
            return this.__$$values;
        };
        Model.prototype.setSource = function (source) {
            this.__$$source = source;
        };
        Model.prototype.getSource = function () {
            return this.__$$source;
        };
        Model.prototype.setSchema = function (schema) {
            this.__$$schema = schema;
        };
        Model.prototype.getSchema = function () {
            return this.__$$schema;
        };
        Model.prototype.setCreateMethod = function (method) {
            this.__$$connection.setCreateMethod(method);
        };
        Model.prototype.setReadMethod = function (method) {
            this.__$$connection.setReadMethod(method);
        };
        Model.prototype.setUpdateMethod = function (method) {
            this.__$$connection.setUpdateMethod(method);
        };
        Model.prototype.setDeleteMethod = function (method) {
            this.__$$connection.setDeleteMethod(method);
        };
        Model.prototype.setConnectionService = function (connection) {
            this.__$$connection = connection;
        };
        Model.prototype.getConnectionService = function () {
            return this.__$$connection;
        };
        Model.prototype.setColumns = function (columns) {
            if (columns && columns.length > 0) {
                for (var n in columns) {
                    if (this.hasOwnProperty(columns[n])) {
                        this.__$$columns.push(columns[n]);
                    }
                }
            }
            else {
                var _this_1 = this;
                Object.getOwnPropertyNames(_this_1).forEach(function (value, index, array) {
                    if (value.indexOf('__$$') === -1) {
                        _this_1.__$$columns.push(value);
                    }
                });
            }
        };
        Model.prototype.getColumns = function () {
            return this.__$$columns;
        };
        Model.prototype._beforeConnection = function (data) {
            var columns = [];
            if (data) {
                Object.getOwnPropertyNames(data).forEach(function (value, index, array) {
                    columns.push(value);
                });
            }
            this.setColumns(columns);
            var values = {};
            for (var _i = 0, _a = this.__$$columns; _i < _a.length; _i++) {
                var n = _a[_i];
                values[n] = this[n];
            }
            values['source'] = this.getSource();
            values['schema'] = this.getSchema();
            this.setValues(values);
        };
        Model.prototype.create = function (data) {
            this._beforeConnection(data);
            this.__$$connection.create(this.getValues());
        };
        Model.prototype.update = function (data) {
            this._beforeConnection(data);
            this.__$$connection.update(this.getValues());
        };
        Model.prototype.delete = function (data) {
            this.__$$connection.delete(this.getValues());
        };
        Model.prototype.save = function (data) {
            if (this.hasOwnProperty(this.getPrimaryKeyName())) {
                this.update(data);
            }
            else {
                this.create(data);
            }
        };
        Model.prototype.count = function () { };
        Model.find = function (q) {
        };
        Model.findFirst = function (q) { };
        Model.query = function (q) {
        };
        Model.prototype.setServices = function () {
            this.__$$connection = this.__$$di.get('connection');
            this.__$$connection.onResponse(this.onResponse.bind(this));
        };
        Model.prototype.beforeConnect = function () { };
        Model.prototype.onSuccess = function (response) { };
        Model.prototype.onError = function (response) { };
        Model.prototype.afterConnect = function () { };
        Model.prototype._onSuccess = function (response) {
            try {
                var _o = response.toJSON();
                if (_o.hasOwnProperty(this.getPrimaryKeyName())) {
                    this.__$$values[this.getPrimaryKeyName()] = _o[this.getPrimaryKeyName()];
                    this[this.getPrimaryKeyName()] = _o[this.getPrimaryKeyName()];
                }
            }
            catch (e) {
            }
            this.onSuccess(response);
        };
        Model.prototype._onError = function (response) {
            this.onError(response);
        };
        Model.prototype.onResponse = function (state, response, event) {
            switch (state) {
                case 'loadstart':
                    this.beforeConnect();
                    break;
                case 'load':
                    if (response.status == 200) {
                        this._onSuccess(response);
                    }
                    else {
                        this._onError(response);
                    }
                    break;
                case 'loadend':
                    this.afterConnect();
                    break;
                case 'abort':
                case 'timeout':
                case 'error':
                    this._onError(response);
                    break;
            }
        };
        Model.prototype.setDi = function (di) {
            this.__$$di = di;
            this.setServices();
        };
        Model.prototype.getDi = function () {
            return this.__$$di;
        };
        return Model;
    }());
    exports.Model = Model;
});
