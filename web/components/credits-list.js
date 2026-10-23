import { Eyebrow } from './headings'

const CreditsList = ({ credits = [] }) => {
  if (!credits.length) return null

  const column1Credits = credits.slice(0, Math.ceil(credits.length / 2))
  const column2Credits = credits.slice(column1Credits.length)

  return (
    <section className="mt-16 lg:mt-24">
      <div className="border-t border-white/30 pt-5">
        <Eyebrow className="mb-5">Credits</Eyebrow>
      </div>
      <dl className="grid gap-x-10 md:grid-cols-2">
        {[column1Credits, column2Credits].map((columnCredits, columnIndex) => (
          <div key={columnIndex}>
            {columnCredits.map((credit, index) => (
              <div
                className="grid grid-cols-5 gap-4 border-b border-white/15 py-3 text-sm uppercase"
                key={index}
              >
                <dt className="col-span-2 font-medium tracking-[0.08em] text-neutral-400">
                  {credit.role}
                </dt>
                <dd className="col-span-3">{credit.value}</dd>
              </div>
            ))}
          </div>
        ))}
      </dl>
    </section>
  )
}

export default CreditsList
