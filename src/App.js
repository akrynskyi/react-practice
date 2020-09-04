import React, { useState, useEffect } from 'react';
import * as moment from 'moment';

import { GlobalCss, FlexContainer } from './components/styled';
import Navbar from './components/Navbar';

function App() {
  const [endtime, setEndtime] = useState(moment().seconds(100).valueOf());
  const [timer, setTimer] = useState({h: '00', m: '00', s: '00'});

  const format = (val) => {
    return val < 10 ? `0${val}` : `${val}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment().valueOf();
      const t = moment.duration(endtime - now, 'milliseconds');

      const h = format(moment.duration(t).hours());
      const m = format(moment.duration(t).minutes());
      const s = format(moment.duration(t).seconds());
      
      setTimer({h, m, s});

      console.log('tick');

      if (endtime < now) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <GlobalCss />
      <Navbar />
      <FlexContainer justify="space-around" fullscreen>
        <p>Hour: {timer.h}</p>
        <p>Minutes: {timer.m}</p>
        <p>Seconds: {timer.s}</p>
      </FlexContainer>
    </>
  );
}

export default App;
