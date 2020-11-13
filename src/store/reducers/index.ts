import { combineReducers } from 'redux';

import { notesReducer, NotesState } from './notesReducer';
import { notificationReducer, NotificationState } from './notificationReducer';
import { usersReducer, UsersState } from './usersReducer';

export interface AppState {
  notes: NotesState,
  notification: NotificationState,
  users: UsersState
}

const reducers = combineReducers({
  notes: notesReducer,
  notification: notificationReducer,
  users: usersReducer,
});

export default reducers;