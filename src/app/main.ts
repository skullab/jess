import {Di} from '../jess/Di';
import {View} from '../jess/Mvc/View';
import {ViewManager} from '../jess/Mvc/View/ViewManager';
import {Mustache} from '../jess/Mvc/View/Engine/Mustache';
import {Handlebars} from '../jess/Mvc/View/Engine/Handlebars';
import {ArrayList} from '../jess/util/ArrayList';
import {Dispatcher} from '../jess/Mvc/Dispatcher';
import {Controller} from '../jess/Mvc/Controller';
import {Application} from '../jess/Mvc/Application';
import {StringHelper} from '../jess/util/StringHelper';



export module MyApp {
    export class IndexController extends Controller {
        onInitialize() {

        }
        indexAction() {
            console.log('on index action', this.view);
            this.view.setVar('name', 'John');
            let n = this.view.getVar('number') || 3;
            this.view.setVar('number_mails', n);

            /*document.querySelector('#myButton').addEventListener('click', function(e) {
                _this.dispatcher.forward('index','index');
            });*/
            //this.view.render();
        }
        readAction() {
            console.log('on read action');
            let n = this.view.getVar('number_mails');
            if (typeof n === 'number') {
                if (n == 1) {
                    this.view.setVar('number_mails', 'nothing');
                } else {
                    this.view.setVar('number_mails', --n);
                }
            }
            //this.view.render();
        }
    }
    export class FormController extends Controller {
        onInitialize() {
            //this.setRootElement(document.querySelector('#myButton'));
            //this.getRootElement().addEventListener('click', this.sendAction);
        }
        sendAction() {
            console.log('OOOOK');
            this.view.setVar('alert', 'OK');
            //this.view.render();
        }
    }
}


let di = new Di();
di.set('dispatcher', new Dispatcher(), true);
di.set('view', function() {
    let view = new View(document.querySelector('#myView'));
    view.setViewEngine(new Handlebars());
    return view;
}, true);
di.set('my-module', MyApp, true);
new Application(di).handle();

