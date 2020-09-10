import styled, { keyframes } from 'styled-components';

const dot = keyframes`
  0% {
    color: #333;
  }

  50% {
    color: #ccc;
  }
`;

export const TimerContainer = styled.div`
  width: 300px;
  height: auto;
`;

export const TimerHeader = styled.p`
  padding: 5px 0px
`;

export const TimerBody = styled.div`
  height: 100%;
  padding: 20px;
  display: flex;
  border-radius: 8px;
  flex-direction: column;
  justify-content: center;
  background-color: #212121;
  box-shadow: 
    0 4px 8px 0 rgba(60,64,67,.3), 
    0 2px 4px 2px rgba(60,64,67,.15);
`;

export const TimerUnit = styled.div`
  font-family: "Digital-7", "Roboto";
  position: relative;
  width: 65px;
  height: 80px;
  font-size: 48px;
  font-weight: 500;
  color: #2982ff;
  display: flex;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background-color: #333;
  box-shadow: 0px 0px 5px #000;
  text-shadow: 0px 0px 5px #000;

  &::before {
    content: "${props => props.content}";
    position: absolute;
    right: -21.5px;
    top: 50%;
    color: #333;
    font-size: 56px;
    transform: translateY(-50%);
    animation: ${dot} 1s infinite;
  }
`;