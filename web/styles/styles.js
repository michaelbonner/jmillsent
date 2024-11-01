import classNames from 'classnames'

const baseButtonStyles = classNames(
  'group inline-flex items-center justify-center gap-4 rounded-xl border-2 px-5 py-1 uppercase transition-colors',
  'hover:bg-gold'
)

export const styles = {
  buttonLink: {
    default: classNames(baseButtonStyles, 'border-white'),
    blackBorder: classNames(baseButtonStyles, 'border-black'),
  },
}
