import React from 'react';

import styled, { keyframes } from 'styled-components';
import { Container } from '../styled';

const colr = keyframes`
  0% {
    color: #2982ff;
    text-shadow: 0px 0px 5px #000;
  }

  50% {
    color: #cc4343;
    text-shadow: 0px 0px 5px #ff0000;
  }
`;

const Cube = styled.figure`
  cursor: pointer;
  width: 210px;
  height: 210px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-style: preserve-3d;
  transform:
    translate(-50%, -50%)
    rotateX(-35deg)
    rotateY(45deg);
  transition: all 2s linear;

  &:hover {
    transform:
      translate(-50%, -50%)
      rotateX(-50deg)
      rotateY(45deg);
  }
`;

const Face = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  transform-origin: center;
  background-color: #000;
  text-align: center;
`;

const FaceUnits = styled.p`
  font-family: "Digital-7";
  font-size: 180px;
  line-height: 180px;
  margin-top: 20px;
  color: #2982ff;
  text-shadow: 0px 0px 5px #000;
  animation: ${colr} 10s infinite;
`;

const FaceFront = styled(Face)`
  background-color: #111;
  transform: 
    translate3d(0, 0, 105px);
`;

const FaceLeft = styled(Face)`
  background-color: #151515;
  transform:
    rotateY(-90deg)
    translate3d(0, 0, 105px);
`;

const FaceTop = styled(Face)`
  background-color: #222;
  transform:
    rotateX(90deg)
    translate3d(0, 0, 105px);
`;

const Background = styled.div`
  min-height: calc(100vh - 57px);
  background-color: #424242;
`

export const Hero = () => {
  return (
    <Background>
      <Container>
        <Cube>
          <FaceTop>
            <FaceUnits>00</FaceUnits>
          </FaceTop>
          <FaceFront>
            <FaceUnits>00</FaceUnits>
          </FaceFront>
          <FaceLeft>
            <FaceUnits>00</FaceUnits>
          </FaceLeft>
        </Cube>
      </Container>
    </Background>
  );
};