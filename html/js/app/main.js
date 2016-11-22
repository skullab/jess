var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../jess/Di', '../jess/Mvc/View', '../jess/Mvc/View/Engine/Handlebars', '../jess/Mvc/Dispatcher', '../jess/Mvc/Controller', '../jess/Mvc/Application'], function (require, exports, Di_1, View_1, Handlebars_1, Dispatcher_1, Controller_1, Application_1) {
    "use strict";
    var MyApp;
    (function (MyApp) {
        var IndexController = (function (_super) {
            __extends(IndexController, _super);
            function IndexController() {
                _super.apply(this, arguments);
            }
            IndexController.prototype.onInitialize = function () {
            };
            IndexController.prototype.indexAction = function () {
                console.log('on index action', this.view);
                this.view.setVar('name', 'John');
                var n = this.view.getVar('number') || 3;
                this.view.setVar('number_mails', n);
                /*document.querySelector('#myButton').addEventListener('click', function(e) {
                    _this.dispatcher.forward('index','index');
                });*/
                //this.view.render();
            };
            IndexController.prototype.readAction = function () {
                console.log('on read action');
                var n = this.view.getVar('number_mails');
                if (typeof n === 'number') {
                    if (n == 1) {
                        this.view.setVar('number_mails', 'nothing');
                    }
                    else {
                        this.view.setVar('number_mails', --n);
                    }
                }
                //this.view.render();
            };
            return IndexController;
        }(Controller_1.Controller));
        MyApp.IndexController = IndexController;
        var FormController = (function (_super) {
            __extends(FormController, _super);
            function FormController() {
                _super.apply(this, arguments);
            }
            FormController.prototype.onInitialize = function () {
                //this.setRootElement(document.querySelector('#myButton'));
                //this.getRootElement().addEventListener('click', this.sendAction);
            };
            FormController.prototype.sendAction = function () {
                console.log('OOOOK');
                this.view.setVar('alert', 'OK');
                //this.view.render();
            };
            return FormController;
        }(Controller_1.Controller));
        MyApp.FormController = FormController;
    })(MyApp = exports.MyApp || (exports.MyApp = {}));
    var di = new Di_1.Di();
    di.set('dispatcher', new Dispatcher_1.Dispatcher(), true);
    di.set('view', function () {
        var view = new View_1.View(document.querySelector('#myView'));
        view.setViewEngine(new Handlebars_1.Handlebars());
        return view;
    }, true);
    di.set('my-module', MyApp, true);
    new Application_1.Application(di).handle();
});
