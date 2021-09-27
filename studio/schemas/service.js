import UserIcon from "part:@sanity/base/user-icon";

export default {
  name: "service",
  title: "Service",
  type: "document",
  icon: UserIcon,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of service",
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
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
};
