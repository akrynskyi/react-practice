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
  const { dropdown, toggleDropdown } = useContext(TimerServiceContext);

  const createTimerDropdown = (
    <Dropdown>
      <TimerForm />
    </Dropdown>
  );

  return (
    <Nav>
      <FlexContainer>
        <WithDropdown>
          <ButtonTransparent onClick={toggleDropdown}>
            New timer
          </ButtonTransparent>
          { dropdown && createTimerDropdown }
        </WithDropdown>
      </FlexContainer>
    </Nav>
  );
};