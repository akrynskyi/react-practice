import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { TimerService } from './services/timer-service';

import { GlobalCss } from './components/styled';
import Navbar from './components/Navbar';
import TimersGrid from './components/TimersGrid';
import Hero from './components/Hero';

function App() {
  return (
    <Router>
      <TimerService>
        <GlobalCss />
        <Navbar />
        <Switch>
          <Route 
            path="/" 
            component={Hero}
            exact
          />
          <Route 
            path="/timers/" 
            component={TimersGrid} 
          />
        </Switch>
      </TimerService>
    </Router>
  );
}

export default App;
