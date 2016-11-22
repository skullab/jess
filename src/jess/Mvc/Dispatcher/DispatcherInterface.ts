export interface DispatcherInterface {
    setModule(m:{}):void;
    getModule():any;
    setControllerSuffix(suffix:string):void;
    getControllerSuffix():string;
    setControllerName(name:string):void;
    getControllerName():string;
    setActionSuffix(suffix:string):void;
    getActionSuffix():string
    setActionName(name:string):void;
    getActionName():string
    setParams(params:{}[]):void;
    getParams():{}[];
    dispatch():void;
    forward(controller:string,action:string,params?:{}[]);
}