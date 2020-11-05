import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { NotesList } from '../components/NotesList';
import { CreateNote } from '../components/CreateNote';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      padding: theme.spacing(8, 8, 0),
    },
  })
);

export const NotesPage: React.FC = () => {
  const cls = useStyles();

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