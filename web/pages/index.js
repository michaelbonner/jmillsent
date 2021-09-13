import groq from "groq";
import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../components/layout";
import { getClient } from "../lib/sanity";
import useWindowSize from "../hooks/useWindowSize";
import WorkItemTile from "../components/work-item-tile";

function Home({ homePage }) {
  const { workItems } = homePage;
  const [isDesktop, setIsDesktop] = useState(false);
  const size = useWindowSize();

  useEffect(() => {
    setIsDesktop(size.width >= 1024);
  }, [size.width]);

  return (
    <Layout
      title={homePage.seo_title}
      description={homePage.seo_description}
      heroImageUrl={homePage.poster || null}
      heroVideoId={homePage.video_id}
      isDesktop={isDesktop}
    >
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-1 px-1 pt-1">
        {workItems.map((workItem, index) => {
          return (
            <WorkItemTile
              workItem={workItem}
              key={index}
              index={index}
              hideAfterCount={6}
            />
          );
        })}
      </div>
    </Layout>
  );
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
  );
  return {
    props: {
      homePage,
    },
  };
}

export default Home;
