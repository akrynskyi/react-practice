import styled from 'styled-components';

export const Button = styled.button`
  width: ${props => props.width ? props.width : 'auto'};
  min-height: ${props => props.minheight ? props.minheight : 'auto'};
  color: ${props => props.col ? props.col : '#fff'};
  font-size: ${props => props.fontsize ? props.fontsize : '14px'};
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 4px;
  font-family: inherit;
  transition: all .2s linear;
  background-color: ${props => props.bgc ? props.bgc : '#000'};
`;

export const ButtonTransparent = styled(Button)`
  color: #fff;
  background-color: transparent;

  &:hover {
    color: #212121;
    background-color: #fff;
  }
`;

export const ButtonIcon = styled.button`
  width: ${props => props.width ? props.width : '30px'};
  height: ${props => props.height ? props.height : '30px'};
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${props => props.col ? props.col : '#fff'};
  font-size: ${props => props.fontsize ? props.fontsize : 'unset'};
  display: flex;
  align-items: center;
  justify-content: center;
`;