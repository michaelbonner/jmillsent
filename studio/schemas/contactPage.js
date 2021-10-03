import { MdEmail as icon } from "react-icons/md";

export default {
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 100,
      },
    },
    {
      name: "seoTitle",
      title: "Seo title",
      type: "string",
    },
    {
      name: "seoDescription",
      title: "Seo description",
      type: "text",
    },
    {
      name: "backgroundImage",
      title: "Background image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "representationTitle",
      title: "Representation title",
      type: "string",
    },
    {
      name: "representationCards",
      title: "Representation cards",
      type: "array",
      of: [{ type: "representationCard" }],
    },
  ],
  preview: {
    select: { title: "title", media: "backgroundImage" },
  },
};
