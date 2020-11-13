import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

import epics from './epics';
import reducers, { AppState } from './reducers';
import ActionTypes from './actions';
import DataService from '../services/DataService';

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
export const selectNotes = ({ notes }: AppState) => notes.notes;
export const selectNotesLoading = ({ notes }: AppState) => notes.loading;

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
export const selectUsers = ({ users }: AppState) => users.users;
