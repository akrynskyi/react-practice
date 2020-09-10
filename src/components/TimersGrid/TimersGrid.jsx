import React, { useContext } from 'react';
import { TimerServiceContext } from '../../services/timer-service';

import Timer from '../Timer';
import { GridContainer, Container } from '../styled';

export const TimersGrid = () => {
  const { timers } = useContext(TimerServiceContext);

  return (
    <Container>
      <GridContainer>
        {
          timers.length 
          ? timers.map(({id, ...data}) => <Timer key={id} {...data} />)
          : <p style={{gridColumn: 'span 3'}}>No timers to display</p>
        }
      </GridContainer>
    </Container>
  );
};