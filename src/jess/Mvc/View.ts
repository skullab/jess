import {ViewInterface} from './View/ViewInterface';
import {ViewEngineInterface} from './View/Engine/ViewEngineInterface';
import {InjectionAwareInterface} from '../Di/InjectionAwareInterface';
import {DiInterface} from '../Di/DiInterface';

export class View implements ViewInterface, InjectionAwareInterface {

    protected _engine: ViewEngineInterface = null;
    protected _template: string = '';
    protected _content: string = '';
    protected _parsedContent: any;
    protected _variables: {} = {};
    protected _partials: {};
    protected _rootElement: Element;
    protected _di = null;
    protected _name: string;

    constructor(element: Element = document.documentElement) {
        this.setRootElement(element);
        return this;
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
    setTemplate(template: string): void {
        this._template = template.replace(/&gt;/g, '>');
    }
    getTemplate(): string {
        return this._template;
    }
    setContent(content: string): void {
        this._rootElement.innerHTML = this._content = content;
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
        this.checkEngine();
        partials = partials ? partials : this.getPartials();
        //this.setTemplate(this._rootElement.innerHTML);
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