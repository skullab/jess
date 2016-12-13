var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../jess/Di', '../jess/Mvc/View/Engine/Mustache', '../jess/Mvc/Controller', '../jess/Mvc/Application', '../jess/Http/HttpRequest', '../jess/Connection', '../jess/Mvc/Model'], function (require, exports, Di_1, Mustache_1, Controller_1, Application_1, HttpRequest_1, Connection_1, Model_1) {
    "use strict";
    var MyHttpListener = (function () {
        function MyHttpListener() {
        }
        MyHttpListener.prototype.onTimeout = function (event, response) {
            console.log('on timeout');
        };
        MyHttpListener.prototype.onAbort = function (event, response) {
            console.log('on abort');
        };
        MyHttpListener.prototype.onError = function (event, response) {
            console.log('on error');
        };
        MyHttpListener.prototype.onLoad = function (event, response) {
            console.log('by custom listener', response.getTag());
            console.log(response.getListenerName());
            console.log(response.response);
        };
        MyHttpListener.prototype.onLoadEnd = function (event, response) {
            console.log('on load end');
        };
        MyHttpListener.prototype.onLoadStart = function (event, response) {
            console.log('on load start');
        };
        MyHttpListener.prototype.onProgress = function (event, response) {
            console.log('on progress');
        };
        return MyHttpListener;
    }());
    exports.MyHttpListener = MyHttpListener;
    var Books = (function (_super) {
        __extends(Books, _super);
        function Books() {
            _super.apply(this, arguments);
        }
        return Books;
    }(Model_1.Model));
    exports.Books = Books;
    var MyApp;
    (function (MyApp) {
        var IndexController = (function (_super) {
            __extends(IndexController, _super);
            function IndexController() {
                _super.apply(this, arguments);
            }
            IndexController.prototype.indexAction = function () {
                var book = new Books();
                book.title = 'Alice in Wonderland';
                book.author = 'Lewis Carroll';
                book.save();
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
    di.set('httpRequest', function () {
        var request = new HttpRequest_1.HttpRequest();
        return request;
    }, true);
    di.set('connection', function () {
        var connection = new Connection_1.Connection();
        return connection;
    }, false);
    /*di.set('view', function() {
        let view = new View();
        return view ;
    }, true);*/
    var app = new Application_1.Application(di);
    app.setDefaultModule(MyApp);
    app.handle();
});
