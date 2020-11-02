import { Action } from "redux";
import { Note } from "../reducers/notesReducer";

export enum NotesActionTypes {
  createNote = '[NOTES] Create note',
  fetchNotes = '[NOTES] Fetch notes',
  fetchNotesSuccess = '[NOTES] Fetch notes success',
  fetchNotesFailure = '[NOTES] Fetch notes failure',
};

interface CreateNoteAction extends Action {
  payload: Note,
};

interface FetchNotes extends Action {
  payload: null
}

interface FetchNotesSuccess extends Action {
  payload: Note[],
};

interface FetchNotesFailure extends Action {
  payload: any
}

export const createNote = (payload: Note) => ({ type: NotesActionTypes.createNote, payload });
export const fetchNotes = () => ({ type: NotesActionTypes.fetchNotes });
export const fetchNotesSuccess = (payload: Note[]) => ({ type: NotesActionTypes.fetchNotesSuccess, payload });
export const fetchNotesFailure = (payload: any) => ({ type: NotesActionTypes.fetchNotesFailure, payload });

export type NotesActions = CreateNoteAction
  | FetchNotes
  | FetchNotesSuccess 
  | FetchNotesFailure;