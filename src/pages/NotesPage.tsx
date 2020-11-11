import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { selectNotes, selectNotesLoading } from '../store';
import { fetchNotes } from '../store/actions/notesActions';
import { NotesList } from '../components/NotesList';
import { PageTitle } from '../components/PageTitle';

const useStyles = makeStyles({
  contentCentered: {
    display: 'flex',
    justifyContent: 'center',
  }
});

const NotesPage: React.FC = () => {
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);
  const loading = useSelector(selectNotesLoading);
  const cls = useStyles();

  useEffect(() => {
    if (notes.length) return;
    dispatch(fetchNotes());
  }, [dispatch, notes]);

  return (
    <Paper>
      <PageTitle>Your notes</PageTitle>
      {
        loading
          ? (
              <Box
                py={25}
                className={cls.contentCentered}
              >
                <CircularProgress />
              </Box>
            )
          : notes.length
          ? <NotesList />
          : (
              <Typography align="center">
                You have no notes yet...
              </Typography>
            )
      }
    </Paper>
  );
};

export default NotesPage;