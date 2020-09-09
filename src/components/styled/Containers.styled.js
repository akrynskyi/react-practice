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
  min-height: ${props => props.fullscreen ? 'calc(100vh - 57px)' : 'auto'};
  justify-content: ${props => props.justify ? props.justify : 'flex-start'};
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  grid-gap: 40px;
  margin: 60px 0px;
`;