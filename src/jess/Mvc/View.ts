import {ViewInterface} from './View/ViewInterface';
import {ViewEngineInterface} from './View/Engine/ViewEngineInterface';
import {InjectionAwareInterface} from '../Di/InjectionAwareInterface';
import {DiInterface} from '../Di/DiInterface';
import {Util} from '../util/Util';
import {TemplateObserver} from './View/TemplateObserver';

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
    protected _observer: TemplateObserver;

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
    setObserver(target: Element) {
        this._observer = new TemplateObserver(target, this._rootElement);
        this._observer.observe();
    }

    setTemplate(template: string): void {

        this._template = template.replace(/&gt;/g, '>');
        this._templateElement = document.createElement(this._rootElement.nodeName);
        let attrs = this._rootElement.attributes;
        for (let i = 0; i < attrs.length; i++) {
            this._templateElement.setAttribute(attrs[i].nodeName, attrs[i].nodeValue);
        }
        this._templateElement.innerHTML = this._template;
        this.setObserver(this._templateElement);
    }
    getTemplate(): string {
        return this._template;
    }
    setContent(content: string): void {
        this._content = content;
        this._templateElement.innerHTML = this._content;
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
    removeVar(name: string): void {
        if (this.hasVar(name)) {
            delete this._variables[name];
        }
    }
    removeAllVars(): void {
        this._variables = {};
    }
    hasVar(name: string) {
        return this._variables.hasOwnProperty(name);
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
    finish() {
		console.log('finish render');
		this.getRootElement().style.visibility = "visible" ;
	}
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