import {ArrayIterator} from './ArrayIterator';
import {Iterator} from './Iterator';
import {List} from './List';

export class ArrayList extends ArrayIterator implements List {

    private _iterator: Iterator;
    constructor(list?: {}[]) {
        super();
        if (Array.isArray(list)) {
            this._array = list;

        }
        let _this = this;
        this._iterator = {
            next(): void {
                return _this.next();
            },
            prev(): void { return _this.prev(); },
            valid(): boolean { return _this.valid() },
            hasNext(): boolean { return _this.hasNext(); },
            key(): number {
                return _this.key();
            },
            rewind(): void {
                return _this.rewind();
            }

        };
    }
    add(element: {}, index?: number): void {
        if (index && typeof index === 'number') {
            this._array[index] = element;
        } else {
            this._array.push(element);
        }
        this.next();
    }
    clear(): void {
        this._array = [];
        this.rewind();
    }
    contains(element: any): boolean {
        return this.indexOf(element) !== -1;
    }
    get(index: number): any {
        return this._array[index];
    }
    indexOf(element: any): number {
        return this._array.indexOf(element);
    }
    isEmpty(): boolean {
        return this.size() == 0;
    }
    getIterator(): Iterator {
        return this._iterator;
    }
    remove(element: any): void;
    remove(index: number): void {
        if (typeof index !== 'number') {
            index = this.indexOf(index);
        }
        if (index !== -1) {
            this._array.splice(index, 1);
            this.prev();
        }
    }
    size(): number {
        return this._array.length;
    }
    toArray(): {}[] {
        return this._array.slice();
    }
    subList(start: number, end: number): {}[] {
        return this._array.slice(start, end);
    }
}