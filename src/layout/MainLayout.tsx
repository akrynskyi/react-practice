import React from 'react';
import { Box, Container, CssBaseline } from '@material-ui/core';

export const MainLayout: React.FC = ({children}) => {
  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Box my={10}>
        {children}
      </Box>
    </Container>
  );
};