import { forwardRef } from 'react'
import { clsx } from 'clsx'

const variants = {
  primary:   'bg-[#14B88A] text-white hover:bg-[#0D8F6A] active:scale-[0.98] shadow-sm hover:shadow-md',
  secondary: 'bg-white text-[#0F172A] border border-[#DCEFE8] hover:bg-[#E6F7F2] hover:border-[#14B88A] hover:text-[#14B88A] active:scale-[0.98]',
  ghost:     'text-[#64748B] hover:text-[#0F172A] hover:bg-[#E6F7F2] active:scale-[0.98]',
  danger:    'bg-[#EF4444] text-white hover:opacity-90 active:scale-[0.98]',
  ai:        'bg-[#7C3AED] text-white hover:bg-[#5B21B6] active:scale-[0.98] shadow-sm',
  outline:   'border border-[#14B88A] text-[#14B88A] hover:bg-[#E6F7F2] active:scale-[0.98]',
}

const sizes = {
  xs: 'h-7  px-3   text-caption  gap-1.5 rounded-sm',
  sm: 'h-8  px-3.5 text-label    gap-1.5 rounded',
  md: 'h-10 px-4   text-body-sm  gap-2   rounded-md',
  lg: 'h-11 px-5   text-body     gap-2   rounded-lg',
  xl: 'h-13 px-6   text-body-lg  gap-2.5 rounded-lg',
}

const Button = forwardRef(({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  children,
  ...props
}, ref) => {
  const isDisabled = disabled || loading

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={clsx(
        // base
        'inline-flex items-center justify-center font-semibold',
        'transition-all duration-150 ease-smooth',
        'focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
        'select-none whitespace-nowrap',
        // variant + size
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size={size} />
          {children && <span>{children}</span>}
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children && <span>{children}</span>}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  )
})

Button.displayName = 'Button'

function Spinner({ size }) {
  const s = { xs: 'w-3 h-3', sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-4 h-4', xl: 'w-5 h-5' }
  return (
    <svg
      className={clsx('animate-spin flex-shrink-0', s[size])}
      viewBox="0 0 24 24" fill="none"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

export { Button }
export default Button