import React from 'react';

import { TimerService } from './services/timer-service';
import { GlobalCss, FlexContainer } from './components/styled';
import Navbar from './components/Navbar';
import Timer from './components/Timer';

function App() {
  return (
    <TimerService>
      <GlobalCss />
      <Navbar />
      <FlexContainer
        justify="center"
        fullscreen
      >
        <Timer />
      </FlexContainer>
    </TimerService>
  );
}

export default App;
