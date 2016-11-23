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
            this.view.setVar('message','please enter email');
            this.view.setVar('names',[{name:'John'},{name:'Foo'},{name:'Bar'}]);
            this.view.setPartials({list:'{{#names}}<li>{{name}}</li>{{/names}}'});
        }
        validateAction(e, kind) {
            this.view.setVar('c',e.target.value);
            this.view.setVar('message',e.target.value);
            if (kind == 'foo') {
                console.log('validate email');
                let value = e.target.value;
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (re.test(value)) {
                    console.log('valid email');
                    this.view.setVar('message','valid email');
                }else{
                    console.log('invalid email');
                }
            }
            //this.view.disable();
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
