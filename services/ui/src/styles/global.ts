import { css } from '@emotion/react';
import { resetStyle } from './reset';

export const GlobalStyle = css`
  html,
  body {
    ${resetStyle}
    user-select: none;
    font-size: 16pt;
  }

  @keyframes dropDown {
    0% {
      transform: scaleY(0);
    }
    80% {
      transform: scaleY(1.1);
    }
    100% {
      transform: scaleY(1);
    }
  }
  @keyframes growOut {
    0% {
      transform: scale(0);
    }
    80% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;
