import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ICellRendererParams } from 'ag-grid-community';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';

import { selectDataId, selectUndoAction } from '../../store';
import { deleteOneUser } from '../../store/actions/usersActions';
import { showNotification } from '../../store/actions/notificationActions';

const useStyles = makeStyles((theme) => ({
  btn: {
    marginRight: theme.spacing(4)
  },
  default: {
    color: '#fff'
  },
  highlighted: {
    color: '#ffea00'
  },
  icon: {
    minWidth: 35
  }
}));

const MenuComponent = ({ value, data, api }: ICellRendererParams) => {
  const { id } = data;
  const cls = useStyles();
  const dispatch = useDispatch();
  const dataId = useSelector(selectDataId);
  const undoAction = useSelector(selectUndoAction);

  const [highlight, setHighlight] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const onHighlight = () => {
    setHighlight(true);
    dispatch(showNotification({
      id,
      text: `You highlighted ${value}`,
    }));
    closeMenu();
  };

  const onDeleteUser = () => {
    dispatch(deleteOneUser(id));
    closeMenu();
  };

  const getPinnedTopRowId = () => {
    const pinnedTopRow = api.getPinnedTopRow(0);
    return pinnedTopRow ? pinnedTopRow.data.id : null;
  };

  const onTopRowPinned = () => {
    closeMenu();
    const selectedRows = api.getSelectedRows();
    const pinnedTopRowId = getPinnedTopRowId();

    if (id === pinnedTopRowId) {
      api.setPinnedTopRowData([]);
      return;
    }

    api.setPinnedTopRowData(selectedRows);
  };

  useEffect(() => {
    if (undoAction && (dataId === id)) {
      setHighlight(false);
    }
  }, [undoAction, dataId, id]);

  return (
    <>
      <IconButton
        size="small"
        onClick={openMenu}
        className={cls.btn}
      >
        <span className="material-icons">more_vert</span>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={closeMenu}
      >
        <MenuItem
          onClick={onHighlight}
          disabled={highlight}
        >
          <ListItemIcon className={cls.icon}>
            <span className="material-icons">flag</span>
          </ListItemIcon>
          <ListItemText primary="Highlight"/>
        </MenuItem>
        <MenuItem
          onClick={onDeleteUser}
        >
          <ListItemIcon className={cls.icon}>
            <span className="material-icons">delete</span>
          </ListItemIcon>
          <ListItemText primary="Delete"/>
        </MenuItem>
        <MenuItem
          onClick={onTopRowPinned}
        >
          <ListItemIcon className={cls.icon}>
            <span className="material-icons">push_pin</span>
          </ListItemIcon>
          <ListItemText
            primary={id !== getPinnedTopRowId() ? 'Pin row' : 'Unpin row'}
          />
        </MenuItem>
      </Menu>
      <span className={highlight ? cls.highlighted : cls.default}>
        {value}
      </span>
    </>
  );
};

export default MenuComponent;