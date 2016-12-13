import {ModelInterface} from './Model/ModelInterface';
import {InjectionAwareInterface} from '../Di/InjectionAwareInterface';
import {DiInterface} from '../Di/DiInterface';
import {StringHelper} from '../util/StringHelper';
import {ConnectionInterface} from '../Connection/ConnectionInterface';
import {HttpResponse} from '../Http/HttpResponse';
import {Application} from './Application';

export abstract class Model implements ModelInterface, InjectionAwareInterface {
    protected __$$di: DiInterface;
    protected __$$source: string;
    protected __$$schema: string = '' ;
    protected __$$connection: ConnectionInterface;
    protected __$$columns: string[];
    protected __$$values: {};
    protected __$$primaryKeyName: string = 'id';

    constructor(values?: {}) {
        this.setDi(Application.DI);
        let _source = StringHelper.uncamelize(this.constructor['name']);
        this.setSource(_source);
        //this.setBaseUri(_source);
        this.__$$columns = [];
        if (values) this.setValues(values);
        this.onInitialize();
    }
    protected onInitialize() { }

    protected setPrimaryKeyName(name: string) {
        this.__$$primaryKeyName = name;
    }
    protected getPrimaryKeyName(): string {
        return this.__$$primaryKeyName;
    }
    protected setValues(values: {}) {
        this.__$$values = values;
    }
    setBaseUri(uri: string) {
        this.__$$connection.setBaseUri(uri);
    }
    getValues() {
        return this.__$$values;
    }
    setSource(source: string): void {
        this.__$$source = source;
    }
    getSource(): string {
        return this.__$$source;
    }
    setSchema(schema: string): void {
        this.__$$schema = schema;
    }
    getSchema(): string {
        return this.__$$schema;
    }
    setCreateMethod(method: string): void {
        this.__$$connection.setCreateMethod(method);
    }
    setReadMethod(method: string): void {
        this.__$$connection.setReadMethod(method);
    }
    setUpdateMethod(method: string): void {
        this.__$$connection.setUpdateMethod(method);
    }
    setDeleteMethod(method: string): void {
        this.__$$connection.setDeleteMethod(method);
    }
    setConnectionService(connection: ConnectionInterface): void {
        this.__$$connection = connection;
    }
    getConnectionService(): ConnectionInterface {
        return this.__$$connection;
    }
    protected setColumns(columns?: string[]): void {
        if (columns && columns.length > 0) {
            for (let n in columns) {
                if (this.hasOwnProperty(columns[n])) {
                    this.__$$columns.push(columns[n]);
                }
            }
        } else {
            let _this = this;
            Object.getOwnPropertyNames(_this).forEach(function(value, index, array) {
                if (value.indexOf('__$$') === -1) {
                    _this.__$$columns.push(value);
                }
            });
        }
    }
    getColumns(): {} {
        return this.__$$columns;
    }
    protected _beforeConnection(data?: any) {
        let columns = [];
        if (data) {
            Object.getOwnPropertyNames(data).forEach(function(value, index, array) {
                columns.push(value);
            });
        }
        this.setColumns(columns);
        let values = {};
        for (let n of this.__$$columns) {
            values[n] = this[n];
        }
        values['source'] = this.getSource();
        values['schema'] = this.getSchema();
        this.setValues(values);
    }
    create(data?: any) {
        this._beforeConnection(data);
        this.__$$connection.create(this.getValues());
    }
    update(data?: any) {
        this._beforeConnection(data);
        this.__$$connection.update(this.getValues());
    }
    delete(data?: any) {
        this.__$$connection.delete(this.getValues());
    }
    save(data?: any) {
        if (this.hasOwnProperty(this.getPrimaryKeyName())) {
            this.update(data);
        } else {
            this.create(data);
        }
    }
    count() { }
    static find(q?: any) {
        
    }
    static findFirst(q?: any) { }
    static query(q: any) {
        
    }


    protected setServices() {
        this.__$$connection = this.__$$di.get('connection');
        this.__$$connection.onResponse(this.onResponse.bind(this));
    }

    protected beforeConnect() { }
    protected onSuccess(response: HttpResponse) { }
    protected onError(response: HttpResponse) { }
    protected afterConnect() { }

    protected _onSuccess(response: HttpResponse) {
        try {
            let _o = response.toJSON();
            if (_o.hasOwnProperty(this.getPrimaryKeyName())) {
                this.__$$values[this.getPrimaryKeyName()] = _o[this.getPrimaryKeyName()];
                this[this.getPrimaryKeyName()] = _o[this.getPrimaryKeyName()];
            }
        } catch (e) {

        }
        this.onSuccess(response);
    }
    protected _onError(response: HttpResponse) {
        this.onError(response);
    }
    protected onResponse(state: string, response: HttpResponse, event: Event) {
        switch (state) {
            case 'loadstart':
                this.beforeConnect();
                break;
            case 'load':
                if (response.status == 200) {
                    this._onSuccess(response);
                } else {
                    this._onError(response);
                }
                break;
            case 'loadend':
                this.afterConnect();
                break;
            case 'abort':
            case 'timeout':
            case 'error':
                this._onError(response);
                break;
        }
    }
    setDi(di: DiInterface): void {
        this.__$$di = di;
        this.setServices();
    }
    getDi(): DiInterface {
        return this.__$$di;
    }
}