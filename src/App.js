import React from 'react';

import { GlobalCss, FlexContainer } from './components/styled';
import Navbar from './components/Navbar';
import Timer from './components/Timer';

function App() {
  return (
    <>
      <GlobalCss />
      <Navbar />
      <FlexContainer
        justify="center"
        fullscreen
      >
        <Timer />
      </FlexContainer>
    </>
  );
}

export default App;
