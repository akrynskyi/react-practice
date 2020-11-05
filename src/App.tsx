import React, { useEffect } from 'react';
import { Box, Container, CssBaseline, } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { fetchNotes } from './store/actions/notesActions';
import { DrawerNav } from './components/DrawerNav';
import { Route } from 'react-router-dom';
import { NotesPage } from './pages/NotesPage';
import { TablePage } from './pages/TablePage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
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
