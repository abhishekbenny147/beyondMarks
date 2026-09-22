import { clsx } from 'clsx'

const variants = {
  primary:  'bg-primary-light  text-primary-dark  border border-primary/20',
  ai:       'bg-ai-light       text-ai-dark       border border-ai/20',
  success:  'bg-green-50       text-status-success border border-green-200',
  warning:  'bg-amber-50       text-status-warning border border-amber-200',
  danger:   'bg-red-50         text-status-danger  border border-red-200',
  neutral:  'bg-slate-100      text-ink-secondary  border border-slate-200',
  outline:  'bg-transparent    text-ink-secondary  border border-surface-border',
}

const sizes = {
  sm: 'text-[11px] px-2    py-0.5 rounded-sm gap-1',
  md: 'text-caption px-2.5 py-0.5 rounded    gap-1.5',
  lg: 'text-label   px-3   py-1   rounded-md  gap-1.5',
}

function Badge({
  variant = 'primary',
  size = 'md',
  dot = false,
  icon,
  className,
  children,
  ...props
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={clsx(
          'w-1.5 h-1.5 rounded-full flex-shrink-0',
          variant === 'primary' ? 'bg-primary' :
          variant === 'ai'      ? 'bg-ai'      :
          variant === 'success' ? 'bg-status-success' :
          variant === 'warning' ? 'bg-status-warning' :
          variant === 'danger'  ? 'bg-status-danger'  :
          'bg-ink-muted'
        )} />
      )}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  )
}

export { Badge }
export default Badge