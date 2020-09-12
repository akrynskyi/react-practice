import React, { useState, useEffect, useCallback } from 'react';
import * as moment from 'moment';
import { format } from '../Timer';

import { 
  Container, 
  Cube,
  FaceUnits, 
  FaceFront, 
  FaceLeft, 
  FaceTop, 
  Background 
} from '../styled';

export const Hero = () => {
  const [clock, setClock] = useState({h: '00', m: '00', s: '00'});

  const setupClock = useCallback(() => {
    const h = format(moment().hours());
    const m = format(moment().minutes());
    const s = format(moment().seconds());

    setClock({h, m, s});
  }, []);

  useEffect(() => {
    setupClock();
    const int = setInterval(setupClock, 1000);
    
    return () => clearInterval(int);
  }, [setupClock]);

  return (
    <Background>
      <Container>
        <Cube>
          <FaceTop>
            <FaceUnits>{clock.s}</FaceUnits>
          </FaceTop>
          <FaceFront>
            <FaceUnits>{clock.m}</FaceUnits>
          </FaceFront>
          <FaceLeft>
            <FaceUnits>{clock.h}</FaceUnits>
          </FaceLeft>
        </Cube>
      </Container>
    </Background>
  );
};