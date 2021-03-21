export enum NotificationActionTypes {
  showNotification = '[NOTIFICATION] Notification visible',
  hideNotification = '[NOTIFICATION] Notification hidden',
  undoAction = '[NOTIFICATION] Undo action',
}

interface NotificationOptions {
  text: string,
  id?: number | string,
  displayUndoButton?: boolean,
  type?: 'success' | 'info' | 'error'
}

interface ShowNotification {
  type: NotificationActionTypes.showNotification,
  payload: NotificationOptions
}

interface HideNotification {
  type: NotificationActionTypes.hideNotification,
}

interface UndoAction {
  type: NotificationActionTypes.undoAction,
}

export const showNotification = (payload: NotificationOptions) => ({
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