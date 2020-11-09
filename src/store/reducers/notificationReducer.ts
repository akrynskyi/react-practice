import { NotificationActions, NotificationActionTypes } from '../actions/notificationActions';

export interface NotificationState {
  undo: boolean,
  visible: boolean,
  message: string | null,
  dataId?: number | string,
}

const initialState: NotificationState = {
  undo: false,
  visible: false,
  message: null,
};

export const notificationReducer = (
  state = initialState,
  action: NotificationActions) => {
  switch(action.type) {
    case NotificationActionTypes.showNotification:
      return {
        undo: false,
        visible: true,
        message: typeof action.payload === 'object'
          ? action.payload.text
          : action.payload,
        dataId: typeof action.payload === 'object' && action.payload.id
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