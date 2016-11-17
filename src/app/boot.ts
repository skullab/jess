import {View} from '../Mvc/View';
import {Di} from '../Di';
import {MustacheEngine} from '../Mvc/View/Engine/MustacheEngine' ;

let di = new Di();
let view = new View(di);
view.setViewEngine(new MustacheEngine());
view.setVar('title','Welcome Jess !');
view.setVar('name',{'first':'James','last':'Bond'});
view.setVar('myList',[
    {'foo':'hello'},
    {'foo':'world'},
    {'foo':'!'}
]);
view.parse();

view.render();