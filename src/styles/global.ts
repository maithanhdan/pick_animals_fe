import { createGlobalStyle, css } from 'styled-components';

const resetCss = css`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Noto Sans JP', sans-serif;
    /* overflow: hidden; */
    video::-webkit-media-controls-enclosure {
      /* display: none; */
    }
    video::-webkit-media-controls-timeline {
      /* display: none; */
    }
    video::-webkit-media-controls-current-time-display {
      /* display: none; */
    }
    video::-webkit-media-controls-mute-button {
      /* display: none; */
    }
    video::-webkit-media-controls-toggle-closed-captions-button {
      /* display: none; */
    }
    video::-webkit-media-controls-volume-slider {
      /* display: none; */
    }
    video::-webkit-media-controls-play-button {
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
