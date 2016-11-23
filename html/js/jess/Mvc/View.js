define(["require", "exports", '../util/Util'], function (require, exports, Util_1) {
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
            var _this = this;
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    console.log('>>> observer');
                    var _old = mutation.removedNodes;
                    var _new = mutation.addedNodes;
                    for (var i in _old) {
                        if (_old[i] !== _new[i]) {
                            console.log('    find differences..');
                            console.log('node type :', _new[i].nodeType);
                            console.log(_old[i], 'vs', _new[i]);
                            if (_new[i].nodeType == 1) {
                                console.log('    check innerHTML');
                                var _oldEl = _old[i];
                                var _newEl = _new[i];
                                console.log(_oldEl.innerHTML, 'vs', _newEl.innerHTML);
                                if (_new[i].hasChildNodes()) {
                                    var _newNodes = _new[i].childNodes;
                                    var _oldNodes = _old[i].childNodes;
                                    for (var _i in _newNodes) {
                                        console.log(_oldNodes[_i], 'vs', _newNodes[_i]);
                                        if (_newNodes[_i].nodeType == 1) {
                                            console.log('    >>>>>>>>>>> check innerHTML');
                                            console.log(_oldNodes[_i].innerHTML, 'vs', _newNodes[_i].innerHTML);
                                            if (_oldNodes[_i].innerHTML != _newNodes[_i].innerHTML) {
                                                console.log('       FIND IT !');
                                                console.log('coord', i, _i);
                                                _this._rootElement.childNodes[i].childNodes[_i].innerHTML = _newNodes[_i].innerHTML;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            });
            // configuration of the observer:
            var config = {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true,
                attributeOldValue: true,
                characterDataOldValue: true
            };
            // pass in the target node, as well as the observer options
            //console.log(target);
            observer.observe(target, config);
        };
        View.prototype.setTemplate = function (template) {
            this._template = template.replace(/&gt;/g, '>');
            this._templateElement = document.createElement('div');
            this._templateElement.innerHTML = this._template;
            this.setObserver(this._templateElement);
            /*for (let i = 0; i < this._templateElement.childNodes.length; i++) {
                let node = this._templateElement.childNodes[i]
                this.prepareObserver(node);
            }*/
            /*let p = /\{\{\s*[a-zA-Z0-9_]*\s*\}\}/ig;
            let m;
            let _m = '';
            let _l = this._template.length;
            let _i = 0;
            while (m = p.exec(this._template)) {
                let _v = m[0].replace(/\{\{/g, '').replace(/\}\}/g, '').trim();
                _m += m.input.substring(_i, _i = m.index) + '<div id="' + this._guid + ':' + _v + '">' + m[0] + '</div>';
                _i += m[0].length;
            }
            _m += template.substring(_i, _l);
            
            this._template = _m ;*/
        };
        View.prototype.getTemplate = function () {
            return this._template;
        };
        View.prototype.setContent = function (content) {
            this._content = content;
            /*if (!this._isRendered) {
                //this._rootElement.innerHTML = this._content;
                console.log(this._rootElement.innerHTML);
                this._isRendered = true;
                return;
            }
            if (this._rootElement.innerHTML != this._content) {
                console.log('render > bind');
                console.log(this._rootElement.innerHTML);
                console.log(this._content);
            }*/
            this._templateElement.innerHTML = this._content;
            console.log(this._templateElement.innerHTML);
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
        View.prototype.finish = function () { };
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
