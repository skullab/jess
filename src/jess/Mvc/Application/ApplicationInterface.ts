export interface ApplicationInterface {
    registerModules(modules:{[name:string]:{}},merge?:boolean):void;
    getModules():{};
    setDefaultModule(mix:any):void;
    getDefaultModule():{};
    handle():void;
}