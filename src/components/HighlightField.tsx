import React, { useEffect, useState } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { showNotification } from '../store/actions/notificationActions';
import { selectDataId, selectUndoAction } from '../store';

const useStyles = makeStyles((theme) => ({
  btn: {
    marginRight: theme.spacing(4)
  }
}));

export const HighlightField = ({ value, data }: ICellRendererParams) => {
  const { id } = data;
  const cls = useStyles();
  const dispatch = useDispatch();
  const dataId = useSelector(selectDataId);
  const undoAction = useSelector(selectUndoAction);
  const [highlight, setHighlight] = useState(false);

  const onHighlight = () => {
    setHighlight(true);
    dispatch(showNotification({
      id,
      text: `You highlighted ${value}`,
    }));
  };

  useEffect(() => {
    if (undoAction && (dataId === id)) {
      setHighlight(false);
    }
  }, [undoAction, dataId]);

  return (
    <>
      <IconButton
        size="small"
        className={cls.btn}
        disabled={highlight}
        onClick={onHighlight}
      >
        <span className="material-icons">
          flag
        </span>
      </IconButton>
      <span
        style={{ color: highlight ? '#ffea00' : '#fff' }}
      >
        {value}
      </span>
    </>
  );
};