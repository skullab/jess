define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.C_ERROR = 1;
    exports.C_WARNING = 2;
    exports.C_DEBUG = 4;
    exports.C_INFO = 8;
    exports.C_LOG = 16;
    exports.C_ALL = 32767;
    exports.log = console.log.bind(console);
    exports.warn = console.warn.bind(console);
    exports.error = console.error.bind(console);
    exports.info = console.info.bind(console);
    exports.debug = console.debug.bind(console);
    function console_reporting(n) {
        var methods = [];
        methods[1] = 'error';
        methods[2] = 'warn';
        methods[4] = 'debug';
        methods[8] = 'info';
        methods[16] = 'log';
        switch (n) {
            case 0:
                // turn off console
                for (var i = 1; i <= methods.length; i++) {
                    if (console.hasOwnProperty(methods[i]))
                        console[methods[i]] = function () { };
                }
                break;
            case exports.C_ERROR:
                for (var i = 2; i <= methods.length; i = i * 2) {
                    if (console.hasOwnProperty(methods[i]))
                        console[methods[i]] = function () { };
                }
                break;
            case exports.C_WARNING:
                for (var i = 4; i <= methods.length; i = i * 2) {
                    if (console.hasOwnProperty(methods[i]))
                        console[methods[i]] = function () { };
                }
                break;
            case exports.C_DEBUG:
                for (var i = 8; i <= methods.length; i = i * 2) {
                    if (console.hasOwnProperty(methods[i]))
                        console[methods[i]] = function () { };
                }
                break;
            case exports.C_INFO:
                for (var i = 16; i <= methods.length; i = i * 2) {
                    if (console.hasOwnProperty(methods[i]))
                        console[methods[i]] = function () { };
                }
                break;
            case exports.C_LOG:
            case exports.C_ALL:
            default:
                console.log = exports.log;
                console.warn = exports.warn;
                console.error = exports.error;
                console.info = exports.info;
                console.debug = exports.debug;
                break;
        }
    }
    exports.console_reporting = console_reporting;
    /*export let doc = document;
    doc['get'] = {};
    doc['get'].id = doc.getElementById.bind(doc);
    doc['get'].class = doc.getElementsByClassName.bind(doc);
    doc['get'].name = doc.getElementsByName.bind(doc);
    doc['get'].tag = doc.getElementsByTagName.bind(doc);
    doc['get'].tagns = doc.getElementsByTagNameNS.bind(doc);
    doc['get'].selection = doc.getSelection.bind(doc);*/
    var doc;
    (function (doc) {
        doc.get = {
            id: document.getElementById.bind(document),
            class: document.getElementsByClassName.bind(document),
            name: document.getElementsByName.bind(document),
            tag: document.getElementsByTagName.bind(document),
            tagns: document.getElementsByTagNameNS.bind(document),
            selection: document.getSelection.bind(document)
        };
    })(doc = exports.doc || (exports.doc = {}));
});
