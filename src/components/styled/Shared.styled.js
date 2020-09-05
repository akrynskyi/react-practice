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
  flex-direction: column;
`;

export const Label = styled.p`
  font-size: 12px;
  margin-top: 8px;
  color: #717171;
`;