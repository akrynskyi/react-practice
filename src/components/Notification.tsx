import React from 'react';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import { Button, IconButton, Slide, Snackbar, SnackbarCloseReason } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { selectDisplayUndoButton, selectNotificationMessage, selectNotificationVisible, selectType } from '../store';
import { hideNotification, undoAction } from '../store/actions/notificationActions';

interface NotificationActionProps {
  handleClose: (undo?: boolean) => any,
  undoButtonVisible: boolean,
}

const NotificationAction: React.FC<NotificationActionProps> = (
  { handleClose, undoButtonVisible }) => {
  return (
    <>
      {
        undoButtonVisible && (
          <Button
            size="small"
            color="inherit"
            onClick={handleClose(true)}
          >
            UNDO
          </Button>
        )
      }
      <IconButton
        size="small"
        color="inherit"
        onClick={handleClose()}
      >
        <CloseIcon fontSize="small"/>
      </IconButton>
    </>
  );
};

export const Notification = () => {
  const dispatch = useDispatch();
  const type = useSelector(selectType);
  const visible = useSelector(selectNotificationVisible);
  const message = useSelector(selectNotificationMessage);
  const undoButtonVisible = useSelector(selectDisplayUndoButton);

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
      autoHideDuration={4000}
      onClose={handleClose()}
      TransitionComponent={Slide}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        variant="filled"
        severity={type}
        onClose={handleClose()}
        action={<NotificationAction handleClose={handleClose} undoButtonVisible={undoButtonVisible} />}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};