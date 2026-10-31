import { clsx } from 'clsx'
import Link from 'next/link'

const ArrowLink = ({ children, className = '', href, ...props }) => {
  return (
    <Link
      href={href}
      className={clsx(
        'inline-flex min-h-12 items-center gap-3 border-b border-white py-2 text-base font-medium transition-colors hover:border-white/50 hover:text-white/75',
        className
      )}
      {...props}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  )
}

export default ArrowLink
