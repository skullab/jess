define(["require", "exports", 'mustache'], function (require, exports, _mustache) {
    "use strict";
    //declare let mustache: Mustache; // be sure that mustache.min.js is loaded !!
    var Mustache = (function () {
        function Mustache() {
            this.name = _mustache.name;
            this.version = _mustache.version;
            this.tags = _mustache.tags;
            this.Scanner = _mustache.Scanner;
            this.Context = _mustache.Context;
            this.Writer = _mustache.Writer;
        }
        /**
         * Export the escaping function so that the user may override it.
         * See https://github.com/janl/mustache.js/issues/244
         */
        Mustache.prototype.escape = function (s) {
            return _mustache.escape(s);
        };
        /**
        * Clears all cached templates in the default writer.
        */
        Mustache.prototype.clearCache = function () {
            return _mustache.clearCache();
        };
        /**
         * This is here for backwards compatibility with 0.4.x.,
         */
        Mustache.prototype.to_html = function (template, view, partials, send) {
            return _mustache.to_html(template, view, partials, send);
        };
        /**
        * Parse the template view.
        *
        * @param {string} template : The template to parse.
        * @param {string[]} tags? : Optional Tags used to parse variables.
        *
        * @return {string} : The parsed template.
        */
        Mustache.prototype.parse = function (template, tags) {
            return _mustache.parse(template, tags);
            //.filter(function(v) { return v[0] === 'name' })
            //.map(function(v) { return v[1]; });
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
        Mustache.prototype.render = function (template, variables, partials) {
            return _mustache.render(template, variables, partials);
        };
        return Mustache;
    }());
    exports.Mustache = Mustache;
});
