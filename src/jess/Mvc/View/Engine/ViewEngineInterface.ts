export interface ViewEngineInterface {
    /**
     * Parse the template view.
     * 
     * @param {string} template : The template to parse.
     * @param {string[]} tags? : Optional Tags used to parse variables.
     * 
     * @return {string} : The parsed template.
     */
    parse(template:string,tags?:string[]):string ;
    
    /**
     * Render the template view.
     * 
     * @param {string} template : The template to render.
     * @param {object} variables : The variables in the view.
     * @param {object} partials? : Optional partial views to render inside the current view.
     * 
     * @return {string} : The rendered template.
     */
    render(template:string,variables:{},partials?:{}):string;
}