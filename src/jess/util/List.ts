import {Iterator} from './Iterator' ;
export interface List {
    add(element:any,index?:number):void;
    clear():void
    contains(element:any):boolean;
    get(index:number):any;
    indexOf(element:any):number;
    isEmpty():boolean;
    getIterator():Iterator
    remove(element:any):void;
    remove(index:number):void;
    size():number;
    toArray():{}[];
    subList(start:number,end:number):{}[];
}