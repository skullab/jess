import {ViewInterface} from './View/ViewInterface';
import {ViewEngineInterface} from './View/Engine/ViewEngineInterface';
import {InjectionAwareInterface} from '../Di/InjectionAwareInterface';
import {DiInterface} from '../Di/DiInterface';

export class View implements ViewInterface, InjectionAwareInterface {

    protected _engine: ViewEngineInterface = null;
    protected _template: string = '';
    protected _content: string = '';
    protected _variables: {} = {};
    protected _partials: {} = {};
    protected _rootElement: HTMLElement;
    protected _di = null;
  
    constructor(di: DiInterface, element: HTMLElement = document.documentElement) {
        this.setDi(di);
        this._rootElement = element
        
        this.setTemplate(this._rootElement.innerHTML);
    }
    setTemplate(template: string): void {
        this._template = template;
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
    setPartials(partials: {}): void {
        this._partials = partials;
    }
    getPartials() {
        return this._partials;
    }
    parse(tags?: string[]): void {
        this._content = this._engine.parse(this.getTemplate(), tags);
    }
    render(partials?: {}): void {
        partials = partials ? partials : this.getPartials();
        this.setContent(this._engine.render(this.getTemplate(), this._variables, partials));
    }
    setViewEngine(engine: ViewEngineInterface): void {
        this._engine = engine;
    }
    getViewEngine(): ViewEngineInterface {
        return this._engine;
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