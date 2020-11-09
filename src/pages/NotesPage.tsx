import React, { useEffect } from 'react';
import { Paper, Typography } from '@material-ui/core';
import { NotesList } from '../components/NotesList';
import { CreateNote } from '../components/CreateNote';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes } from '../store/actions/notesActions';
import { selectNotes } from '../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(8, 8, 0),
    },
  })
);

export const NotesPage: React.FC = () => {
  const cls = useStyles();
  const dispatch = useDispatch();
  const notes = useSelector(selectNotes);

  useEffect(() => {
    if (notes.length) return;
    dispatch(fetchNotes());
  }, [dispatch, notes]);

  return (
    <Paper>
      <Typography
        gutterBottom
        className={cls.text}
      >
        Your notes
      </Typography>
      <NotesList />
      <CreateNote />
    </Paper>
  );
};