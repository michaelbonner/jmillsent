import { MdGridOn as icon } from "react-icons/md";

export default {
  name: "studioPage",
  title: "Studio Page",
  type: "document",
  icon,
  fields: [
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
    },
  ],
  preview: {
    select: {},
    prepare(selection) {
      return {
        title: `Studio Page`,
      };
    },
  },
};
