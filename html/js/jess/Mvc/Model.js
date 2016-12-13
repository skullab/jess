define(["require", "exports", '../util/StringHelper', './Application'], function (require, exports, StringHelper_1, Application_1) {
    "use strict";
    var Model = (function () {
        function Model(values) {
            this.setDi(Application_1.Application.DI);
            this.setSource(StringHelper_1.StringHelper.uncamelize(this.constructor['name']));
            this.__$$columns = [];
            if (values)
                this.setValues(values);
            this.onInitialize();
        }
        Model.prototype.onInitialize = function () { };
        Model.prototype.setValues = function (values) {
            this.__$$values = values;
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
        Model.prototype.create = function (data) {
            this.__$$connection.create(data);
        };
        Model.prototype.update = function (data) {
            this.__$$connection.update(data);
        };
        Model.prototype.delete = function (data) {
            this.__$$connection.delete(data);
        };
        Model.prototype.save = function (data) {
            // create or update
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
            this.setValues(values);
            console.log(this.getColumns());
            console.log(this.getValues());
        };
        Model.prototype.count = function () { };
        Model.find = function () { };
        Model.findFirst = function () { };
        Model.prototype.setServices = function () {
            this.__$$connection = this.__$$di.get('connection');
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
