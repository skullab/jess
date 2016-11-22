requirejs.config({
    baseUrl: './js/app',
    paths: {
        'mustache': '../vendor/mustache.min',
        'handlebars': '../vendor/handlebars-v4.0.5'
    }
});
// Launch the APP !!!
requirejs(['main']);
