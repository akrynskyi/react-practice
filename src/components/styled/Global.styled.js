import { createGlobalStyle } from 'styled-components';

export const GlobalCss = createGlobalStyle`
  @font-face {
    font-family: 'Digital-7';
    font-weight: normal;
    font-style: normal;
    src: 
      url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/184191/Digital-7.eot?#iefix') format('embedded-opentype'),  
      url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/184191/Digital-7.woff') format('woff'), 
      url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/184191/Digital-7.ttf')  format('truetype'), 
      url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/184191/Digital-7.svg#Digital-7') format('svg');
  }

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