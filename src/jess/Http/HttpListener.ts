import {HttpResponse} from './HttpResponse' ;
export interface HttpListener {
    onTimeout(event:Event,response:HttpResponse):void;
    onAbort(event:Event,response:HttpResponse):void;
    onError(event:Event,response:HttpResponse):void;
    onLoad(event:Event,response:HttpResponse):void;
    onLoadEnd(event:Event,response:HttpResponse):void;
    onLoadStart(event:Event,response:HttpResponse):void;
    onProgress(event:Event,response:HttpResponse):void;
}