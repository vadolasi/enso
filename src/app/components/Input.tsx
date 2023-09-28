import React from "react"
import { FieldError } from "react-hook-form"
import { twMerge } from "tailwind-merge"
import clsx from "clsx"

type Props = React.HTMLProps<HTMLInputElement> & {
  label: string
  error?: FieldError
}

const Navbar = React.forwardRef<HTMLInputElement, Props>(({ label, className, error, ...props }, ref) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input className={twMerge(clsx("input input-bordered w-full", error && "input-error"), className)} {...props} ref={ref} />
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error.message}</span>
        </label>
      )}
    </div>
  )
})

Navbar.displayName = "Input"

export default Navbar
