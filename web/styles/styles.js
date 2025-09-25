import { clsx } from 'clsx'

const baseButtonStyles = clsx(
  'group inline-flex items-center justify-center gap-4 rounded-xl border-2 px-5 py-1 uppercase transition-colors cursor-pointer',
  'hover:bg-gold'
)

export const styles = {
  buttonLink: {
    default: clsx(baseButtonStyles, 'border-white'),
    blackBorder: clsx(baseButtonStyles, 'border-black'),
  },
}
