import { createGlobalStyle, css } from 'styled-components';

const globalStyles = css`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
  html {
    font-family: 'Montserrat', sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  .container {
    max-width: 992px;
    margin: 0 auto;
  }
`;

export default createGlobalStyle`
${globalStyles}
`;
