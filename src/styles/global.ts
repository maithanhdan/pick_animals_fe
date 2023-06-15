import { createGlobalStyle, css } from 'styled-components';

const resetCss = css`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans JP', sans-serif;
    /* overflow: hidden; */

    video::-webkit-media-controls-timeline {
      /* display: none; */
    }
  }
  input {
    position: relative;
  }
`;

const GlobalStyle = createGlobalStyle`
    ${resetCss}
`;

export { GlobalStyle };
