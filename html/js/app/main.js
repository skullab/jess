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
                console.log('> index action');
                this.view.setVars({
                    name: '[enter your name please]',
                }, true);
            };
            IndexController.prototype.changeNameAction = function () {
                console.log('> change action');
                console.log(arguments);
                //this.view.setVar('name', e.target.value);
            };
            IndexController.prototype.byeAction = function () {
                console.log('on bye action');
                this.view.setVar('say_bye', 'goodbye !!');
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
