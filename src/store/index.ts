import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { notesReducer, NotesState } from './reducers/notesReducer';
import { fetchNotesEpic } from './epics/fetchNotesEpic';
import { NotesActions } from './actions/notesActions';
import { notificationReducer, NotificationState } from './reducers/notificationReducer';

export interface AppState {
  notes: NotesState,
  notification: NotificationState
}

const epicMiddleware = createEpicMiddleware<NotesActions>();

const reducers = combineReducers({
  notes: notesReducer,
  notification: notificationReducer,
});

const epics = combineEpics(
  fetchNotesEpic
);

export const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(epicMiddleware)
  )
);

epicMiddleware.run(epics);

export const selectNotes = ({ notes }: AppState) => notes.notes;
export const selectNotificationVisible = ({ notification }: AppState) => notification.visible;
export const selectNotificationMessage = ({ notification }: AppState) => notification.message;
export const selectUndoAction = ({ notification }: AppState) => notification.undo;
export const selectDataId = ({ notification }: AppState) => notification.dataId;