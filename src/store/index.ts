import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { createSelector } from 'reselect';

import epics from './epics';
import ActionTypes from './actions';
import reducers, { AppState } from './reducers';
import DataService from '../services/DataService';
import { NotesState } from './reducers/notesReducer';
import { UsersState } from './reducers/usersReducer';

const epicMiddleware = createEpicMiddleware<ActionTypes, ActionTypes, AppState>({
  dependencies: new DataService()
});

export const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(epicMiddleware)
  )
);

epicMiddleware.run(epics);

/*
  Notes selectors
 */
const selectNotesState = ({ notes }: AppState) => notes;
const selectNotes = (notes: NotesState) => notes.notes;

export const selectNotesLoading = ({ notes }: AppState) => notes.loading;

export const notesSelector = createSelector(
  selectNotesState,
  selectNotes
);

/*
  Notification selectors
 */
export const selectNotificationVisible = ({ notification }: AppState) => notification.visible;
export const selectNotificationMessage = ({ notification }: AppState) => notification.message;
export const selectUndoAction = ({ notification }: AppState) => notification.undo;
export const selectDataId = ({ notification }: AppState) => notification.dataId;

/*
  Users selectors
 */
const selectUsersState = ({ users }: AppState) => users;
const selectAutosave = (users: UsersState) => users.autosave;

export const selectUsers = ({ users }: AppState) => users.users;

export const autosaveSelector = createSelector(
  selectUsersState,
  selectAutosave
);

export const isUsersToUpdateExistsSelector = createSelector(
  selectUsersState,
  ({ usersToUpdate }) => !!usersToUpdate.length
);
