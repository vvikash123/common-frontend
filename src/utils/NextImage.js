// components/NextImage.js

import Image from "next/image";
import { useState, useEffect } from "react";
import { IMG_DEFAULT } from "@/constants/index"; // Ensure this import points to the correct file

const NextImage = ({
  src,
  placeholderSrc = IMG_DEFAULT,
  alt='Text',
  layout = "fill",
  quality = 90,
  priority = false,
  objectFit = "cover",
  objectPosition = "center",
  style = {},
  sizes = "100vw",
  decoding = "async",
  fromAuthor,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    setImgSrc(placeholderSrc || src); // Reset the source when the prop changes
  }, [src, placeholderSrc]);

  const handleError = () => {
    setImgSrc(IMG_DEFAULT); // Path to your default image
  };

  const handleLoad = () => {
    if (imgSrc === placeholderSrc) {
      setImgSrc(src);
    }
  };

  return (
    <span
      style={{
        position: "relative",
        width: "100%",
        paddingBottom: "56.25%" /* 16:9 aspect ratio */,
        // display: 'block'
      }}
    >
      <Image
        src={imgSrc}
        alt={alt}
        layout={layout}
        quality={imgSrc === placeholderSrc ? 10 : quality}
        priority={priority}
        objectFit={objectFit}
        objectPosition={objectPosition}
        onError={handleError}
        onLoad={handleLoad}
        loading={priority ? 'eager' : 'lazy'}
        sizes={sizes}
        decoding={decoding}
        {...props}
      />
    </span>
  );
};

export default NextImage;
