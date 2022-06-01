import { format, parseISO } from 'date-fns'

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return (
    <time className="font-outline sm:tracking-wide" dateTime={dateString}>
      {format(date, 'MM.dd.yyyy')}
    </time>
  )
}
