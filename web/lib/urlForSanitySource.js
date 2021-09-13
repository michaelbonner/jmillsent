import imageUrlBuilder from "@sanity/image-url";
import { getClient } from "../lib/sanity";

const urlForSanitySource = (source) => {
  return imageUrlBuilder(getClient()).image(source);
};
export default urlForSanitySource;
