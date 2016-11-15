import {ViewEngineInterface} from './ViewEngineInterface' ;
export interface ViewInterface {
    /**
     * Set the template view to render.
     * 
     * @param {string} template : The Template view to render.
     */
    setTemplate(template:string):void;
    /**
     * Returns the template view.
     * 
     * @return {string} : The template view.
     */
    getTemplate():string;
    /**
     * Set the Html content of the view
     * 
     * @param {string} content : The content of the view
     * 
     */
    setContent(content:string):void;
    /**
     * Returns the Html content of the View
     * 
     * @return {string} content : Html content
     * 
     */
    getContent():string;
    /**
     * Set a single view variable
     * 
     * @param {string} name : The name of the variable
     * @param {any} value : The value of the variable
     */
    setVar(name:string,value:any):void;
    /**
     * Set all the variables in the view
     * 
     * @param {object} variables : The object within the variables
     * @param {boolean} merge? : Optional merge boolean value. If set the passed object will be merged to the original stored 
     */
    setVars(variables:{},merge?:boolean):void;
    /**
     * Returns a variable previously set in the view
     * 
     * @param {string} name : The name of the variable
     * @return {any} value : The value of the variable
     */
    getVar(name:string):any;
    /**
     * Set the partial views object to render.
     * 
     * @param {object} partials : The partial views to render.
     */
    setPartials(partials:{}):void;
    /**
     * Returns the partial views object.
     * 
     * @return {object} : The partial views.
     */
    getPartials():{};
    /**
     * Parse the current template view.
     * 
     */
    parse(tags?:string[]):void;
    /**
     * Render the template view.
     * 
     * @param {object} partials? : Optional partial views to render inside the current view.
     */
    render(partials?:{}):void;
    
    /**
     * Set the template engine.
     * 
     * @param {object} engine : The template engine.
     */
    setViewEngine(engine:ViewEngineInterface):void;
    /**
     * Returns the template engine.
     * 
     * @return {object} : The template engine.
     */
    getViewEngine():ViewEngineInterface;
}