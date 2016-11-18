import {View} from '../Mvc/View';
import {Di} from '../Di';
import {MustacheEngine} from '../Mvc/View/Engine/MustacheEngine' ;
import {InjectionAwareInterface} from '../Di/InjectionAwareInterface' ;

let di = new Di();
let view = new View();
di.set('test',784);
console.log(di.get('test'));
di.set('view',view);
di.get('view');

view.setViewEngine(new MustacheEngine());
view.setVar('title','Welcome Jess !');
view.setVar('name',{'first':'James','last':'Bond'});
view.setVar('myList',[
    {'foo':'hello'},
    {'foo':'world'},
    {'foo':'!'}
]);
view.parse();

view.render({user:'<b>{{name}}</b>'});

console.log(view.getDi());