"use client"

import React, { useState } from "react"
import { Control, Controller } from "react-hook-form"
import { createEditor } from "slate"
import { Editable, Slate, withReact } from "slate-react"
import { twMerge } from "tailwind-merge"

type Props = React.ComponentProps<typeof Editable> & {
  label?: string
  control: Control<any>
  name: string
}

const Editor: React.FC<Props> = ({ label, control, ...props }) => {
  const [editor] = useState(() => withReact(createEditor()))

  return (
    <Controller
      render={({ field: { name, onBlur, onChange, value, disabled } }) => (
        <Slate editor={editor} initialValue={[{ type: "paragraph", children: [{ text: "" }] }]}>
          <div className="form-control">
            {label && (
              <label className="label" htmlFor={props.name}>
                <span className="label-text">{label}</span>
              </label>
            )}
            <Editable as="textarea" className={twMerge("textarea textarea-bordered", props.className)} {...props} name={name} onBlur={onBlur} onChange={onChange} value={value} disabled={disabled} />
          </div>
        </Slate>
      )}
      name={props.name}
      control={control}
      defaultValue=""
    />
  )
}

export default Editor
