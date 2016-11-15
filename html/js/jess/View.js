define(["require", "exports"], function (require, exports) {
    "use strict";
    var View = (function () {
        function View(element) {
            this._engine = null;
            this._template = '';
            this._content = '';
            this._variables = {};
            this._partials = {};
            this._rootElement = element ? element : document.documentElement;
            this.setTemplate(this._rootElement.innerHTML);
        }
        View.prototype.setTemplate = function (template) {
            this._template = template;
        };
        View.prototype.getTemplate = function () {
            return this._template;
        };
        View.prototype.setContent = function (content) {
            this._content = content;
        };
        View.prototype.getContent = function () {
            return this._content;
        };
        View.prototype.setVar = function (name, value) {
            this._variables[name] = value;
        };
        View.prototype.setVars = function (variables, merge) {
            var v = Object.create(variables);
            if (merge) {
                for (var i in v) {
                    this.setVar(i, v[i]);
                }
            }
            else {
                this._variables = v;
            }
        };
        View.prototype.getVar = function (name) {
            return this._variables[name];
        };
        View.prototype.setPartials = function (partials) {
            this._partials = partials;
        };
        View.prototype.getPartials = function () {
            return this._partials;
        };
        View.prototype.parse = function (tags) {
            this._content = this._engine.parse(this.getTemplate(), tags);
        };
        View.prototype.render = function (partials) {
            partials = partials ? partials : this.getPartials();
            this.setContent(this._engine.render(this.getTemplate(), this._variables, partials));
        };
        View.prototype.setViewEngine = function (engine) {
            this._engine = engine;
        };
        View.prototype.getViewEngine = function () {
            return this._engine;
        };
        return View;
    }());
    exports.View = View;
});
