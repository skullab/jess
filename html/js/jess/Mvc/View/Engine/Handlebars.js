define(["require", "exports", 'handlebars'], function (require, exports, _handlebars) {
    "use strict";
    var Handlebars = (function () {
        function Handlebars() {
        }
        /**
        * Parse the template view.
        *
        * @param {string} template : The template to parse.
        * @param {string[]} tags? : Optional Tags used to parse variables.
        *
        * @return {string} : The parsed template.
        */
        Handlebars.prototype.parse = function (template, tags) {
            this._templateSpec = _handlebars.precompile(template);
            return this._templateSpec;
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
        Handlebars.prototype.render = function (template, variables, partials) {
            if (partials === void 0) { partials = {}; }
            _handlebars.registerPartial(partials);
            //let compiled = this._templateSpec ? _handlebars.template(this._templateSpec) : _handlebars.compile(template);
            var compiled = _handlebars.compile(template);
            return compiled(variables);
        };
        return Handlebars;
    }());
    exports.Handlebars = Handlebars;
});
