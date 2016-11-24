import {InjectionAwareInterface} from '../../Di/InjectionAwareInterface';
import {DiInterface} from '../../Di/DiInterface';
import {View} from '../View';
import {ViewInterface} from '../View/ViewInterface';
import {ArrayList} from '../../util/ArrayList';
import {StringHelper} from '../../util/StringHelper';

export class ViewManager implements InjectionAwareInterface {

    protected _di: DiInterface;
    protected _views: ArrayList;

    constructor(di: DiInterface, views?: {}[]) {
        this.setDi(di);
        this._views = new ArrayList(views);
    }

    viewExists(index: any): boolean {
        if (typeof index === 'number') {
            return this.getView(index) !== undefined;
        }
        if (typeof index === 'string') {
            return this.getViewByName(index) !== null;
        }
        if (typeof index === 'object' && index instanceof View) {
            let check = false;
            for (let v of this.toArray()) {
                if (v === index) {
                    check = true;
                    break;
                }
            }
            return check;
        }
        return false;
    }

    getViewByName(name: string): View {
        for (let v of this.toArray()) {
            if (v.getName() == name) {
                return v;
            }
        }
        return null;
    }
    getView(index: any): View {
        if (typeof index === 'number') {
            return this._views.get(index);
        } else if (typeof index === 'string') {
            return this.getViewByName(index);
        }
    }
    addView(view: View): void {
        if (this._di.has('viewEngine')) {
            view.setViewEngine(this._di.get('viewEngine'));
        }
        this._views.add(view);
    }

    removeView(view: View): void {
        this._views.remove(view);
    }
    renderView(index: any) {
        this.getView(index).render();
    }
    renderAll() {
        for (let v of this.toArray()) {
            v.render();
        }
    }
    parseView(index: any) {
        this.getView(index).parse();
    }
    parseAll() {
         for (let v of this.toArray()) {
            v.parse();
        }
    }
    toArray(): View[] {
        return <View[]>this._views.toArray();
    }
    /**
     * Set the dependency injection container.
     * @param {object} di : The dependency injection container.
     */
    setDi(di: DiInterface): void {
        this._di = di;
    }
    /**
     * Returns the dependecy injection container.
     * @return {object} : The dependency injection container.
     */
    getDi(): DiInterface {
        return this._di;
    }
}