import type { MetadataRoute } from 'next'
import { groq } from 'next-sanity'
import { sanityClient } from '../lib/sanity'

const getWorkItemCategories = async () => {
  const workItemCategories = await sanityClient.fetch(
    groq`
      *[_type == "workItemCategory"][showOnWorkPage == true]|order(order asc){
        name,
      }
    `
  )
  // the first item is the default page, so we remove it
  workItemCategories.shift()
  return workItemCategories.map((item: { name: string }) => ({
    url: `https://www.jmillsent.com/work?work-type=${item.name}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))
}

const getWorkItems = async () => {
  // get work items from the categories so we only show work items that have links on a page somewhere

  const workItemCategories = await sanityClient.fetch(
    groq`
        *[_type == "workItemCategory"][showOnWorkPage == true]|order(order asc){
        workItems[]->{
          _id,
          slug,
        }
      }
        `
  )

  // get only the unique slugs from the work items
  const workItemSlugs = Array.from(
    new Set(
      workItemCategories.flatMap(
        (category: { workItems: { slug: { current: string } }[] }) =>
          category.workItems.map((item) => item.slug.current)
      )
    )
  )
  return workItemSlugs.sort().map((slug) => ({
    url: `https://www.jmillsent.com/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))
}

const getNewsItems = async () => {
  const newsItems = await sanityClient.fetch(
    groq`
      *[_type == "newsItem"] {
        slug,
      }
    `
  )
  return newsItems.map((item: { slug: { current: string } }) => ({
    url: `https://www.jmillsent.com/news/${item.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://www.jmillsent.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://www.jmillsent.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.jmillsent.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://www.jmillsent.com/moments',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://www.jmillsent.com/news',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://www.jmillsent.com/studio',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://www.jmillsent.com/work',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...(await getWorkItemCategories()),
    ...(await getWorkItems()),
    ...(await getNewsItems()),
  ]
}
