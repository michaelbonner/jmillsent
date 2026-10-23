import { clsx } from 'clsx'
import { Eyebrow, H2 } from './headings'

const SectionIntro = ({ eyebrow, title, children, className = '' }) => {
  return (
    <div
      className={clsx(
        'mb-10 grid gap-8 lg:mb-14 lg:grid-cols-12 lg:gap-10',
        className
      )}
    >
      <div className="lg:col-span-5">
        {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
        {title && <H2 className="max-w-[24ch]">{title}</H2>}
      </div>
      {children && (
        <div className="prose prose-lg prose-invert max-w-[65ch] text-pretty text-neutral-300 lg:col-span-7 lg:pt-6">
          {children}
        </div>
      )}
    </div>
  )
}

export default SectionIntro
