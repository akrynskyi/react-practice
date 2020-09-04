import { createGlobalStyle } from 'styled-components';

export const GlobalCss = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
  }
`;