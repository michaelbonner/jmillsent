import groq from 'groq'
import BlockContent from '@sanity/block-content-to-react'
import Image from 'next/image'
import Link from 'next/link'
import { H1, H2, H3 } from '../components/headings'
import Layout from '../components/layout'
import { getClient } from '../lib/sanity'
import VideoPlayer from '../components/video-player'
import MediumWhiteBar from '../components/medium-white-bar'
import urlForSanitySource from '../lib/urlForSanitySource'
import LittleWhiteBar from '../components/little-white-bar'

function About({ aboutPage }) {
    const heroContent = (
        <div className="h-full w-full flex flex-col items-center justify-center text-white">
            <H1>{aboutPage.mainTitle}</H1>
            <h2 className="uppercase font-outline text-2xl lg:text-5xl">
                {aboutPage.subtitle}
            </h2>
        </div>
    )

    return (
        <Layout
            title={aboutPage.seoTitle}
            description={aboutPage.seoDescription}
            heroImageUrl={aboutPage.poster || null}
            heroVideoId={aboutPage.videoId}
            heroContent={heroContent}
        >
            <div className="container mx-4 lg:mx-auto text-white text-center my-12 lg:my-36">
                <H2>{aboutPage.section1Title}</H2>
                <div className="mt-16 mb-8 prose-lg max-w-3xl text-center mx-auto">
                    <BlockContent blocks={aboutPage.section1Body} />
                </div>
                <Image
                    src={`/images/jmills-raven-white.svg`}
                    alt="Jmills"
                    width="130"
                    height="130"
                />
                <MediumWhiteBar />
                <div className="pt-24 px-8 container mx-4 lg:mx-auto text-center">
                    <p className="text-4xl font-extrabold tracking-widest">
                        {aboutPage.section2Title}
                    </p>
                    <p className="mt-2 text-3xl font-outline">
                        {aboutPage.section2Subtitle}
                    </p>
                </div>

                {/* services */}
                <section>
                    {aboutPage.services.length > 0 && (
                        <div className="grid grid-cols-1 gap-y-8 mt-12 max-w-7xl mx-auto">
                            {aboutPage.services.map((service) => {
                                return (
                                    <div
                                        className="border p-4 lg:px-8 border-white"
                                        key={service._id}
                                    >
                                        <div className="w-full">
                                            <Image
                                                src={urlForSanitySource(
                                                    service.image
                                                )
                                                    .width(1800)
                                                    .height(800)
                                                    .url()}
                                                width="1800"
                                                height="800"
                                                alt={service.title}
                                            />
                                        </div>
                                        <h3 className="text-center font-outline text-3xl mt-8">
                                            {service.name}
                                        </h3>
                                        <LittleWhiteBar />
                                        <div className="prose-lg text-center mx-auto text-white font-light">
                                            <BlockContent
                                                blocks={service.description}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </section>
                {/* end: services */}

                {/* company 3 */}
                <section>
                    <div className="mt-12 lg:mt-24 border border-white py-8 px-8 container mx-4 lg:mx-auto max-w-7xl">
                        <VideoPlayer
                            poster={aboutPage.company3VideoPoster}
                            title={aboutPage.company3VideoTitle}
                            videoId={aboutPage.company3VideoId}
                            clientName={aboutPage.company3VideoClient}
                            videoHeightAspectRatio={
                                aboutPage.company3VideoHeightAspectRatio
                            }
                            videoWidthAspectRatio={
                                aboutPage.company3VideoWidthAspectRatio
                            }
                        />
                        <p className="text-4xl mt-8 flex items-center justify-center space-x-6">
                            <span className="uppercase font-extrabold text-2xl lg:text-5xl">
                                {aboutPage.company3VideoClient}
                            </span>
                            <span className="uppercase font-outline text-2xl lg:text-5xl">
                                {aboutPage.company3VideoTitle}
                            </span>
                        </p>
                    </div>
                    <div className="mt-12 lg:mt-24">
                        <H3>{aboutPage.company3Title}</H3>
                        <div className="mt-4 mb-8 prose-lg max-w-3xl text-center mx-auto text-white">
                            <BlockContent blocks={aboutPage.company3Body} />
                        </div>
                    </div>
                    <Link
                        href={
                            aboutPage.company3Link ||
                            'https://www.company3.com/'
                        }
                    >
                        <a
                            className="mt-12 flex items-center justify-center text-4xl font-outline uppercase space-x-6 max-w-3xl mx-auto"
                            target="_blank"
                        >
                            <span>View</span>
                            <div>
                                <Image
                                    alt="Company 3"
                                    height="100"
                                    src="/images/company-3-center.svg"
                                    width="50"
                                />
                            </div>
                            <span>Site</span>
                        </a>
                    </Link>
                </section>
                <MediumWhiteBar />
            </div>
            {/* end: company 3 */}
            {/* director section */}
            <section className="grid grid-cols-1 lg:grid-cols-3 max-w-7xl mx-auto items-center">
                <div className="w-full">
                    <Image
                        src={urlForSanitySource(aboutPage.directorImage)
                            .width(500)
                            .height(644)
                            .url()}
                        height="644"
                        width="500"
                        alt={aboutPage.directorName}
                    />
                </div>
                <div className="lg:col-span-2 text-center">
                    <p className="uppercase font-extrabold text-xl lg:text-4xl mb-4">
                        {aboutPage.directorTitle}
                    </p>
                    <p className="font-outline text-4xl">
                        {aboutPage.directorName}
                    </p>
                    <div className="prose prose-lg text-gray-300 mx-auto mt-12">
                        <BlockContent blocks={aboutPage.directorDescription} />
                    </div>
                    <Link href="https://jeremymillerdirector.com/">
                        <a className="flex items-end justify-center space-x-4 mt-12">
                            <span className="uppercase font-extrabold text-xl lg:text-3xl">
                                {aboutPage.directorName} DIRECTOR’S
                            </span>{' '}
                            <span className="uppercase font-outline text-xl lg:text-3xl">
                                SITE
                            </span>{' '}
                            <span className="font-bold text-xl lg:text-2xl">
                                &gt;
                            </span>
                        </a>
                    </Link>
                </div>
            </section>
            <MediumWhiteBar />
            {/* end: director section */}
        </Layout>
    )
}

export async function getStaticProps() {
    const aboutPage = await getClient().fetch(
        groq`
		*[_type == "aboutPage"][0]{
			footerSubtitle,
			footerTitle,
			mainTitle,
			poster,
			reelVideoClient,
			reelVideoHeightAspectRatio,
			reelVideoId,
			reelVideoPoster,
			reelVideoTitle,
			reelVideoWidthAspectRatio,
			section1Body,
			section1Title,
			seoDescription,
			seoTitle,
			subtitle,
			videoClient,
			videoId,
            section2Subtitle,
            section2Title,
            services[]->,
            company3Body,
            company3Link,
            company3Title,
            company3VideoClient,
			company3VideoHeightAspectRatio,
			company3VideoId,
			company3VideoPoster,
			company3VideoTitle,
			company3VideoWidthAspectRatio,
            directorImage,
            directorTitle,
            directorName,
            directorDescription,
  		}
  		`
    )
    return {
        props: {
            aboutPage,
        },
    }
}

export default About
