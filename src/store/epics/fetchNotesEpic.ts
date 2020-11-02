import { Epic, ofType } from "redux-observable";
import { mergeMap, map, catchError } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { of } from "rxjs";

import { fetchNotesSuccess, fetchNotesFailure, NotesActionTypes, NotesActions } from "../actions/notesActions";
import { Note } from "../reducers/notesReducer";

export const fetchNotesEpic: Epic<NotesActions> = (action$) =>
  action$.pipe(
    ofType(NotesActionTypes.fetchNotes),
    mergeMap(() => 
      ajax.getJSON<Note[]>('https://jsonplaceholder.typicode.com/posts').pipe(
        map((resp) => fetchNotesSuccess(resp)),
        catchError((error) => of(fetchNotesFailure(error)))
      )
    )
  );