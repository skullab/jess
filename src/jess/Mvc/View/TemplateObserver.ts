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
    protected _walk(node: Element | Node, old: Element | Node, index: number, coord?: any, space?: string, delegate?: {}) {
        coord = coord || [];
        let c = coord.length;
        space = space ? space + space : '*--';

        console.log(space + 'BEGIN', 'with', node, 'index', index);
        if (node.nodeType === TemplateObserver.TYPE_ELEMENT) {
            console.log(space + '|-----------> START');
            if (node && old) {

                let innerHTML_test = node.innerHTML === old.innerHTML;
                let attrs = [node.attributes, old.attributes];

                console.log('innerHTML:', innerHTML_test)
                console.log('attributes:', node.attributes == old.attributes)

                console.log(node.innerHTML, old.innerHTML);
                console.log(node.attributes, old.attributes);

                coord.push(c);
                console.log(coord);

                delegate = { node: node, origin: old, innerHTML: innerHTML_test, attrs: attrs };
            }
            
            if(!old){
                console.log(space+'|-----------> NO ORIGIN !')
                let _d = document.createElement(node.parentElement.nodeName);
                _d.appendChild(node);
                old = _d ;
                old = node ;
                console.log(old.parentElement);
            }
            node = node.firstChild;
            old = old.firstChild;

            console.log(space + 'first child', node);
            while (node) {
                this._walk(node, old, index, coord, space, delegate);
                console.log(space + 'processing...', node);
                node = node.nextSibling;
                old = old ? old.nextSibling : null;
                console.log('       >-----------', node);
                if (node && old) {

                    let innerHTML_test = node.innerHTML === old.innerHTML;
                    let attrs = [node.attributes, old.attributes];

                    console.log('innerHTML:', innerHTML_test);
                    console.log('attributes:', node.attributes == old.attributes)

                    delegate = { node: node, origin: old, innerHTML: innerHTML_test, attrs: attrs };
                }
                console.log('-----------< END');
                console.log('');
            }
            console.log(space + 'FINISH -> ', delegate);
            console.log(space + 'COORD  -> ', index, coord[coord.length - 1]);
            console.log('');


        } else {
            console.log(space + '|->   [not an element]');
            console.log(space + '----------------------');
            console.log('');
        }

        return delegate;
    }
    protected __walk(target: Element | Node, origin: Element | Node, parentOrigin?: Element | Node, previousOrigin?: Element | Node) {
        if (target.nodeType === TemplateObserver.TYPE_ELEMENT) {
            console.log('WALK....');

           
            console.log('--->',origin,target);
            
            if (!origin) {
                console.log('->NOT ORIGIN<-');

                console.log(parentOrigin, previousOrigin.lastChild, target);
                if(previousOrigin.lastChild.nodeType !== target.nodeType ){
                    previousOrigin.removeChild(previousOrigin.lastChild);
                    console.log('remove----');
                }
                previousOrigin.appendChild(target);
                
                //origin = target ;//previousOrigin.lastChild ;
                
                //console.log(origin.parentElement,target);
                //parentOrigin.replaceChild(target,target.parentElement.firstChild);
                //origin = target ;
                //console.log(origin,target);
                //previousOrigin.appendChild(target);
            }
            
            
            //console.log('EQUALITY',origin == target);
            
            
             if (origin) {
                parentOrigin = origin.parentElement;
                previousOrigin = origin;
                console.log('<if origin>', parentOrigin, previousOrigin,origin,target);
            }
            
            target = target.firstChild;
            origin = origin ? origin.firstChild : null ;
            console.log('<-LAST->',origin,target);

            while (target) {
                this.__walk(target, origin, parentOrigin, previousOrigin);
                target = target.nextSibling;
                origin = origin ?  origin.nextSibling : null ;
                console.log('------------------------',origin)
            }

        }
    }
    protected _callback(mutations) {
        console.log('>>                   TEMPLATE OBSERVER                     <<');
        this._walk(this._target,this._origin,0);
        /*
        let _this = this;
        mutations.forEach(function(mutation: MutationRecord) {
            console.log('>> TEMPLATE OBSERVER <<');
            //console.log(mutation)
            _this.__walk(_this._target, _this._origin);
        });*/
    }
    protected parseDelegate(delegate: { node: Node, origin: Node, innerHTML: boolean, attrs: {}[] }) {
        if (delegate) {
            console.log('+++++++++++++++++++++++++++++++++++++++++++++');
            if (!delegate.innerHTML) {
                delegate.origin.innerHTML = delegate.node.innerHTML;
            }
            console.log('+++++++++++++++++++++++++++++++++++++++++++++');
        }
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