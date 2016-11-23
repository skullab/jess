/// <reference path="./Handlebars/handlebars.d.ts" />
import {ViewEngineInterface} from './ViewEngineInterface';
import * as _handlebars from 'handlebars';
export class Handlebars implements ViewEngineInterface {
    protected _templateSpec:any;
    /**
    * Parse the template view.
    * 
    * @param {string} template : The template to parse.
    * @param {string[]} tags? : Optional Tags used to parse variables.
    * 
    * @return {string} : The parsed template.
    */
    parse(template: string, tags?: string[]): string {
        this._templateSpec = _handlebars.precompile(template);
        return this._templateSpec;
    }

    /**
     * Render the template view.
     * 
     * @param {string} template : The template to render.
     * @param {object} variables : The variables in the view.
     * @param {object} partials? : Optional partial views to render inside the current view.
     * 
     * @return {string} : The rendered template.
     */
    render(template: string, variables: {}, partials: {} = {}): string {
        _handlebars.registerPartial(partials);
        //let compiled = this._templateSpec ? _handlebars.template(this._templateSpec) : _handlebars.compile(template);
        let compiled = _handlebars.compile(template);
        return compiled(variables);
    }
}