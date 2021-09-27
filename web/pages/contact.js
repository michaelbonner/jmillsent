/* eslint-disable @next/next/no-img-element */
import groq from 'groq'
import Image from 'next/image'
import BlockContent from '@sanity/block-content-to-react'
import Layout from '../components/layout'
import { getClient } from '../lib/sanity'
import urlForSanitySource from '../lib/urlForSanitySource'
import { H1 } from '../components/headings'

function Home({ contact }) {
    const backgroundImageUrl = urlForSanitySource(contact.backgroundImage)
        .width(1400)
        .url()
    return (
        <Layout title={contact.seoTitle} description={contact.seoDescription}>
            <div
                style={{
                    backgroundColor: '#ccc',
                    backgroundImage: `url(${backgroundImageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                }}
            >
                <div className="max-w-5xl mx-auto px-4 lg:px-0 py-24 text-center">
                    <H1>{contact.title}</H1>
                </div>
            </div>
            <div>
                <div className="max-w-5xl mx-auto px-4 lg:px-0 py-24 text-center">
                    <div>
                        <p>JME STUDIO ADDRESS</p>
                        <p>1589 W 2225 S</p>
                        <p>WOODS CROSS, UT 84087</p>
                    </div>
                    <div>
                        <p>STUDIO LINE: 801-797-9023</p>
                        <p>DIRECT LINE: 801-971-4683</p>
                        <p>EMAIL: INFO@JMILLSENT.COM</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getStaticProps() {
    return {
        props: {
            contact: await getClient().fetch(groq`
          *[_type == "contactPage"][0]{
            title,
            backgroundImage,
            seoTitle,
            seoDescription
          }
        `),
        },
    }
}

export default Home
