import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { notesReducer, NotesState } from './reducers/notesReducer';
import { fetchNotesEpic } from './epics/fetchNotesEpic';
import { NotesActions } from './actions/notesActions';

export interface AppState {
  notes: NotesState
}

const epicMiddleware = createEpicMiddleware<NotesActions>();

const reducers = combineReducers({
  notes: notesReducer
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

export const selectNotes = (state: AppState) => state.notes.notes;