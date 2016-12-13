export class TemplateObserver {
    static TYPE_ELEMENT = 1;
    static TYPE_TEXT_NODE = 3;
    static TYPE_PROCESSING_INSTRUCTION_NODE = 7;
    static TYPE_COMMENT_NODE = 8;
    static TYPE_DOCUMENT_NODE = 9;
    static TYPE_DOCUMENT_TYPE_NODE = 10;
    static TYPE_DOCUMENT_FRAGMENT_NODE = 11;

    protected _observer: MutationObserver;
    protected _config: {} = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    };
    protected _target: Element;
    protected _origin: Element;

    constructor(target: Element, origin: Element, config?: {}) {
        this._config = config || this._config;
        this._target = target;
        this._origin = origin;
        this._observer = new MutationObserver(this._callback.bind(this));
    }
    protected __walk(target: Element | Node, origin: Element | Node, parentOrigin?: Element | Node, previousOrigin?: Element | Node) {
        if (target.nodeType === TemplateObserver.TYPE_ELEMENT) {

            // genitore
            //console.log('parent', target, origin);
            let el_eq = target == origin;
            //console.info('previous origin element', previousOrigin);
            let origin_type = null;
            let origin_tag = null;

            if (!origin) {
                //console.warn('origin is not exists !');

                origin = target.cloneNode();
                let _origin = <Element>origin;
                let _target = <Element>target;
                _origin.innerHTML = _target.innerHTML;
                previousOrigin.appendChild(origin);
                //console.log(origin);
            }

            if (origin) {
                //console.log('saving previous origin element...');
                previousOrigin = origin;
                parentOrigin = origin.parentElement;
                origin_type = origin.nodeType;
                origin_tag = origin.nodeName;
            }

            //console.info('element equality:', el_eq);
            let attrs_eq = target.attributes == origin.attributes;
            //console.info('attributes equality', attrs_eq);
            if (!attrs_eq) {
                let attrs = target.attributes;
                for (let i = 0; i < attrs.length; i++) {
                    let _origin = <Element>origin;
                    _origin.setAttribute(attrs[i].nodeName, attrs[i].nodeValue);
                }
            }
            //console.info('node type equality:', target.nodeType === origin_type);
            if (target.nodeType !== origin_type) {
                //console.warn('origin node type is different to target node type!', target, origin);
            }
            if (target.nodeName != origin_tag) {
                //console.warn('tag equality:', target.nodeName == origin_tag, target.nodeName, origin_tag);
                parentOrigin.replaceChild(target.cloneNode(true), origin);
            } else {
                //console.info('tag equality:', target.nodeName == origin_tag);
            }

            target = target.firstChild;
            origin = origin.firstChild;
            // figlio
            //console.log('first child', target, origin);

            if (target) {
                //console.log('first child target node type:', target.nodeType);
            }
            if (origin) {
                //console.log('first child origin node type:', origin.nodeType);
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
                        let _origin = <Element>origin;
                        //_origin.innerHTML = null ;
                        break;
                }

                //previousOrigin.removeChild(origin);
            }

            while (target) {
                this.__walk(target, origin, parentOrigin, previousOrigin);
                //console.log('next sibling');
                target = target.nextSibling;
                if (!origin) {
                    //console.warn('origin is not exists...nextSibling?');
                } else {
                    origin = origin.nextSibling;
                }
            }
            //console.log('nothing to do...');
        } else {
            //console.log('not an element...');
            if (target.nodeType === TemplateObserver.TYPE_TEXT_NODE) {
                //console.log('...is a text node');
                if (!origin) {
                    //console.warn('target is a text node but origin doesn\'t exist !');

                } else {
                    let txt_n_eq = target == origin;
                    let txt_eq = target.textContent == origin.textContent;
                    //console.info('text node equality:', txt_n_eq);
                    //console.info('text content equality:', txt_eq);
                    if (!txt_eq) {
                        origin.textContent = target.textContent;
                    }
                }
            }
        }
        //console.log('finish traversing!');
    }

    protected _callback(mutations) {
        //console.log('>>                   TEMPLATE OBSERVER                     <<');
        this.__walk(this._target, this._origin);
    }

    setConfig(mix: any, value?: any) {
        if (typeof mix === 'object') {
            this._config = mix;
        } else if (value && typeof mix === 'string') {
            this._config[mix] = value;
        }
    }
    getConfig() {
        return this._config;
    }
    observe() {
        this._observer.observe(this._target, this._config);
    }
    disconnect() {
        return this._observer.disconnect();
    }
    takeRecords() {
        return this._observer.takeRecords();
    }
}