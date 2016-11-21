import {Di} from '../jess/Di';
import {View} from '../jess/Mvc/View';
import {ViewManager} from '../jess/Mvc/View/ViewManager';
import {Mustache} from '../jess/Mvc/View/Engine/Mustache';
import {ArrayList} from '../jess/util/ArrayList';
import {Dispatcher} from '../jess/Mvc/Dispatcher';
import {Controller} from '../jess/Mvc/Controller';

export module MyApp {
    export class FormController extends Controller {
        public sendAction() {
            console.log('sending form...');
            /* do stuff */
            console.log('send it!');
        }
    }
    export class BannerController extends Controller {
        clickAction(a, b, c) {
            this['dispatcher'].forward('form','send');
        }
    }
}

let di = new Di();
let dispatcher = new Dispatcher();
dispatcher.setDi(di);
dispatcher.setModule(MyApp);

dispatcher.setControllerName('banner');
dispatcher.setActionName('click');
dispatcher.setParams([1, 2, 3]);
dispatcher.dispatch();