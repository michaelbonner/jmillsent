import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

import { WorkItemCategory } from '@/components/work-item-category'
import { defaultSlugify } from '@/lib/defaultSlugify'
import { sanityClient } from '@/lib/sanity'
import groq from 'groq'
import { getWorkPageAndWorkItemCategories } from '..'

const WorkItemCategoryPage = ({
  workPage,
  workItemCategories,
  workItemCategory,
}) => {
  return (
    <WorkItemCategory
      workPage={workPage}
      workItemCategories={workItemCategories}
      workItemCategory={workItemCategory}
    />
  )
}

export async function getStaticPaths() {
  const workItemCategories = await sanityClient.fetch(
    groq`
      *[_type == "workItemCategory"][showOnWorkPage == true]|order(order asc){
        name,
      }
    `
  )

  return {
    paths: workItemCategories.map((workItemCategory) => ({
      params: {
        workItemCategory: defaultSlugify(workItemCategory.name),
      },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const { workItemCategory } = params

  const { workPage, workItemCategories } =
    await getWorkPageAndWorkItemCategories()

  return {
    props: {
      workItemCategory,
      workPage,
      workItemCategories,
    },
  }
}

export default WorkItemCategoryPage
