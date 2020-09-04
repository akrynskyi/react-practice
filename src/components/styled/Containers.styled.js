import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1280px;
  padding: 0px 20px;
`;

export const FlexContainer = styled(Container)`
  display: flex;
  align-items: center;
  flex-direction: ${props => props.column ? 'column' : 'row'};
  min-height: ${props => props.fullscreen ? 'calc(100vh - 56px)' : 'auto'};
  justify-content: ${props => props.justify ? props.justify : 'flex-start'};
`;