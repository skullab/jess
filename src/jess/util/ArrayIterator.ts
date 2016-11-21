import {Iterator} from './Iterator';
export abstract class ArrayIterator implements Iterator {
    protected _array: {}[] = [];
    protected _cursor: number = 0;

    forEach(callback: (index: any, value: any) => void): void {
        for (let i in this._array) {
            callback(i,this._array[i]);
        }
    }
    next(): void {
        ++this._cursor;
    }
    prev(): void {
        --this._cursor;
    }
    valid(): boolean {
        return this._array[this._cursor] !== undefined;
    }
    hasNext(): boolean {
        return this._array[this._cursor + 1] !== undefined;
    }
    key(): number {
        return this._cursor;
    }
    rewind(): void {
        this._cursor = 0;
    }
}