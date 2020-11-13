import React, { useEffect, useState } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../../store/actions/notificationActions';
import { selectDataId, selectUndoAction } from '../../store';
import { deleteOneUser } from '../../store/actions/usersActions';

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

const HighlightField = ({ value, data }: ICellRendererParams) => {
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

  const onDelete = () => {
    dispatch(deleteOneUser(id));
    closeMenu();
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
        className={cls.btn}
        onClick={openMenu}
      >
        <span className="material-icons">more_vert</span>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={closeMenu}
      >
        <MenuItem onClick={onHighlight} disabled={highlight}>
          <ListItemIcon className={cls.icon}>
            <span className="material-icons">flag</span>
          </ListItemIcon>
          <ListItemText primary="Highlight"/>
        </MenuItem>
        <MenuItem onClick={onDelete}>
          <ListItemIcon className={cls.icon}>
            <span className="material-icons">delete</span>
          </ListItemIcon>
          <ListItemText primary="Delete"/>
        </MenuItem>
      </Menu>

      <span className={highlight ? cls.highlighted : cls.default}>
        {value}
      </span>
    </>
  );
};

export default HighlightField;