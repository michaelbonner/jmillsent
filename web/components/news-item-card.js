import BackgroundText from './background-text-section'

const NewsItemCard = ({ newsItem }) => {
  const leftOrRight = newsItem.rightAlign ? 'right' : 'left'
  return (
    <div className="z-10 grid w-full gap-y-4 px-8 lg:max-w-5xl xl:max-w-7xl">
      <BackgroundText
        leftOrRight={leftOrRight}
        image={newsItem?.poster || newsItem?.heroImage}
        imageAlt={newsItem?.seoTitle}
        title={newsItem?.title}
        description={newsItem?.description}
        date={newsItem?.date}
        customButtonText1={newsItem?.customButtonTextSection1 || `Read`}
        customButtonText2={newsItem?.customButtonTextSection2 || `Full`}
        customButtonText3={newsItem?.customButtonTextSection3 || `Story`}
        slug={`/news/${newsItem?.slug?.current}`}
        isLink
      />
    </div>
  )
}

export default NewsItemCard
