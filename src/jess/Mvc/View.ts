import {ViewInterface} from './View/ViewInterface';
import {ViewEngineInterface} from './View/Engine/ViewEngineInterface';
import {InjectionAwareInterface} from '../Di/InjectionAwareInterface';
import {DiInterface} from '../Di/DiInterface';
import {Util} from '../util/Util';

export class View implements ViewInterface, InjectionAwareInterface {

    protected _engine: ViewEngineInterface = null;
    protected _template: string = '';
    protected _templateElement: Element;
    protected _content: string = '';
    protected _parsedContent: any;
    protected _variables: {} = {};
    protected _partials: {};
    protected _rootElement: Element;
    protected _di = null;
    protected _name: string;
    protected _enable: boolean = true;
    protected _isRendered: boolean = false;
    protected _dataBinding: {}[] = [];
    protected _guid: any;

    constructor(element: Element = document.documentElement) {
        this._guid = Util.guid();
        this.setRootElement(element);
        return this;
    }
    enable(): void {
        this._enable = true;
    }
    disable(): void {
        this._enable = false;
    }
    setName(name: string) {
        this._name = name;
    }
    getName(): string {
        return this._name;
    }
    setRootElement(element: Element) {
        this._rootElement = element;
        this.setTemplate(this._rootElement.innerHTML);
    }
    getRootElement(): Element {
        return this._rootElement;
    }
    setObserver(target) {
        let _this = this ;
        let observer = new MutationObserver(function(mutations) {

            mutations.forEach(function(mutation) {
                console.log('>>> observer');
                let _old = mutation.removedNodes;
                let _new = mutation.addedNodes;
                for (let i in _old) {
                    if (_old[i] !== _new[i]) {
                        console.log('    find differences..');
                        console.log('node type :', _new[i].nodeType);
                        console.log(_old[i], 'vs', _new[i]);
                        if (_new[i].nodeType == 1) {
                            console.log('    check innerHTML');
                            let _oldEl = <Element>_old[i];
                            let _newEl = <Element>_new[i];
                            console.log(_oldEl.innerHTML, 'vs', _newEl.innerHTML);
                            if (_new[i].hasChildNodes()) {
                                let _newNodes = _new[i].childNodes;
                                let _oldNodes = _old[i].childNodes;
                                for (let _i in _newNodes) {
                                    console.log(_oldNodes[_i], 'vs', _newNodes[_i]);
                                    if (_newNodes[_i].nodeType == 1) {
                                        console.log('    >>>>>>>>>>> check innerHTML');
                                        console.log(_oldNodes[_i].innerHTML, 'vs', _newNodes[_i].innerHTML);
                                        if (_oldNodes[_i].innerHTML != _newNodes[_i].innerHTML) {
                                            console.log('       FIND IT !');
                                            console.log('coord',i,_i);
                                            _this._rootElement.childNodes[i].childNodes[_i].innerHTML = _newNodes[_i].innerHTML ;
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
        let config = {
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
    }

    setTemplate(template: string): void {

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

    }
    getTemplate(): string {
        return this._template;
    }
    setContent(content: string): void {
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
    }
    getContent(): string {
        return this._content;
    }
    setVar(name: string, value: any): void {
        this._variables[name] = value;
    }
    setVars(variables: {}, merge?: boolean): void {
        let v = Object.create(variables);
        if (merge) {
            for (let i in v) {
                this.setVar(i, v[i]);
            }
        } else {
            this._variables = v;
        }
    }
    getVar(name: string): any {
        return this._variables[name];
    }
    getVars(): {} {
        return this._variables;
    }
    setPartials(partials: {}): void {
        this._partials = partials;
    }
    getPartials() {
        return this._partials;
    }
    protected checkEngine() {
        if (!this._engine || typeof this._engine['parse'] !== 'function' || typeof this._engine['render'] !== 'function') {
            throw new Error("The View MUST have sets a View Engine instance");
        }
    }
    parse(tags?: string[]): void {
        this.checkEngine();
        this._parsedContent = this._engine.parse(this.getTemplate(), tags);
        //console.log(this._parsedContent);
    }
    render(partials?: {}): void {
        if (!this._enable) return;
        this.checkEngine();
        partials = partials ? partials : this.getPartials();
        this.setContent(this._engine.render(this.getTemplate(), this._variables, partials));
    }
    setViewEngine(engine: ViewEngineInterface): void {
        this._engine = engine;
    }
    getViewEngine(): ViewEngineInterface {
        return this._engine;
    }
    start() { }
    finish() { }
    query(q: string): any {
        return this._rootElement.querySelector(q);
    }
    queryAll(q: string): any {
        return this._rootElement.querySelectorAll(q);
    }
    /**
    * Set the dependency injection container.
    * @param {object} di : The dependency injection container.
    */
    setDi(di: DiInterface): void {
        this._di = di;
    }
    /**
     * Returns the dependecy injection container.
     * @return {object} : The dependency injection container.
     */
    getDi(): DiInterface {
        return this._di;
    }
}