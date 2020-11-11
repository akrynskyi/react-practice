import { Note } from "../reducers/notesReducer";

export enum NotesActionTypes {
  createNote = '[NOTES] Create note',
  fetchNotes = '[NOTES] Fetch notes',
  fetchNotesSuccess = '[NOTES] Fetch notes success',
  fetchNotesFailure = '[NOTES] Fetch notes failure',
}

interface CreateNote {
  type: NotesActionTypes.createNote,
  payload: Note,
}

interface FetchNotes {
  type: NotesActionTypes.fetchNotes,
}

interface FetchNotesSuccess {
  type: NotesActionTypes.fetchNotesSuccess,
  payload: Note[],
}

interface FetchNotesFailure {
  type: NotesActionTypes.fetchNotesFailure,
  payload: any
}

export const createNote = (payload: Note): CreateNote => ({
  type: NotesActionTypes.createNote,
  payload
});

export const fetchNotes = (): FetchNotes => ({
  type: NotesActionTypes.fetchNotes
});

export const fetchNotesSuccess = (payload: Note[]): FetchNotesSuccess => ({
  type: NotesActionTypes.fetchNotesSuccess,
  payload
});

export const fetchNotesFailure = (payload: any): FetchNotesFailure => ({
  type: NotesActionTypes.fetchNotesFailure,
  payload
});

export type NotesActions = CreateNote
  | FetchNotes
  | FetchNotesSuccess 
  | FetchNotesFailure;