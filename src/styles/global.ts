import { createGlobalStyle, css } from 'styled-components';

const resetCss = css`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans JP', sans-serif;
    /* overflow: hidden; */
  }
  input {
    position: relative;
  }
`;

const GlobalStyle = createGlobalStyle`
    ${resetCss}
`;

export { GlobalStyle };
