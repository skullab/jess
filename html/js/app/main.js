var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../jess/Di', '../jess/Mvc/View/Engine/Mustache', '../jess/Mvc/Controller', '../jess/Mvc/Application', '../jess/Http/HttpRequest'], function (require, exports, Di_1, Mustache_1, Controller_1, Application_1, HttpRequest_1) {
    "use strict";
    var MyApp;
    (function (MyApp) {
        var IndexController = (function (_super) {
            __extends(IndexController, _super);
            function IndexController() {
                _super.apply(this, arguments);
            }
            IndexController.prototype.indexAction = function () {
                var request = new HttpRequest_1.HttpRequest();
                request.onreadystatechange(function (e) {
                    //console.log(e);
                    if (request.isDone()) {
                        var response = request.getHttpResponse();
                        console.log(response.response);
                    }
                });
                //request.setCredentials(true);
                //request.setResponseType(HttpRequest.RESPONSE_JSON);
                //request.open(HttpRequest.POST, "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FYahoo'%20and%20xpath%3D'%2F%2Ftable%2F*%5Bcontains(.%2C%22Founder%22)%5D%2F%2Fa'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys");
                request.open(HttpRequest_1.HttpRequest.GET, 'service.php');
                //request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                request.send("foo=bar&lorem=ipsum");
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
