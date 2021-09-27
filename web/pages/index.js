import groq from 'groq'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import { getClient, urlFor } from '../lib/sanity'
import useWindowSize from '../hooks/useWindowSize'

function Home({ homePage }) {
    const heroContent = (
        <div className="h-full w-full flex flex-col items-center justify-center text-white">
            <h1 className="uppercase font-extrabold text-3xl lg:text-7xl mb-4">
                {homePage.main_title}
            </h1>
            <h2 className="uppercase font-outline text-2xl lg:text-5xl">
                {homePage.subtitle}
            </h2>
        </div>
    )

    return (
        <Layout
            title={homePage.seo_title}
            description={homePage.seo_description}
            heroImageUrl={homePage.poster || null}
            heroVideoId={homePage.video_id}
            heroContent={heroContent}
        >
            <div className="flex flex-col lg:flex-row">Home content</div>
        </Layout>
    )
}

export async function getStaticProps() {
    const homePage = await getClient().fetch(
        groq`
  *[_type == "homePage"][0]{
    seo_title,
    seo_description,
    poster,
    video_id,
	main_title,
	subtitle
  }
  `
    )
    return {
        props: {
            homePage,
        },
    }
}

export default Home
