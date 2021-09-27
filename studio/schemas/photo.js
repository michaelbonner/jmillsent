export default {
  name: "photo",
  title: "Photos",
  type: "array",
  of: [
    {
      name: "title",
      title: "Title",
      type: "string",
      description: "title of image",
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
    select: { title: "name", media: "image" },
  },
};
