import React, { useEffect, useMemo, useRef, useState } from "react";
import { FormItemProps, Meta } from "./dsl.types";
import { Form, FormItem } from "./Form";

function useForm(meta : Meta) {
  const form = useMemo(() => new Form(meta) , [])
  return form
}
export default ({meta} : {meta : Meta}) => {
  const form = useForm(meta)
  return <FormComponent item={form.getRoot()} />
}

const FormComponent = (props : FormItemProps) => {

  const item = props.item
  return <div>
    {item.getChildren().map(child => {
      return render(child)
    })}
  </div>
}


const Condition = (props : FormItemProps) => {
  const cond = props.item.getCond() 
  const index = cond()
  return render(props.item.getChildren()[index])

}

const Input = (props : FormItemProps) => {
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    ref.current!.value = props.defaultValue 
  }, [])

  return (
    <input
      ref={ref}
      onChange={(e) => {
        props.onChange && props.onChange(e.target.value)
      }}
    />
  )
}
function render(formItem : FormItem) {

  const passProps = {
    onChange:(value : any) => {
      formItem.setValue(value)
    },
    defaultValue: formItem.getValue(),
    item : formItem
  }
  switch(formItem.getType()) {
    case "form":
      return <FormComponent {...passProps} />
    case "input":
      return (
        <Input
          {...passProps}
        />
      )
    case 'condition':
      return <Condition {...passProps} />
    default:
      throw new Error(`component ${formItem.getType()} not found`)
  }
}