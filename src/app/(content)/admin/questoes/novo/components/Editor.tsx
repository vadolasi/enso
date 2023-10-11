"use client"

import { Control, Controller } from "react-hook-form"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

type Props = React.ComponentProps<typeof ReactQuill> & {
  label?: string
  control: Control<any>
  name: string
}

const Editor: React.FC<Props> = ({ label, control, ...props }) => {
  return (
    <Controller
      render={({ field }) => (
        <div>
          {label && <label className="block mb-2">{label}</label>}
          <ReactQuill
            {...props}
            {...field}
            onChange={(value, ...args) => {
              field.onChange(value)
              props.onChange?.(value, ...args)
            }}
          />
          
        </div>
      )}
      name={props.name}
      control={control}
    />
  )
}

export default Editor
