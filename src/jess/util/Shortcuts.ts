export const C_ERROR = 1;
export const C_WARNING = 2;
export const C_DEBUG = 4;
export const C_INFO = 8;
export const C_LOG = 16;
export const C_ALL = 32767;

export let log = console.log.bind(console);
export let warn = console.warn.bind(console);
export let error = console.error.bind(console);
export let info = console.info.bind(console);
export let debug = console.debug.bind(console);

export function console_reporting(n: number) {
    let methods = [];
    methods[1] = 'error';
    methods[2] = 'warn';
    methods[4] = 'debug';
    methods[8] = 'info';
    methods[16] = 'log';
    switch (n) {
        case 0:
            // turn off console
            for (let i = 1; i <= methods.length; i++) {
                if (console.hasOwnProperty(methods[i]))
                    console[methods[i]] = function() { };
            }
            break;
        case C_ERROR:
            for (let i = 2; i <= methods.length; i = i * 2) {
                if (console.hasOwnProperty(methods[i]))
                    console[methods[i]] = function() { };
            }
            break;
        case C_WARNING:
            for (let i = 4; i <= methods.length; i = i * 2) {
                if (console.hasOwnProperty(methods[i]))
                    console[methods[i]] = function() { };
            }
            break;
        case C_DEBUG:
            for (let i = 8; i <= methods.length; i = i * 2) {
                if (console.hasOwnProperty(methods[i]))
                    console[methods[i]] = function() { };
            }
            break;
        case C_INFO:
            for (let i = 16; i <= methods.length; i = i * 2) {
                if (console.hasOwnProperty(methods[i]))
                    console[methods[i]] = function() { };
            }
            break;
        case C_LOG:
        case C_ALL:
        default:
            console.log = log;
            console.warn = warn;
            console.error = error;
            console.info = info;
            console.debug = debug;
            break;
    }
}

/*export let doc = document;
doc['get'] = {};
doc['get'].id = doc.getElementById.bind(doc);
doc['get'].class = doc.getElementsByClassName.bind(doc);
doc['get'].name = doc.getElementsByName.bind(doc);
doc['get'].tag = doc.getElementsByTagName.bind(doc);
doc['get'].tagns = doc.getElementsByTagNameNS.bind(doc);
doc['get'].selection = doc.getSelection.bind(doc);*/

export module doc {
    export let get = {
        id:document.getElementById.bind(document),
        class:document.getElementsByClassName.bind(document),
        name:document.getElementsByName.bind(document),
        tag:document.getElementsByTagName.bind(document),
        tagns:document.getElementsByTagNameNS.bind(document),
        selection:document.getSelection.bind(document)
    };
    
}
