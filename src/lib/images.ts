export const coverLoader = ({ src, width, quality = 75 }) => {
  return `https://res.cloudinary.com/wansaleh/image/fetch/w_${width},q_${quality}/f_auto/${src}`;
};
export const getBlurUrl = (src) => {
  return `https://res.cloudinary.com/wansaleh/image/fetch/w_50,q_10/f_auto/${src}`;
};
