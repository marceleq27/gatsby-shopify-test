const em = px => `${px / 16}em`
const mountMedia = val => `@media screen and (max-width: ${em(val)})`

export const breakpoints = {
  mobile: 576,
  tablet: 768,
  desktop: 991,
  desktopWide: 1199,
}

export const media = {
  mobile: mountMedia(breakpoints.mobile),
  tablet: mountMedia(breakpoints.tablet),
  desktop: mountMedia(breakpoints.desktop),
  desktopWide: mountMedia(breakpoints.desktopWide),
}
