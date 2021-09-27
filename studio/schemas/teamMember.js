import UserIcon from "part:@sanity/base/user-icon";

export default {
  name: "teamMember",
  title: "Team Members",
  type: "document",
  icon: UserIcon,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of person",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 100,
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "title",
    },
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
};
