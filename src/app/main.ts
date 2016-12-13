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
import {HttpRequest} from '../jess/Http/HttpRequest';
import {HttpResponse} from '../jess/Http/HttpResponse';
import {HttpListener} from '../jess/Http/HttpListener';
import {Connection} from '../jess/Connection';
import {Model} from '../jess/Mvc/Model';
import * as s from '../jess/util/Shortcuts';

export class MyHttpListener implements HttpListener {
    onTimeout(event: Event, response: HttpResponse): void {
        console.log('on timeout');
    }
    onAbort(event: Event, response: HttpResponse): void {
        console.log('on abort');
    }
    onError(event: Event, response: HttpResponse): void {
        console.log('on error');
    }
    onLoad(event: Event, response: HttpResponse): void {
        console.log('by custom listener', response.getTag());
        console.log(response.getListenerName());
        console.log(response.response);
    }
    onLoadEnd(event: Event, response: HttpResponse): void {
        console.log('on load end');
    }
    onLoadStart(event: Event, response: HttpResponse): void {
        console.log('on load start');
    }
    onProgress(event: Event, response: HttpResponse): void {
        console.log('on progress');
    }
}

export class Books extends Model {
    public id:number;
    public title:string;
    public author:string;
}
export module MyApp {

    export class IndexController extends Controller {

        indexAction() {

            let book = new Books();
            book.title = 'Alice in Wonderland' ;
            book.author = 'Lewis Carroll' ;
            book.save();
            
            //this.view.setVar('hello', '<b>hello !</b>');
            this.view.setVar('message', 'please enter a email');
            //this.view.setVar('names', [{ name: 'John' }, { name: 'Foo' }, { name: 'Bar' }]);
            this.view.setPartials({ list: '{{#names}}<li>{{name}}</li>{{/names}}' });

        }
        helloAction(email) {
            this.view.setVar('hello', '<b>hello !</b>');
            this.view.setVar('names', [{ name: email }]);
        }
        validateAction(e, kind) {
            let value = e.target.value;

            if (kind == 'email') {


                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (re.test(value)) {

                    this.view.setVar('message', value + ' great !');
                    this.view.setVar('is_valid_email', 'is-success');
                    this.view.setVar('help', 'is-success');
                    this.view.setVar('icon_check', 'fa-check');
                    this.dispatcher.forward('index', 'hello', [value]);
                } else {

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
        }
    }
}


let di = new Di();
di.set('viewEngine', function() {
    let engine = new Mustache();
    return engine;
}, true);
di.set('httpRequest', function() {
    let request = new HttpRequest();
    return request;
}, true);
di.set('connection', function() {
    let connection = new Connection();
    return connection;
}, false);
/*di.set('view', function() {
    let view = new View();
    return view ;
}, true);*/

let app = new Application(di);
app.setDefaultModule(MyApp);
app.handle();
