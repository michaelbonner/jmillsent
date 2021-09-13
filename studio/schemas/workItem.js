import { MdLocalMovies as icon } from "react-icons/md";

export default {
  name: "workItem",
  title: "Work Items",
  type: "document",
  icon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "clientName",
      title: "Client Name",
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
      name: "date",
      title: "Date",
      type: "datetime",
    },
    {
      name: "shortClipMp4",
      title: "Short hover clip - mp4",
      type: "file",
      options: {
        accept: "video/mp4",
      },
    },
    {
      name: "shortClipOgv",
      title: "Short hover clip - ogv",
      type: "file",
    },
    {
      name: "video_id",
      title: "Video ID",
      type: "string",
      description:
        "Enter the ID ( {{video_id}} ) of the video, not the whole url. https://player.vimeo.com/video/{{video_id}}?badge=0&autopause=0&player_id=0&app_id=58479",
    },
    {
      name: "videoWidthAspectRatio",
      title: "Video aspect ratio for width",
      type: "string",
      description: "What is the width of the aspect ratio",
      options: {
        list: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
        ],
        layout: "dropdown",
      },
    },
    {
      name: "videoHeightAspectRatio",
      title: "Video aspect ratio for height",
      type: "string",
      description: "What is the height of the aspect ratio",
      options: {
        list: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
        ],
        layout: "dropdown",
      },
    },
    {
      name: "poster",
      title: "Poster Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "credits",
      title: "Credits",
      type: "array",
      of: [
        {
          title: "Credit",
          type: "object",
          fields: [
            {
              title: "Role",
              name: "role",
              type: "string",
            },
            {
              title: "Value",
              name: "value",
              type: "string",
            },
          ],
        },
      ],
      options: {
        sortable: true,
        editModal: "popover",
      },
    },
    {
      name: "order",
      title: "Order",
      type: "number",
      hidden: true,
    },
  ],
  preview: {
    select: {
      clientName: "clientName",
      title: "title",
      date: "date",
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
