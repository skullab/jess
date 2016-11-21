requirejs.config({
    baseUrl: './js/app',
    paths: {
        'mustache': '../vendor/mustache.min'
    }
});
// Launch the APP !!!
requirejs(['main']);
