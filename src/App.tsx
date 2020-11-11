import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';
import { Box, Container, CssBaseline, } from '@material-ui/core';

import { DrawerNav } from './components/DrawerNav';
import { Notification } from './components/Notification';
import { LoadingFallback } from './components/LoadingFallback';
const NotesPage = React.lazy(() => import('./pages/NotesPage'));
const GridPage = React.lazy(() => import('./pages/GridPage'));

function App() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box my={10}>
          <Route path="/" exact>
            <NotesPage />
          </Route>

          <Route path="/grid">
            <GridPage />
          </Route>
        </Box>
        <DrawerNav />
        <Notification />
      </Container>
    </Suspense>
  );
}

export default App;
