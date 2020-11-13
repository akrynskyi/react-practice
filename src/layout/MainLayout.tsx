import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@material-ui/core';

export const MainLayout: React.FC = ({children}) => {
  const location = useLocation();
  const gridPage = location.pathname.includes('grid');

  return (
    <Container maxWidth={gridPage ? 'lg' : 'md'}>
      <CssBaseline />
      <Box my={10} paddingLeft="55px">
        {children}
      </Box>
    </Container>
  );
};