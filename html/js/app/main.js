var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", '../jess/Di', '../jess/Mvc/Dispatcher', '../jess/Mvc/Controller'], function (require, exports, Di_1, Dispatcher_1, Controller_1) {
    "use strict";
    var MyApp;
    (function (MyApp) {
        var FormController = (function (_super) {
            __extends(FormController, _super);
            function FormController() {
                _super.apply(this, arguments);
            }
            FormController.prototype.sendAction = function () {
                console.log('sending form...');
                /* do stuff */
                console.log('send it!');
            };
            return FormController;
        }(Controller_1.Controller));
        MyApp.FormController = FormController;
        var BannerController = (function (_super) {
            __extends(BannerController, _super);
            function BannerController() {
                _super.apply(this, arguments);
            }
            BannerController.prototype.clickAction = function (a, b, c) {
                this['dispatcher'].forward('form', 'send');
            };
            return BannerController;
        }(Controller_1.Controller));
        MyApp.BannerController = BannerController;
    })(MyApp = exports.MyApp || (exports.MyApp = {}));
    var di = new Di_1.Di();
    var dispatcher = new Dispatcher_1.Dispatcher();
    dispatcher.setDi(di);
    dispatcher.setModule(MyApp);
    dispatcher.setControllerName('banner');
    dispatcher.setActionName('click');
    dispatcher.setParams([1, 2, 3]);
    dispatcher.dispatch();
});
