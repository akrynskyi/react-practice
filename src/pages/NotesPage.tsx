import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress, Paper, Typography } from '@material-ui/core';

import { notesSelector, selectNotesLoading } from '../store';
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
  const cls = useStyles();
  const dispatch = useDispatch();
  const notes = useSelector(notesSelector);
  const loading = useSelector(selectNotesLoading);

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