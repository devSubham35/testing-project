import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errorText?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, errorText, ...props }, ref) => {
    return (
      <div>
        <input
          type={type}
          className={cn(
            "flex min-h-12 items-center w-full focus-visible:border-rose-600 rounded-md border border-neutral-200 bg-transparent px-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-0",
            className
          )}
          ref={ref}
          {...props}
        />
        {errorText && <div className="text-red-500 text-sm">{errorText}</div>}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
