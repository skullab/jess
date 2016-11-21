import {InjectionAwareInterface} from '../../Di/InjectionAwareInterface';
import {DiInterface} from '../../Di/DiInterface';
import {View} from '../View';
import {ViewInterface} from '../View/ViewInterface';
import {ArrayList} from '../../util/ArrayList';

export class ViewManager implements InjectionAwareInterface {

    protected _di: DiInterface;
    protected _views: ArrayList;
    protected _dataViewPrefix: string = '';

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
    getView(index: number): View {
        return this._views.get(index);
    }
    addView(view: View): void {
        this._views.add(view);
    }
    addAllDataView(query: string = '') {
        let n = this.getAllDataView();
        for (let i = 0; i < n.length; i++) {
            let e = <HTMLElement>n[i];
            let v = new View(e);
            v.setName(e.dataset[this._dataViewPrefix + 'View']);
            let viewEngine = this.getDi().get('viewEngine');
            if (viewEngine) v.setViewEngine(viewEngine);
            this.addView(v);
        }
    }
    removeView(view: View): void {
        this._views.remove(view);
    }
    renderView(index: number) {
        let v = this._views.get(index);
        if (v && v instanceof View) {
            v.render();
        }
    }
    renderAll() {
        for (let v of this.toArray()) {
            v.render();
        }
    }
    setDataViewPrefix(prefix: string) {
        this._dataViewPrefix = prefix;
    }
    getDataViewPrefix(): string {
        return this._dataViewPrefix;
    }
    getDataView(name: string) {
        let prefix = this._dataViewPrefix !== '' ? this._dataViewPrefix + '-' : '';
        return <Element>document.querySelector('[data-' + prefix + 'view="' + name + '"]');
    }
    getAllDataView(query: string = '') {
        let prefix = this._dataViewPrefix !== '' ? this._dataViewPrefix + '-' : '';
        query += '[data-' + prefix + 'view]';
        return <NodeList>document.querySelectorAll(query);
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