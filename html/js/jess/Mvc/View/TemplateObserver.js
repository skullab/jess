define(["require", "exports"], function (require, exports) {
    "use strict";
    var TemplateObserver = (function () {
        function TemplateObserver(target, origin, config) {
            this._config = {
                attributes: true,
                childList: true,
                characterData: true,
                subtree: true,
                attributeOldValue: true,
                characterDataOldValue: true
            };
            this._config = config || this._config;
            this._target = target;
            this._origin = origin;
            this._observer = new MutationObserver(this._callback.bind(this));
        }
        TemplateObserver.prototype.__walk = function (target, origin, parentOrigin, previousOrigin) {
            if (target.nodeType === TemplateObserver.TYPE_ELEMENT) {
                // genitore
                //console.log('parent', target, origin);
                var el_eq = target == origin;
                //console.info('previous origin element', previousOrigin);
                var origin_type = null;
                var origin_tag = null;
                if (!origin) {
                    //console.warn('origin is not exists !');
                    origin = target.cloneNode();
                    var _origin = origin;
                    var _target = target;
                    _origin.innerHTML = _target.innerHTML;
                    previousOrigin.appendChild(origin);
                }
                if (origin) {
                    //console.log('saving previous origin element...');
                    previousOrigin = origin;
                    parentOrigin = origin.parentElement;
                    origin_type = origin.nodeType;
                    origin_tag = origin.nodeName;
                }
                //console.info('element equality:', el_eq);
                var attrs_eq = target.attributes == origin.attributes;
                //console.info('attributes equality', attrs_eq);
                if (!attrs_eq) {
                    var attrs = target.attributes;
                    for (var i = 0; i < attrs.length; i++) {
                        var _origin = origin;
                        _origin.setAttribute(attrs[i].nodeName, attrs[i].nodeValue);
                    }
                }
                //console.info('node type equality:', target.nodeType === origin_type);
                if (target.nodeType !== origin_type) {
                }
                if (target.nodeName != origin_tag) {
                    //console.warn('tag equality:', target.nodeName == origin_tag, target.nodeName, origin_tag);
                    parentOrigin.replaceChild(target.cloneNode(true), origin);
                }
                else {
                }
                target = target.firstChild;
                origin = origin.firstChild;
                // figlio
                //console.log('first child', target, origin);
                if (target) {
                }
                if (origin) {
                }
                if (!target && origin) {
                    //console.warn('target not exist but origin is an element...removing ?', origin);
                    //console.warn('origin type:', origin.nodeType);
                    //console.warn('origin tag:', origin.nodeName);
                    switch (origin.nodeType) {
                        case TemplateObserver.TYPE_TEXT_NODE:
                            origin.textContent = null;
                            break;
                        case TemplateObserver.TYPE_ELEMENT:
                            var _origin = origin;
                            //_origin.innerHTML = null ;
                            break;
                    }
                }
                while (target) {
                    this.__walk(target, origin, parentOrigin, previousOrigin);
                    //console.log('next sibling');
                    target = target.nextSibling;
                    if (!origin) {
                    }
                    else {
                        origin = origin.nextSibling;
                    }
                }
            }
            else {
                //console.log('not an element...');
                if (target.nodeType === TemplateObserver.TYPE_TEXT_NODE) {
                    //console.log('...is a text node');
                    if (!origin) {
                    }
                    else {
                        var txt_n_eq = target == origin;
                        var txt_eq = target.textContent == origin.textContent;
                        //console.info('text node equality:', txt_n_eq);
                        //console.info('text content equality:', txt_eq);
                        if (!txt_eq) {
                            origin.textContent = target.textContent;
                        }
                    }
                }
            }
            //console.log('finish traversing!');
        };
        TemplateObserver.prototype._callback = function (mutations) {
            //console.log('>>                   TEMPLATE OBSERVER                     <<');
            this.__walk(this._target, this._origin);
        };
        TemplateObserver.prototype.setConfig = function (mix, value) {
            if (typeof mix === 'object') {
                this._config = mix;
            }
            else if (value && typeof mix === 'string') {
                this._config[mix] = value;
            }
        };
        TemplateObserver.prototype.getConfig = function () {
            return this._config;
        };
        TemplateObserver.prototype.observe = function () {
            this._observer.observe(this._target, this._config);
        };
        TemplateObserver.prototype.disconnect = function () {
            return this._observer.disconnect();
        };
        TemplateObserver.prototype.takeRecords = function () {
            return this._observer.takeRecords();
        };
        TemplateObserver.TYPE_ELEMENT = 1;
        TemplateObserver.TYPE_TEXT_NODE = 3;
        TemplateObserver.TYPE_PROCESSING_INSTRUCTION_NODE = 7;
        TemplateObserver.TYPE_COMMENT_NODE = 8;
        TemplateObserver.TYPE_DOCUMENT_NODE = 9;
        TemplateObserver.TYPE_DOCUMENT_TYPE_NODE = 10;
        TemplateObserver.TYPE_DOCUMENT_FRAGMENT_NODE = 11;
        return TemplateObserver;
    }());
    exports.TemplateObserver = TemplateObserver;
});
