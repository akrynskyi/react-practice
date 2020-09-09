import React, { useState, useEffect, useCallback } from 'react';
import * as moment from 'moment';

import { Button, ButtonIcon } from '../styled';
import { Row, Column, Label } from '../styled';
import { TimerContainer, TimerHeader, TimerBody, TimerUnit } from '../styled';

export const Timer = ({name, endtime}) => {
  const [timer, setTimer] = useState({h: '00', m: '00', s: '00'});
  const [start, setStart] = useState(false);

  const calcTime = useCallback(() => {
    const format = (val) => (val < 10 ? `0${val}` : `${val}`);
    
    const now = start ? moment().valueOf() : moment().seconds(0).valueOf();
    const t = moment.duration(endtime - now, 'milliseconds');
  
    const h = format(moment.duration(t).hours());
    const m = format(moment.duration(t).minutes());
    const s = format(moment.duration(t).seconds());
  
    return { now, h, m, s };
  }, [endtime, start]);

  useEffect(() => {
    const { h, m, s } = calcTime();
    setTimer({ h, m, s });
  }, [calcTime]);

  useEffect(() => {
    let interval = null;

    if (!start) {
      clearInterval(interval);
      return;
    }

    interval = setInterval(() => {
      const { now, ...time } = calcTime();

      setTimer(time);

      if (endtime < now) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [start, calcTime, endtime]);

  return (
    <TimerContainer>
      <TimerHeader>
        <span>{name}</span>
      </TimerHeader>
      <TimerBody>
        <Row justify="space-between" mb="20px">
          <ButtonIcon
            col="#717171"
          >
            <i className="material-icons">timer</i>
          </ButtonIcon>
          <ButtonIcon
            col="#717171"
            onClick={() => setStart(false)}
          >
            <i className="material-icons">highlight_off</i>
          </ButtonIcon>
        </Row>
        <Row justify="space-between">
          <Column>
            <TimerUnit
              content=":"
            >{timer.h}</TimerUnit>
            <Label>Hours</Label>
          </Column>
          <Column>
            <TimerUnit
              content=":"
            >{timer.m}</TimerUnit>
            <Label>Minutes</Label>
          </Column>
          <Column>
            <TimerUnit>{timer.s}</TimerUnit>
            <Label>Seconds</Label>
          </Column>
        </Row>
        <Row mt="40px">
          <Button
            col="#fff"
            width="100%"
            bgc="#2982ff"
            fontsize="16px"
            minheight="50px"
            onClick={() => setStart(true)}
          >
            Start
          </Button>
        </Row>
      </TimerBody>
    </TimerContainer>
  );
}