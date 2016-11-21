var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", './ArrayIterator'], function (require, exports, ArrayIterator_1) {
    "use strict";
    var ArrayList = (function (_super) {
        __extends(ArrayList, _super);
        function ArrayList(list) {
            _super.call(this);
            if (Array.isArray(list)) {
                this._array = list;
            }
            var _this = this;
            this._iterator = {
                next: function () {
                    return _this.next();
                },
                prev: function () { return _this.prev(); },
                valid: function () { return _this.valid(); },
                hasNext: function () { return _this.hasNext(); },
                key: function () {
                    return _this.key();
                },
                rewind: function () {
                    return _this.rewind();
                }
            };
        }
        ArrayList.prototype.add = function (element, index) {
            if (index && typeof index === 'number') {
                this._array[index] = element;
            }
            else {
                this._array.push(element);
            }
            this.next();
        };
        ArrayList.prototype.clear = function () {
            this._array = [];
            this.rewind();
        };
        ArrayList.prototype.contains = function (element) {
            return this.indexOf(element) !== -1;
        };
        ArrayList.prototype.get = function (index) {
            return this._array[index];
        };
        ArrayList.prototype.indexOf = function (element) {
            return this._array.indexOf(element);
        };
        ArrayList.prototype.isEmpty = function () {
            return this.size() == 0;
        };
        ArrayList.prototype.getIterator = function () {
            return this._iterator;
        };
        ArrayList.prototype.remove = function (index) {
            if (typeof index !== 'number') {
                index = this.indexOf(index);
            }
            if (index !== -1) {
                this._array.splice(index, 1);
                this.prev();
            }
        };
        ArrayList.prototype.size = function () {
            return this._array.length;
        };
        ArrayList.prototype.toArray = function () {
            return this._array.slice();
        };
        ArrayList.prototype.subList = function (start, end) {
            return this._array.slice(start, end);
        };
        return ArrayList;
    }(ArrayIterator_1.ArrayIterator));
    exports.ArrayList = ArrayList;
});
