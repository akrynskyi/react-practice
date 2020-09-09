import React from 'react';
import { TimerService } from './services/timer-service';

import { GlobalCss, Container } from './components/styled';
import Navbar from './components/Navbar';
import TimersGrid from './components/TimersGrid';

function App() {
  return (
    <TimerService>
      <GlobalCss />
      <Navbar />
      <Container>
        <TimersGrid />
      </Container>
    </TimerService>
  );
}

export default App;
