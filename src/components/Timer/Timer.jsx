import React, { useState, useEffect } from 'react';
import * as moment from 'moment';

import { Button, ButtonIcon } from '../styled';
import { Row, Column, Label } from '../styled';
import { TimerContainer, TimerHeader, TimerBody, TimerUnit } from '../styled';

export const Timer = () => {
  const [endtime, setEndtime] = useState(moment().seconds(7200).valueOf());
  const [timer, setTimer] = useState({h: '00', m: '00', s: '00'});

  const format = (val) => {
    return val < 10 ? `0${val}` : `${val}`;
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const now = moment().valueOf();
  //     const t = moment.duration(endtime - now, 'milliseconds');

  //     const h = format(moment.duration(t).hours());
  //     const m = format(moment.duration(t).minutes());
  //     const s = format(moment.duration(t).seconds());
      
  //     setTimer({h, m, s});

  //     // console.log('tick');

  //     if (endtime < now) {
  //       clearInterval(interval);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [endtime]);

  return (
    <TimerContainer>
      <TimerHeader>
        <span>Timer-1</span>
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
          >
            Start
          </Button>
        </Row>
      </TimerBody>
    </TimerContainer>
  );
}