import { clsx } from 'clsx'

const variants = {
  default:  'bg-surface-card border border-surface-border shadow-sm',
  elevated: 'bg-surface-card shadow-md',
  ghost:    'bg-primary-light/40 border border-primary/20',
  ai:       'bg-ai-light/40 border border-ai/20',
  flat:     'bg-surface-card border border-surface-border',
}

function Card({
  variant = 'default',
  padding = 'md',
  hover = false,
  className,
  children,
  ...props
}) {
  const paddings = {
    none: '',
    sm:   'p-4',
    md:   'p-6',
    lg:   'p-8',
    xl:   'p-10',
  }

  return (
    <div
      className={clsx(
        'rounded-xl',
        variants[variant],
        paddings[padding],
        hover && 'transition-all duration-200 ease-smooth cursor-pointer hover:shadow-md hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ className, children, ...props }) {
  return (
    <div className={clsx('mb-4', className)} {...props}>
      {children}
    </div>
  )
}

function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={clsx('text-heading-sm text-ink font-semibold', className)} {...props}>
      {children}
    </h3>
  )
}

function CardDescription({ className, children, ...props }) {
  return (
    <p className={clsx('text-body-sm text-ink-secondary mt-1', className)} {...props}>
      {children}
    </p>
  )
}

function CardContent({ className, children, ...props }) {
  return (
    <div className={clsx(className)} {...props}>
      {children}
    </div>
  )
}

function CardFooter({ className, children, ...props }) {
  return (
    <div className={clsx('mt-4 pt-4 border-t border-surface-border flex items-center', className)} {...props}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
export default Card