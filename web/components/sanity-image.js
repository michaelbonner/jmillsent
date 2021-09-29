import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import { getClient } from "../lib/sanity";

function SanityImage({ image }) {
  const imageProps = useNextSanityImage(getClient(), image);

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      {...imageProps}
      layout="responsive"
      sizes="(max-width: 800px) 100vw, 800px"
    />
  );
}

export default SanityImage;
