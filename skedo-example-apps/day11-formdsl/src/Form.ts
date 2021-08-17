import {fromJS, Map as ImmutableMap} from 'immutable'
import { FormItemMeta, Meta, Store } from './dsl.types'


export class FormItem {

  private meta : FormItemMeta 
  private children : FormItem[]
  private form : Form 
  constructor(meta : FormItemMeta, form : Form){
    this.form = form 
    this.meta = meta
    this.children = []

    this.meta.items?.forEach(subItem => {
      this.children.push(new FormItem(subItem, form))
    })
  }

  public getValue(){
    const val = this.form.getValue(this.meta.path!) 
    if(typeof val === 'undefined') {
      return this.meta.default
    }
    return val
  }

  public getChildren(){
    return this.children
  }

  public setValue(value : any){
    this.form.setValue(this.meta.path!, value)
  }

  public getType(){
    return this.meta.type
  }

  public updateStoreByDefault(){
    if(typeof this.meta.default !== 'undefined') {
      this.setValue(this.meta.default)
    }

    for(let child of this.getChildren()) {
      child.updateStoreByDefault()
    }

  }

  public getCond(){
    return () => {
      return this.meta.cond!(this.form.getContext())
    }
  }


}

export class Form {

  private meta : Meta 
  private form : FormItem
  private store : Store
  private context ? : any
  constructor(meta : Meta, context ? : any){
    this.meta = meta
    this.store = this.initStore()
    this.form = new FormItem(this.meta.form, this)
    this.context = context
    this.updateDefaultValues()

    // @ts-ignore
    window.frm = this
  }

  public getContext(){
    return this.context
  }

  public getRoot(){
    return this.form
  }

 
  public getValue(path : Array<string | number>) {
    return this.store.getIn(path)
  }

  public setValue(path : Array<string | number>, value : any) {
    this.store = this.store.setIn(path, value)
  }

  public getData(){
    return this.store.toJS()
  }

  private initStore(){
    const store = ImmutableMap<string, Store>()
    return store
  }

  public setData(data : any){
    this.store = fromJS(data) as ImmutableMap<string, Store>
  }

  private updateDefaultValues(){
    this.form.updateStoreByDefault()
  }
}

