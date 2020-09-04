import React from 'react';
import { Nav, FlexContainer, ButtonTransparent } from '../styled';

export const Navbar = () => {
  return (
    <Nav>
      <FlexContainer>
        <ButtonTransparent>New timer</ButtonTransparent>
      </FlexContainer>
    </Nav>
  )
}