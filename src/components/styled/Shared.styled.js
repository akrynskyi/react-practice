import styled from 'styled-components';

export const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: ${props => props.justify ? props.justify : 'flex-start'};
  margin-top: ${props => props.mt ? props.mt : 'unset'};
  margin-bottom: ${props => props.mb ? props.mb : 'unset'};
`;

export const Column = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${({ contentRow }) => contentRow ? 'row' : 'column'};
`;

export const Label = styled.p`
  font-size: 12px;
  margin-top: 8px;
  color: #717171;
`;

export const WithDropdown = styled.div`
  position: relative;
`;

export const WithTooltip = styled(WithDropdown)``;

export const Dropdown = styled.div`
  position: absolute;
  background-color: #ccc;
  width: 370px;
  padding: 25px 20px;
  margin-top: 10px;
  border-radius: 4px;
  left: 0;
  z-index: 20;

  &::after {
    content: "";
    position: absolute;
    border: 8px solid transparent;
    border-top-color: #ccc;
    bottom: 100%;
    left: 25px;
    transform: rotate(180deg);
  }
`;

export const Background = styled.div`
  min-height: calc(100vh - 57px);
  background-color: #424242;
`;

export const Tooltip = styled.div`
  position: absolute;
  display: inline-block;
  background-color: #000;
  color: #fff;
  font-size: 12px;
  text-align: center;
  text-transform: capitalize;
  line-height: 1.2;
  padding: .4rem .5rem;
  border-radius: 4px;
  width: 100%;
  bottom: 50%;
  left: 50%;
  opacity: ${({active}) => active ? '1' : '0'};
  transform: ${({active}) => active ? 'translate(-50%, -80%)' : 'translate(-50%, 0%)'};
  transition: all .3s linear;
  pointer-events: ${({active}) => active ? 'all' : 'none'};

  &::after {
    content: "";
    position: absolute;
    border: 5px solid transparent;
    border-top-color: #000;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
`;