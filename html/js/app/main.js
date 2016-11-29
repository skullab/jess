var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../jess/Di', '../jess/Mvc/View/Engine/Mustache', '../jess/Mvc/Controller', '../jess/Mvc/Application', '../jess/util/StringHelper'], function (require, exports, Di_1, Mustache_1, Controller_1, Application_1, StringHelper_1) {
    "use strict";
    var MyHttpListener = (function () {
        function MyHttpListener() {
        }
        MyHttpListener.prototype.onTimeout = function (event, response) {
            console.log('on timeout');
        };
        MyHttpListener.prototype.onAbort = function (event, response) { };
        MyHttpListener.prototype.onError = function (event, response) { };
        MyHttpListener.prototype.onLoad = function (event, response) {
            console.log('by custom listener', response.getTag());
            console.log(response.response, response.toJSON());
        };
        MyHttpListener.prototype.onLoadEnd = function (event, response) { };
        MyHttpListener.prototype.onLoadStart = function (event, response) { };
        MyHttpListener.prototype.onProgress = function (event, response) { };
        return MyHttpListener;
    }());
    exports.MyHttpListener = MyHttpListener;
    var BaseModel = (function () {
        function BaseModel() {
        }
        return BaseModel;
    }());
    exports.BaseModel = BaseModel;
    var MyModel = (function (_super) {
        __extends(MyModel, _super);
        function MyModel() {
            _super.apply(this, arguments);
        }
        return MyModel;
    }(BaseModel));
    exports.MyModel = MyModel;
    var MyApp;
    (function (MyApp) {
        var IndexController = (function (_super) {
            __extends(IndexController, _super);
            function IndexController() {
                _super.apply(this, arguments);
            }
            IndexController.prototype.indexAction = function () {
                var db;
                var req = indexedDB.open('test2', 1);
                req.onsuccess = function (evt) {
                    // Better use "this" than "req" to get the result to avoid problems with
                    // garbage collection.
                    // db = req.result;
                    db = this.result;
                    console.log("openDb DONE");
                    try {
                    }
                    catch (e) {
                        console.log(e);
                    }
                };
                req.onerror = function (evt) {
                    console.error("openDb:", evt.target.errorCode);
                };
                req.onupgradeneeded = function (event) {
                    console.log('on upgrade needed');
                };
                var m = new MyModel();
                console.log(StringHelper_1.StringHelper.uncamelize(m.constructor.name));
                //this.view.setVar('hello', '<b>hello !</b>');
                this.view.setVar('message', 'please enter a email');
                //this.view.setVar('names', [{ name: 'John' }, { name: 'Foo' }, { name: 'Bar' }]);
                this.view.setPartials({ list: '{{#names}}<li>{{name}}</li>{{/names}}' });
            };
            IndexController.prototype.helloAction = function (email) {
                this.view.setVar('hello', '<b>hello !</b>');
                this.view.setVar('names', [{ name: email }]);
            };
            IndexController.prototype.validateAction = function (e, kind) {
                var value = e.target.value;
                if (kind == 'email') {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (re.test(value)) {
                        this.view.setVar('message', value + ' great !');
                        this.view.setVar('is_valid_email', 'is-success');
                        this.view.setVar('help', 'is-success');
                        this.view.setVar('icon_check', 'fa-check');
                        this.dispatcher.forward('index', 'hello', [value]);
                    }
                    else {
                        this.view.setVar('message', value + ' is invalid email !');
                        this.view.setVar('is_valid_email', 'is-danger');
                        this.view.setVar('help', 'is-danger');
                        this.view.setVar('icon_check', 'fa-warning');
                    }
                    if (value == '') {
                        this.view.setVar('message', 'please enter a VALID email !');
                    }
                }
                //this.view.disable();
            };
            return IndexController;
        }(Controller_1.Controller));
        MyApp.IndexController = IndexController;
    })(MyApp = exports.MyApp || (exports.MyApp = {}));
    var di = new Di_1.Di();
    di.set('viewEngine', function () {
        var engine = new Mustache_1.Mustache();
        return engine;
    }, true);
    /*di.set('view', function() {
        let view = new View();
        return view ;
    }, true);*/
    var app = new Application_1.Application(di);
    app.setDefaultModule(MyApp);
    app.handle();
});
