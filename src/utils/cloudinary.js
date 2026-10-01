const CLOUDINARY_FETCH = "https://res.cloudinary.com/ekomjah/image/fetch";

const WIDTHS = [120, 180, 240, 320, 440, 600, 800];

const transform = (width) =>
  `w_${width},h_${width},c_fit,b_white,q_auto,f_auto,dpr_auto`;

export function productImage(url, width = 320) {
  return `${CLOUDINARY_FETCH}/${transform(width)}/${url}`;
}

export function productSrcSet(url) {
  return WIDTHS.map((width) => `${productImage(url, width)} ${width}w`).join(
    ", ",
  );
}

export function brandLogo(name) {
  const slug = name.trim().replace(/\s+/g, "").toLowerCase();
  return `https://img.logo.dev/name/${slug}?token=pk_DobpyacUTjWTJcYMlq_OYA&retina=true&size=64`;
}

export const LISTING_SIZES = "(min-width: 640px) 215px, 42vw";
