import Layout from "../../components/layout";
import groq from "groq";
import { getClient } from "../../lib/sanity";
import WorkItemTile from "../../components/work-item-tile";

function Work({ workPage, workItems }) {
  return (
    <Layout title={workPage.seo_title} description={workPage.seo_description}>
      <div className="mx-1 grid grid-cols-1 lg:grid-cols-3 gap-1">
        {workItems.map((workItem, index) => {
          return <WorkItemTile workItem={workItem} key={index} />;
        })}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const workPage = await getClient().fetch(
    groq`
  *[_type == "workPage"][0]{
    seo_title,
    seo_description,
    poster,
    video_id,
  }
  `
  );
  const workItems = await getClient().fetch(
    groq`
    *[_type == "workItem"][!(_id in path('drafts.**'))]|order(order asc){
      _id,
      slug,
      clientName,
      title,
      poster,
      "shortClipMp4URL": shortClipMp4.asset->url,
      "shortClipOgvURL": shortClipOgv.asset->url,
    }
  `
  );
  return {
    props: {
      workPage,
      workItems,
    },
  };
}

export default Work;
