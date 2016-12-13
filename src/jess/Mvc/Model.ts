import {ModelInterface} from './Model/ModelInterface';
import {InjectionAwareInterface} from '../Di/InjectionAwareInterface';
import {DiInterface} from '../Di/DiInterface';
import {StringHelper} from '../util/StringHelper';
import {ConnectionInterface} from '../Connection/ConnectionInterface';
import {Application} from './Application';

export abstract class Model implements ModelInterface, InjectionAwareInterface {
    protected __$$di: DiInterface;
    protected __$$source: string;
    protected __$$schema: string;
    protected __$$connection: ConnectionInterface;
    protected __$$columns: string[];
    protected __$$values: {};

    constructor(values?: {}) {
        this.setDi(Application.DI);
        this.setSource(StringHelper.uncamelize(this.constructor['name']));
        this.__$$columns = [];
        if (values) this.setValues(values);
        this.onInitialize();
    }
    protected onInitialize() { }

    protected setValues(values: {}) {
        this.__$$values = values;
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
    
    create(data?: any) {
        this.__$$connection.create(data);
    }
    update(data?: any) {
        this.__$$connection.update(data);
    }
    delete(data?: any) {
        this.__$$connection.delete(data);
    }
    save(data?: any) {
        // create or update
        let columns = [];
        if (data) {
            Object.getOwnPropertyNames(data).forEach(function(value, index, array) {
                columns.push(value);
            });
        }
        this.setColumns(columns);
        let values = {} ;
        for (let n of this.__$$columns) {
            values[n] = this[n] ;
        }
        this.setValues(values);
        console.log(this.getColumns());
        console.log(this.getValues());
    }
    count() { }
    static find() { }
    static findFirst() { }


    protected setServices() {
        this.__$$connection = this.__$$di.get('connection');
    }
    setDi(di: DiInterface): void {
        this.__$$di = di;
        this.setServices();
    }
    getDi(): DiInterface {
        return this.__$$di;
    }
}