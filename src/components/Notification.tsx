import React from 'react';
import { Button, Slide, Snackbar, SnackbarCloseReason } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotificationMessage, selectNotificationVisible } from '../store';
import { hideNotification, undoAction } from '../store/actions/notificationActions';

export const Notification = () => {
  const dispatch = useDispatch();
  const visible = useSelector(selectNotificationVisible);
  const message = useSelector(selectNotificationMessage);

  const handleClose = (undo = false) => (
    event: React.SyntheticEvent,
    reason?: SnackbarCloseReason) => {
    if (reason === 'clickaway') return;

    if (undo) {
      dispatch(undoAction());
    }

    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={visible}
      message={message}
      autoHideDuration={4000}
      onClose={handleClose()}
      TransitionComponent={Slide}
      action={
        <>
          <Button
            color="primary"
            size="small"
            onClick={handleClose(true)}
          >
            UNDO
          </Button>
          <Button
            color="secondary"
            size="small"
            onClick={handleClose()}
          >
            CLOSE
          </Button>
        </>
      }
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    />
  );
};