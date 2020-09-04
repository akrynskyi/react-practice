import styled from 'styled-components';

export const Button = styled.button`
  color: ${props => props.color ? props.color : '#fff'};
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