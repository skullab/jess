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
import * as s from '../jess/util/Shortcuts';

export class MyHttpListener implements HttpListener {
	onTimeout(event: Event, response: HttpResponse): void {
		console.log('on timeout'); 
	}
    onAbort(event: Event, response: HttpResponse): void { }
    onError(event: Event, response: HttpResponse): void { }
    onLoad(event: Event, response: HttpResponse): void { 
		console.log('by custom listener',response.getTag());
		console.log(response.response,response.toJSON());
	}
    onLoadEnd(event: Event, response: HttpResponse): void { }
    onLoadStart(event: Event, response: HttpResponse): void { }
    onProgress(event: Event, response: HttpResponse): void { }
}
export module MyApp {

    export class IndexController extends Controller {

        indexAction() {
            let request = new HttpRequest();
            request.onreadystatechange(function(e) {
				if (this.readyState == 4) {
					console.log(e);
					console.log(this.response);
				}
            });
			request.setHttpListener(new MyHttpListener());
			request.setTimeout(1);
            //request.setCredentials(true);
            //request.setResponseType(HttpRequest.RESPONSE_JSON);
            //request.open(HttpRequest.POST, "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FYahoo'%20and%20xpath%3D'%2F%2Ftable%2F*%5Bcontains(.%2C%22Founder%22)%5D%2F%2Fa'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys");
			request.setTag('first');
			request.setParams({ name: 'test' });
            request.open(HttpRequest.GET, 'service.php');
            request.send();

			request.setTag('second');
            request.open(HttpRequest.POST, 'service.php');
			request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.send();

			request.setTag('third');
			request.setParams({ other: 'foobar' });
			request.post('service.php');
			//console.log(request.getTimeout());


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

/*di.set('view', function() {
    let view = new View();
    return view ;
}, true);*/

let app = new Application(di);
app.setDefaultModule(MyApp);
app.handle();
