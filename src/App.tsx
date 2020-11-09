import React from 'react';
import { Box, Container, CssBaseline, } from '@material-ui/core';
import { DrawerNav } from './components/DrawerNav';
import { Route } from 'react-router-dom';
import { NotesPage } from './pages/NotesPage';
import { TablePage } from './pages/TablePage';
import { Notification } from './components/Notification';

function App() {
  return (
    <>
      <CssBaseline />
      <Notification />
      <Container maxWidth="md">
        <DrawerNav />
        <Box my={10}>
          <Route path="/" component={NotesPage} exact />
          <Route path="/table" component={TablePage} />
        </Box>
      </Container>
    </>
  );
}

export default App;
