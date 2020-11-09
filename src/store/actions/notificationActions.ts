export enum NotificationActionTypes {
  showNotification = '[NOTIFICATION] Notification visible',
  hideNotification = '[NOTIFICATION] Notification hidden',
  undoAction = '[NOTIFICATION] Undo action',
}

interface NotificationData {
  text: string,
  id?: number | string,
}

interface ShowNotification {
  type: NotificationActionTypes.showNotification,
  payload: string | NotificationData
}

interface HideNotification {
  type: NotificationActionTypes.hideNotification,
}

interface UndoAction {
  type: NotificationActionTypes.undoAction,
}

export const showNotification = (payload: string | NotificationData) => ({
  type: NotificationActionTypes.showNotification,
  payload,
});

export const hideNotification = () => ({
  type: NotificationActionTypes.hideNotification,
});

export const undoAction = () => ({
  type: NotificationActionTypes.undoAction,
});

export type NotificationActions = ShowNotification
  | HideNotification
  | UndoAction;