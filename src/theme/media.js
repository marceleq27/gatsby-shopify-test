const em = px => `${px / 16}em`;
const mountMedia = val => `@media screen and (min-width: ${em(val)})`;

export const breakpoints = {
  mobile: 576,
  tablet: 768,
  pc: 992,
  pcWide: 1200,
};

export const media = {
  mobile: mountMedia(breakpoints.mobile),
  tablet: mountMedia(breakpoints.tablet),
  desktop: mountMedia(breakpoints.desktop),
  desktopWide: mountMedia(breakpoints.desktopWide),
};
