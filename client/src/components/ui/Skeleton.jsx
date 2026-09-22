import { clsx } from 'clsx'

function Skeleton({ className, ...props }) {
  return (
    <div
      className={clsx('shimmer rounded-lg', className)}
      {...props}
    />
  )
}

function SkeletonCard({ lines = 3 }) {
  return (
    <div className="bg-surface-card border border-surface-border rounded-xl p-6 space-y-3">
      <Skeleton className="h-5 w-2/3" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={clsx('h-4', i === lines - 1 ? 'w-1/2' : 'w-full')}
        />
      ))}
    </div>
  )
}

function SkeletonText({ lines = 1, className }) {
  return (
    <div className={clsx('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={clsx('h-4', i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  )
}

function SkeletonAvatar({ size = 'md' }) {
  const sizes = { sm: 'w-8 h-8', md: 'w-10 h-10', lg: 'w-12 h-12', xl: 'w-16 h-16' }
  return <Skeleton className={clsx('rounded-full flex-shrink-0', sizes[size])} />
}

export { Skeleton, SkeletonCard, SkeletonText, SkeletonAvatar }
export default Skeleton