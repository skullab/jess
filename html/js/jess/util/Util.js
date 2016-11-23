define(["require", "exports"], function (require, exports) {
    "use strict";
    var Util = (function () {
        function Util() {
        }
        Util.guid = function () {
            return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
                this.s4() + '-' + this.s4() + this.s4() + this.s4();
        };
        Util.s4 = function () {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };
        return Util;
    }());
    exports.Util = Util;
});
