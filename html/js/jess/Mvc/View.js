define(["require", "exports"], function (require, exports) {
    "use strict";
    var View = (function () {
        function View(element) {
            if (element === void 0) { element = document.documentElement; }
            this._engine = null;
            this._template = '';
            this._content = '';
            this._variables = {};
            this._di = null;
            this.setRootElement(element);
            return this;
        }
        View.prototype.setName = function (name) {
            this._name = name;
        };
        View.prototype.getName = function () {
            return this._name;
        };
        View.prototype.setRootElement = function (element) {
            this._rootElement = element;
            this.setTemplate(this._rootElement.innerHTML);
        };
        View.prototype.getRootElement = function () {
            return this._rootElement;
        };
        View.prototype.setTemplate = function (template) {
            this._template = template.replace(/&gt;/g, '>');
        };
        View.prototype.getTemplate = function () {
            return this._template;
        };
        View.prototype.setContent = function (content) {
            this._rootElement.innerHTML = this._content = content;
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
        View.prototype.getVars = function () {
            return this._variables;
        };
        View.prototype.setPartials = function (partials) {
            this._partials = partials;
        };
        View.prototype.getPartials = function () {
            return this._partials;
        };
        View.prototype.checkEngine = function () {
            if (!this._engine || typeof this._engine['parse'] !== 'function' || typeof this._engine['render'] !== 'function') {
                throw new Error("The View MUST have sets a View Engine instance");
            }
        };
        View.prototype.parse = function (tags) {
            this.checkEngine();
            this._parsedContent = this._engine.parse(this.getTemplate(), tags);
            //console.log(this._parsedContent);
        };
        View.prototype.render = function (partials) {
            this.checkEngine();
            partials = partials ? partials : this.getPartials();
            //this.setTemplate(this._rootElement.innerHTML);
            this.setContent(this._engine.render(this.getTemplate(), this._variables, partials));
        };
        View.prototype.setViewEngine = function (engine) {
            this._engine = engine;
        };
        View.prototype.getViewEngine = function () {
            return this._engine;
        };
        View.prototype.start = function () { };
        View.prototype.finish = function () { };
        /**
        * Set the dependency injection container.
        * @param {object} di : The dependency injection container.
        */
        View.prototype.setDi = function (di) {
            this._di = di;
        };
        /**
         * Returns the dependecy injection container.
         * @return {object} : The dependency injection container.
         */
        View.prototype.getDi = function () {
            return this._di;
        };
        return View;
    }());
    exports.View = View;
});
