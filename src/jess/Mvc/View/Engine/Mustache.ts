/// <reference path="./Mustache/mustache.d.ts" />
import {ViewEngineInterface} from './ViewEngineInterface';
import * as _mustache from 'mustache';

//declare let mustache: Mustache; // be sure that mustache.min.js is loaded !!

export class Mustache implements ViewEngineInterface {

    public name: string = _mustache.name;
    public version: string = _mustache.version;
    public tags: string[] = _mustache.tags;

    public Scanner: MustacheScanner = _mustache.Scanner;
    public Context: MustacheContext = _mustache.Context;
    public Writer: MustacheWriter = _mustache.Writer;

    /**
     * Export the escaping function so that the user may override it.
     * See https://github.com/janl/mustache.js/issues/244
     */
    escape(s: string): any {
        return _mustache.escape(s);
    }

    /**
    * Clears all cached templates in the default writer.
    */
    clearCache(): MustacheWriter {
        return _mustache.clearCache();
    }
    /**
     * This is here for backwards compatibility with 0.4.x.,
     */
    to_html(template: string, view: any, partials?: any, send?: any): any {
        return _mustache.to_html(template, view, partials, send);
    }
    /**
    * Parse the template view.
    * 
    * @param {string} template : The template to parse.
    * @param {string[]} tags? : Optional Tags used to parse variables.
    * 
    * @return {string} : The parsed template.
    */
    parse(template: string, tags?: string[]): string {
        return _mustache.parse(template, tags);
            //.filter(function(v) { return v[0] === 'name' })
            //.map(function(v) { return v[1]; });
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
    render(template: string, variables: {}, partials?: {}): string {
        return _mustache.render(template, variables, partials);
    }
}