define(["require", "exports"], function (require, exports) {
    "use strict";
    var StringHelper = (function () {
        function StringHelper() {
        }
        StringHelper.camelize = function (str) {
            if (!str)
                return this.emptyString();
            return str.replace(/^([A-Z])|[\s-_](\w)/g, function (letter, index) {
                return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
            }).replace(/\s+/g, '');
        };
        StringHelper.capitalize = function (str) {
            if (!str)
                return this.emptyString();
            return str.charAt(0).toUpperCase() + str.slice(1);
        };
        StringHelper.emptyString = function () {
            return '';
        };
        return StringHelper;
    }());
    exports.StringHelper = StringHelper;
});
