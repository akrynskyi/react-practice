import React from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Switch,
} from '@material-ui/core';
import { GridApi } from 'ag-grid-community';
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

interface GridSettingsProps {
  gridApi: GridApi | null,
  quickSearchPanelVisible: boolean,
  toggleQuickSearchPanel: () => void,
  setPageSize: React.Dispatch<React.SetStateAction<number>>,
  pageSize: number,
}

const GridSettings: React.FC<GridSettingsProps> = (props) => {
  const {
    gridApi,
    toggleQuickSearchPanel,
    quickSearchPanelVisible,
    pageSize,
    setPageSize,
  } = props;
  const cls = useStyles();
  const dispatch = useDispatch();
  const autosave = useSelector(autosaveSelector);

  const toggleAutosave = () => dispatch(toggleAutosaveUsers());

  const onPageSizeChanged = ({ target }: React.ChangeEvent<{ value: unknown }>) => {
    const pageSize = Number(target.value);
    setPageSize(pageSize);
    gridApi?.paginationSetPageSize(pageSize);
  };

  return (
    <Paper className={cls.paper}>
      <List>
        <ListItem>
          <ListItemText primary="Page size"/>
          <ListItemSecondaryAction>
            <Select
              displayEmpty
              value={pageSize}
              className={cls.select}
              onChange={onPageSizeChanged}
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
            <Switch
              checked={quickSearchPanelVisible}
              onChange={toggleQuickSearchPanel}
            />
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

export default React.memo(GridSettings);