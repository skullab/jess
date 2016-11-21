var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../View', '../../util/ArrayList'], function (require, exports, View_1, ArrayList_1) {
    "use strict";
    var ListView = (function (_super) {
        __extends(ListView, _super);
        function ListView(modeTag, data) {
            /*if (modeTag != ListView.UNORDERED || modeTag != ListView.ORDERED) {
                throw new Error("The ListView can only create <ul> or <ol> Element object");
            }*/
            var element = document.createElement(modeTag);
            var text = document.createTextNode('{{> list_array }}');
            element.appendChild(text);
            _super.call(this, element);
            this._arrayList = new ArrayList_1.ArrayList(data);
        }
        ListView.prototype.render = function (partials) {
            this.checkEngine();
            partials = partials ? partials : this.getPartials();
            console.log(partials);
            this.setVar('list_value', this.toArray());
            this.setContent(this._engine.render(this.getTemplate(), this._variables, { list_array: '<li>{{ list_value }}</li>' }));
            console.log(this.getTemplate());
        };
        ListView.prototype.add = function (value, index) {
            this._arrayList.add({ 'list_value': value }, index);
        };
        ListView.prototype.clear = function () {
            this._arrayList.clear();
        };
        ListView.prototype.contains = function (value) {
            return this._arrayList.contains({ 'list_value': value });
        };
        ListView.prototype.get = function (index) {
            return this._arrayList.get(index);
        };
        ListView.prototype.indexOf = function (value) {
            return this._arrayList.indexOf({ 'list_value': value });
        };
        ListView.prototype.isEmpty = function () {
            return this._arrayList.isEmpty();
        };
        ListView.prototype.getIterator = function () {
            return this._arrayList.getIterator();
        };
        ListView.prototype.remove = function (index) {
            var element = typeof index !== 'number' ? { 'list_value': index } : index;
            this._arrayList.remove(element);
        };
        ListView.prototype.size = function () {
            return this._arrayList.size();
        };
        ListView.prototype.toArray = function () {
            return this._arrayList.toArray();
        };
        ListView.prototype.subList = function (start, end) {
            return this._arrayList.subList(start, end);
        };
        ListView.UNORDERED = 'ul';
        ListView.ORDERED = 'ol';
        ListView.LIST_NAME = 'list_value';
        return ListView;
    }(View_1.View));
    exports.ListView = ListView;
});
