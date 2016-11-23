var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../jess/Di', '../jess/Mvc/View/Engine/Mustache', '../jess/Mvc/Controller', '../jess/Mvc/Application'], function (require, exports, Di_1, Mustache_1, Controller_1, Application_1) {
    "use strict";
    var MyApp;
    (function (MyApp) {
        var IndexController = (function (_super) {
            __extends(IndexController, _super);
            function IndexController() {
                _super.apply(this, arguments);
            }
            IndexController.prototype.indexAction = function () {
                this.view.setVar('message', 'please enter email');
                this.view.setVar('names', [{ name: 'John' }, { name: 'Foo' }, { name: 'Bar' }]);
                this.view.setPartials({ list: '{{#names}}<li>{{name}}</li>{{/names}}' });
            };
            IndexController.prototype.validateAction = function (e, kind) {
                this.view.setVar('c', e.target.value);
                this.view.setVar('message', e.target.value);
                if (kind == 'foo') {
                    console.log('validate email');
                    var value = e.target.value;
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (re.test(value)) {
                        console.log('valid email');
                        this.view.setVar('message', 'valid email');
                    }
                    else {
                        console.log('invalid email');
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
