import { WorkItemCategory } from '@/components/work-item-category'
import { defaultSlugify } from '@/lib/defaultSlugify'
import { getWorkPageAndWorkItemCategories } from '@/lib/sanity-data/getWorkPageAndWorkItemCategories'

const WorkPage = ({ workItemCategories, workItemCategory, workPage }) => {
  return (
    <WorkItemCategory
      workItemCategories={workItemCategories}
      workItemCategory={workItemCategory}
      workPage={workPage}
    />
  )
}

export async function getStaticProps() {
  const { workPage, workItemCategories } =
    await getWorkPageAndWorkItemCategories()

  return {
    props: {
      workItemCategories,
      workItemCategory: defaultSlugify(workItemCategories[0].name),
      workPage,
    },
  }
}

export default WorkPage
