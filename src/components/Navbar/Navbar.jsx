import React, { useContext } from 'react';
import { TimerServiceContext } from '../../services/timer-service';

import { 
  Nav, 
  FlexContainer, 
  ButtonTransparent, 
  WithDropdown, 
  Dropdown 
} from '../styled';
import TimerForm from '../TimerForm';

export const Navbar = () => {
  const { form, toggleForm } = useContext(TimerServiceContext);

  const createTimerDropdown = (
    <Dropdown>
      <TimerForm />
    </Dropdown>
  );

  return (
    <Nav>
      <FlexContainer>
        <WithDropdown>
          <ButtonTransparent onClick={toggleForm}>
            New timer
          </ButtonTransparent>
          { form && createTimerDropdown }
        </WithDropdown>
      </FlexContainer>
    </Nav>
  );
};