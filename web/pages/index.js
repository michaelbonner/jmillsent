import groq from "groq"
import { useEffect, useState } from "react"
import Link from "next/link"
import Layout from "../components/layout"
import { getClient, urlFor } from "../lib/sanity"
import useWindowSize from "../hooks/useWindowSize"

function Home({ homePage }) {
	const { workItems } = homePage
	const [isDesktop, setIsDesktop] = useState(false)
	const size = useWindowSize()

	useEffect(() => {
		setIsDesktop(size.width >= 1024)
	}, [size.width])

	return (
		<Layout
			title={homePage.seo_title}
			description={homePage.seo_description}
			heroImageUrl={homePage.poster || null}
			heroVideoId={homePage.video_id}
			isDesktop={isDesktop}
		>
			<div
				className="flex flex-col items-center justify-center text-white"
				style={{
					backgroundImage: "url(/images/home-bg.jpg)",
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					minHeight: "calc(100vh - 65px)",
				}}
			>
				<h1 className="uppercase font-extrabold text-3xl lg:text-7xl mb-4">
					JMILLS ENTERTAINMENT
				</h1>
				<h2 className="uppercase font-outline text-2xl lg:text-5xl">
					MOTION PICTURE STUDIO
				</h2>
			</div>
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
    workItems[]->{
      _id,
      slug,
      clientName,
      title,
      poster,
      "shortClipMp4URL": shortClipMp4.asset->url,
      "shortClipOgvURL": shortClipOgv.asset->url,
    }
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
