import {View} from '../View';
import {Iterator} from '.../../util/Iterator';
import {ArrayList} from '../../util/ArrayList';

export class ListView extends View {
    public static UNORDERED: string = 'ul';
    public static ORDERED: string = 'ol';
    public static LIST_NAME = 'list_value';
    private _modeTag: string
    private _arrayList: ArrayList;

    constructor(modeTag: string, data?: {}[]) {
        /*if (modeTag != ListView.UNORDERED || modeTag != ListView.ORDERED) {
            throw new Error("The ListView can only create <ul> or <ol> Element object");
        }*/
        let element = document.createElement(modeTag);
        let text = document.createTextNode('{{> list_array }}');
        element.appendChild(text);
        super(element);
        this._arrayList = new ArrayList(data);
    }
    
    render(partials?: {}): void {
        this.checkEngine();
        partials = partials ? partials : this.getPartials();
        console.log(partials);
        this.setVar('list_value',this.toArray());
        this.setContent(this._engine.render(this.getTemplate(),this._variables, { list_array : '<li>{{ list_value }}</li>' }));
        console.log(this.getTemplate());
    }

    add(value: any, index?: number): void {
        this._arrayList.add({ 'list_value': value }, index);
    }
    clear(): void {
        this._arrayList.clear();
    }

    contains(value: any): boolean {
        return this._arrayList.contains({ 'list_value': value });
    }
    get(index: number): any {
        return this._arrayList.get(index);
    }
    indexOf(value: any): number {
        return this._arrayList.indexOf({ 'list_value': value });
    }
    isEmpty(): boolean {
        return this._arrayList.isEmpty();
    }
    getIterator(): Iterator {
        return this._arrayList.getIterator();
    }
    remove(value: any): void;
    remove(index: number): void {
        let element = typeof index !== 'number' ? { 'list_value': index } : index;
        this._arrayList.remove(element);
    }
    size(): number {
        return this._arrayList.size();
    }
    toArray(): {}[] {
        return this._arrayList.toArray();
    }
    subList(start: number, end: number): {}[] {
        return this._arrayList.subList(start, end);
    }
}