define(["require", "exports", '../util/Util', './View/TemplateObserver'], function (require, exports, Util_1, TemplateObserver_1) {
    "use strict";
    var View = (function () {
        function View(element) {
            if (element === void 0) { element = document.documentElement; }
            this._engine = null;
            this._template = '';
            this._content = '';
            this._variables = {};
            this._di = null;
            this._enable = true;
            this._isRendered = false;
            this._dataBinding = [];
            this._guid = Util_1.Util.guid();
            this.setRootElement(element);
            return this;
        }
        View.prototype.enable = function () {
            this._enable = true;
        };
        View.prototype.disable = function () {
            this._enable = false;
        };
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
        View.prototype.setObserver = function (target) {
            this._observer = new TemplateObserver_1.TemplateObserver(target, this._rootElement);
            this._observer.observe();
        };
        View.prototype.setTemplate = function (template) {
            this._template = template.replace(/&gt;/g, '>');
            this._templateElement = document.createElement(this._rootElement.nodeName);
            var attrs = this._rootElement.attributes;
            for (var i = 0; i < attrs.length; i++) {
                this._templateElement.setAttribute(attrs[i].nodeName, attrs[i].nodeValue);
            }
            this._templateElement.innerHTML = this._template;
            this.setObserver(this._templateElement);
        };
        View.prototype.getTemplate = function () {
            return this._template;
        };
        View.prototype.setContent = function (content) {
            this._content = content;
            this._templateElement.innerHTML = this._content;
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
        View.prototype.removeVar = function (name) {
            if (this.hasVar(name)) {
                delete this._variables[name];
            }
        };
        View.prototype.removeAllVars = function () {
            this._variables = {};
        };
        View.prototype.hasVar = function (name) {
            return this._variables.hasOwnProperty(name);
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
        };
        View.prototype.render = function (partials) {
            if (!this._enable)
                return;
            this.checkEngine();
            partials = partials ? partials : this.getPartials();
            this.setContent(this._engine.render(this.getTemplate(), this._variables, partials));
        };
        View.prototype.setViewEngine = function (engine) {
            this._engine = engine;
        };
        View.prototype.getViewEngine = function () {
            return this._engine;
        };
        View.prototype.start = function () { };
        View.prototype.finish = function () {
            console.log('finish render');
            this.getRootElement().style.visibility = "visible";
        };
        View.prototype.query = function (q) {
            return this._rootElement.querySelector(q);
        };
        View.prototype.queryAll = function (q) {
            return this._rootElement.querySelectorAll(q);
        };
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
