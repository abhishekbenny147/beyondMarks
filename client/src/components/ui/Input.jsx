import { forwardRef } from 'react'
import { clsx } from 'clsx'

const Input = forwardRef(({
  label,
  hint,
  error,
  leftIcon,
  rightIcon,
  size = 'md',
  fullWidth = true,
  className,
  containerClassName,
  ...props
}, ref) => {
  const sizes = {
    sm: 'h-8  text-body-sm px-3   rounded',
    md: 'h-10 text-body-sm px-3.5 rounded-md',
    lg: 'h-12 text-body    px-4   rounded-lg',
  }

  const iconPad = {
    sm: { left: 'pl-8',  right: 'pr-8'  },
    md: { left: 'pl-10', right: 'pr-10' },
    lg: { left: 'pl-11', right: 'pr-11' },
  }

  const iconSize = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' }
  const iconPos  = { sm: 'left-2.5', md: 'left-3', lg: 'left-3.5' }
  const iconPosR = { sm: 'right-2.5', md: 'right-3', lg: 'right-3.5' }

  return (
    <div className={clsx(fullWidth && 'w-full', containerClassName)}>
      {label && (
        <label className="block text-label text-ink font-medium mb-1.5">
          {label}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <span className={clsx(
            'absolute top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none',
            iconPos[size], iconSize[size]
          )}>
            {leftIcon}
          </span>
        )}

        <input
          ref={ref}
          className={clsx(
            'w-full bg-surface-card text-ink font-[450]',
            'border transition-all duration-150 ease-smooth',
            'placeholder:text-ink-muted',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-status-danger focus:border-status-danger focus:ring-status-danger/20'
              : 'border-surface-border focus:border-primary focus:ring-primary/20',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-bg',
            sizes[size],
            leftIcon  && iconPad[size].left,
            rightIcon && iconPad[size].right,
            className
          )}
          {...props}
        />

        {rightIcon && (
          <span className={clsx(
            'absolute top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none',
            iconPosR[size], iconSize[size]
          )}>
            {rightIcon}
          </span>
        )}
      </div>

      {(hint || error) && (
        <p className={clsx(
          'mt-1.5 text-caption',
          error ? 'text-status-danger' : 'text-ink-secondary'
        )}>
          {error || hint}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export { Input }
export default Input