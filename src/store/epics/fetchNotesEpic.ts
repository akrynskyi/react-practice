import { Epic, ofType } from "redux-observable";
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from "rxjs";

import { Note } from '../reducers/notesReducer';
import { AppState } from '../reducers';
import ActionTypes from '../actions';
import DataService from '../../services/DataService';
import { fetchNotesFailure, fetchNotesSuccess, NotesActionTypes } from "../actions/notesActions";

export const fetchNotesEpic: Epic<ActionTypes, ActionTypes, AppState, DataService> = (
  action$, store$, api) =>
  action$.pipe(
    ofType(NotesActionTypes.fetchNotes),
    mergeMap(() =>
      api.fetchData<Note[]>('posts').pipe(
        map((resp) => fetchNotesSuccess(resp)),
        catchError((error) => of(fetchNotesFailure(error)))
      )
    )
  );