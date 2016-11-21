define(["require", "exports"], function (require, exports) {
    "use strict";
    var ArrayIterator = (function () {
        function ArrayIterator() {
            this._array = [];
            this._cursor = 0;
        }
        ArrayIterator.prototype.forEach = function (callback) {
            for (var i in this._array) {
                callback(i, this._array[i]);
            }
        };
        ArrayIterator.prototype.next = function () {
            ++this._cursor;
        };
        ArrayIterator.prototype.prev = function () {
            --this._cursor;
        };
        ArrayIterator.prototype.valid = function () {
            return this._array[this._cursor] !== undefined;
        };
        ArrayIterator.prototype.hasNext = function () {
            return this._array[this._cursor + 1] !== undefined;
        };
        ArrayIterator.prototype.key = function () {
            return this._cursor;
        };
        ArrayIterator.prototype.rewind = function () {
            this._cursor = 0;
        };
        return ArrayIterator;
    }());
    exports.ArrayIterator = ArrayIterator;
});
