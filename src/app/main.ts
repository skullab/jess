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
       
        indexAction() {
            console.log('> index action');
            this.view.setVars({
                name: '[enter your name please]',
            }, true);
            
        }
        changeNameAction() {
            console.log('> change action');
            console.log(arguments);
            //this.view.setVar('name', e.target.value);
        }
        byeAction() {
            console.log('on bye action');
            this.view.setVar('say_bye','goodbye !!');
        }
    }
}


let di = new Di();
di.set('viewEngine', function() {
    let engine = new Mustache();
    return engine;
}, true);

/*di.set('view', function() {
    let view = new View();
    return view ;
}, true);*/

let app = new Application(di);
app.setDefaultModule(MyApp);
app.handle();
