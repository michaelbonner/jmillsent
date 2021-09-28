import { MdWeb as icon } from "react-icons/md";

export default {
  name: "studioItem",
  title: "Studio Spaces",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      clientName: "clientName",
      title: "title",
      media: "poster",
    },
    prepare(selection) {
      return {
        title: `${selection.clientName ? `${selection.clientName} | ` : ""}${
          selection.title || ""
        }`,
        date: selection.date,
        subtitle: selection.date,
        media: selection.media,
      };
    },
  },
};
