import React, { useContext } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { TimerServiceContext } from '../../services/timer-service';

import TimerForm from '../TimerForm';
import styled from 'styled-components';
import {
  Nav, 
  FlexContainer, 
  ButtonTransparent, 
  WithDropdown, 
  Dropdown,
  Column
} from '../styled';

const NavLink = styled(Link)`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  padding: 10px 15px;
  transition: color .2s linear;

  &:not(:last-child) {
    margin-right: 20px;
  }

  &:hover {
    color: #ccc;
  }
`;

export const Navbar = () => {
  const { dropdown, toggleDropdown } = useContext(TimerServiceContext);
  const timersPage = useRouteMatch('/timers/');

  const createTimerDropdown = (
    <Dropdown>
      <TimerForm />
    </Dropdown>
  );

  const createButton = (
    <WithDropdown>
      <ButtonTransparent onClick={toggleDropdown}>
        New timer
      </ButtonTransparent>
      { dropdown && createTimerDropdown }
    </WithDropdown>
  );

  return (
    <Nav>
      <FlexContainer justify="space-between">
        <Column contentRow>
          { timersPage && createButton }
        </Column>
        <Column contentRow>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/timers/">Timers</NavLink>
        </Column>
      </FlexContainer>
    </Nav>
  );
};