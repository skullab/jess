define(["require", "exports", '../Mvc/View', '../Di', '../Mvc/View/Engine/MustacheEngine'], function (require, exports, View_1, Di_1, MustacheEngine_1) {
    "use strict";
    var di = new Di_1.Di();
    var view = new View_1.View();
    di.set('test', 784);
    console.log(di.get('test'));
    di.set('view', view);
    di.get('view');
    view.setViewEngine(new MustacheEngine_1.MustacheEngine());
    view.setVar('title', 'Welcome Jess !');
    view.setVar('name', { 'first': 'James', 'last': 'Bond' });
    view.setVar('myList', [
        { 'foo': 'hello' },
        { 'foo': 'world' },
        { 'foo': '!' }
    ]);
    view.parse();
    view.render({ user: '<b>{{name}}</b>' });
    console.log(view.getDi());
});
