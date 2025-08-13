import groq from 'groq'
import { sanityClient } from '../sanity'

export const getWorkPageAndWorkItemCategories = async () => {
  const workPage = await sanityClient.fetch(
    groq`
        *[_type == "workPage"][0]{
          poster,
          seoTitle,
          seoDescription,
          subscribeFormTitle,
          subscribeFormSuccessMessage,
          videoId,
          workPageDescription,
        }
    `
  )

  const workItemCategories = await sanityClient.fetch(
    groq`
        *[_type == "workItemCategory"][showOnWorkPage == true]|order(order asc){
          name,
          order,
          imageGallery[]{
            _type,
            "name": asset->originalFilename,
            asset,
            caption,
            crop,
            hotspot,
          },
          title,
          subtitle,
          body,
          workItems[]->{
            _id,
            slug,
            clientName,
            title,
            poster,
            videoHeightAspectRatio,
            videoWidthAspectRatio,
            "shortClipMp4URL": shortClipMp4.asset->url,
            "shortClipMp4S3URL": shortClipMp4S3.asset->fileURL,
            "shortClipOgvURL": shortClipOgv.asset->url,
            "shortClipOgvS3URL": shortClipOgvS3.asset->fileURL,
          }
        }
    `
  )

  return {
    workPage,
    workItemCategories,
  }
}
