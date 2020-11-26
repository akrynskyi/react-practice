import React from 'react';
import {
  List,
  Paper,
  Divider,
  MenuItem,
  ListItem,
  ListItemText,
  Select, Switch,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';

import { autosaveSelector } from '../../store';
import { toggleAutosaveUsers } from '../../store/actions/usersActions';

const useStyles = makeStyles({
  select: {
    '&::before': {
      content: 'none'
    },
    '&::after': {
      content: 'none'
    },
    '& > .MuiSelect-select:focus': {
      background: 'transparent'
    }
  },
  paper: {
    marginBottom: '40px'
  }
});

const GridSettings = () => {
  const cls = useStyles();
  const dispatch = useDispatch();
  const autosave = useSelector(autosaveSelector);

  const toggleAutosave = () => dispatch(toggleAutosaveUsers());

  return (
    <Paper className={cls.paper}>
      <List>
        <ListItem>
          <ListItemText primary="Page size"/>
          <ListItemSecondaryAction>
            <Select
              value={10}
              displayEmpty
              className={cls.select}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </ListItemSecondaryAction>
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Quick search"/>
          <ListItemSecondaryAction>
            <Switch />
          </ListItemSecondaryAction>
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Autosave"/>
          <ListItemSecondaryAction>
            <Switch
              checked={autosave}
              onChange={toggleAutosave}
            />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
  );
};

export default GridSettings;