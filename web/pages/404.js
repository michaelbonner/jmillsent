import groq from 'groq'
import BlockContent from '@sanity/block-content-to-react'
import { H1, H2 } from '../components/headings'
import Layout from '../components/layout'
import { getClient } from '../lib/sanity'
import Image from 'next/image'
import LittleWhiteBar from '../components/little-white-bar'
import VideoPlayer from '../components/video-player'
import MediumWhiteBar from '../components/medium-white-bar'

function NotFound() {
  return (
    <Layout title={`404: This page could not be found.`} description={''}>
      <div className="container px-4 lg:mx-auto text-white text-center my-12 lg:my-36">
        <H1>404: This page could not be found</H1>
        <div className="mx-auto prose prose-lg mb-12">
          <p className="text-gray-100">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable. Please use the site
            navigation to find what you are looking for.
          </p>
        </div>
        <Image
          src={`/images/jmills-raven-white.svg`}
          alt="Jmills"
          width="130"
          height="130"
        />
        <LittleWhiteBar />
      </div>
    </Layout>
  )
}

export default NotFound
