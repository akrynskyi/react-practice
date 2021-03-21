import { NotificationActions, NotificationActionTypes } from '../actions/notificationActions';

export interface NotificationState {
  undo: boolean,
  visible: boolean,
  message: string | null,
  dataId?: number | string,
  displayUndoButton: boolean,
  type: 'success' | 'info' | 'error' | undefined
}

const initialState: NotificationState = {
  undo: false,
  visible: false,
  message: null,
  displayUndoButton: false,
  type: undefined,
};

export const notificationReducer = (
  state = initialState,
  action: NotificationActions) => {
  switch(action.type) {
    case NotificationActionTypes.showNotification:
      return {
        undo: false,
        visible: true,
        message: action.payload.text,
        dataId: action.payload.id,
        type: action.payload.type || undefined,
        displayUndoButton: action.payload.displayUndoButton || false,
      };

    case NotificationActionTypes.hideNotification:
      return {
        ...state,
        visible: false,
      };

    case NotificationActionTypes.undoAction:
      return {
        ...state,
        undo: true,
        visible: false,
      };

    default:
      return state;
  }
};