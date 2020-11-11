import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { selectNotes } from '../store';
import { Note } from '../store/reducers/notesReducer';
import {
  Fade,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import { CreateNote } from './CreateNote';

const useStyles = makeStyles({
  list: {
    overflow: 'auto',
    maxHeight: 800,
    padding: 0,
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0, 0, 0, .1)',
      outline: 'none'
    }
  },
  listSection: {
    backgroundColor: '#424242',
  },
});

export const NotesList: React.FC = () => {
  const cls = useStyles();
  const notes = useSelector(selectNotes);

  const renderNotes = ({ id, title, body }: Note) => (
    <Fragment key={id}>
      {id! === 1 && <ListSubheader className={cls.listSection}>Today</ListSubheader>}
      {id! === 20  && <ListSubheader className={cls.listSection}>Yesterday</ListSubheader>}
      <ListItem button>
        <ListItemText
          primary={title}
          secondary={body}
        />
        <ListItemSecondaryAction>
          <Tooltip
            title="More"
            placement="top"
            TransitionComponent={Fade}
          >
            <IconButton 
              edge="end"
              size="small"
              aria-label="more"
            >
              <span className="material-icons">more_vert</span>
            </IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
    </Fragment>
  );

  return (
    <>
      <List className={cls.list}>
        {notes.map(renderNotes)}
      </List>
      <CreateNote />
    </>
  );
};