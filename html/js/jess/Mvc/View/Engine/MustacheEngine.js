define(["require", "exports"], function (require, exports) {
    "use strict";
    var MustacheEngine = (function () {
        function MustacheEngine() {
        }
        /**
        * Parse the template view.
        *
        * @param {string} template : The template to parse.
        * @param {string[]} tags? : Optional Tags used to parse variables.
        *
        * @return {string} : The parsed template.
        */
        MustacheEngine.prototype.parse = function (template, tags) {
            return Mustache.parse(template, tags);
        };
        /**
         * Render the template view.
         *
         * @param {string} template : The template to render.
         * @param {object} variables : The variables in the view.
         * @param {object} partials? : Optional partial views to render inside the current view.
         *
         * @return {string} : The rendered template.
         */
        MustacheEngine.prototype.render = function (template, variables, partials) {
            return Mustache.render(template, variables, partials);
        };
        return MustacheEngine;
    }());
    exports.MustacheEngine = MustacheEngine;
});
