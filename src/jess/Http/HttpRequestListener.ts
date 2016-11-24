import {HttpRequest} from './HttpRequest' ;
export interface HttpRequestListener {
    onTimeout(event:Event,request:HttpRequest);void;
    onAbort(event:Event,request:HttpRequest):void;
    onError(event:Event,request:HttpRequest):void;
    onLoad(event:Event,request:HttpRequest):void;
    onLoadEnd(evemt:Event,request:HttpRequest):void;
    onLoadStart(event:Event,request:HttpRequest):void;
    onProgress(event:Event,request:HttpRequest):void;
}