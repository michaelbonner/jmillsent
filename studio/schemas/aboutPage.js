import { MdPerson as icon } from "react-icons/md";

export default {
  name: "aboutPage",
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
      name: "seo_title",
      title: "SEO Title",
      type: "string",
    },
    {
      name: "seo_description",
      title: "SEO Description",
      type: "string",
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "bio",
      title: "Bio",
      type: "blockContent",
    },
    {
      name: "bioMaxWidth",
      title: "Bio Image Max Width",
      type: "string",
      description: "What is the maximum width of the image",
      options: {
        list: [
          {
            title: "xs",
            value: "xs",
          },
          {
            title: "sm",
            value: "sm",
          },
          {
            title: "md",
            value: "md",
          },
          {
            title: "lg",
            value: "lg",
          },
          {
            title: "xl",
            value: "xl",
          },
          {
            title: "2xl",
            value: "2xl",
          },
          {
            title: "3xl",
            value: "3xl",
          },
          {
            title: "4xl",
            value: "4xl",
          },
          {
            title: "5xl",
            value: "5xl",
          },
        ],
      },
    },
    {
      name: "representation",
      title: "Representation",
      type: "blockContent",
    },
    {
      name: "notableAwards",
      title: "Notable Awards",
      type: "blockContent",
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare(selection) {
      return {
        title: `${selection.title}`,
      };
    },
  },
};
