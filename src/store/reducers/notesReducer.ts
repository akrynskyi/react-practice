import { NotesActionTypes, NotesActions } from "../actions/notesActions";

export interface Note {
  id?: string | number,
  title: string,
  body: string,
  date?: number
}

export interface NotesState {
  loading: false,
  notes: Note[],
  error: any | null,
}

const initialState: NotesState = {
  loading: false,
  notes: [],
  error: null,
};

export const notesReducer = (
  state = initialState,
  action: NotesActions) => {
  switch (action.type) {
    case NotesActionTypes.createNote:
      return {
        ...state,
        notes: [...state.notes, action.payload]
      };

    case NotesActionTypes.fetchNotes:
      return {
        ...state,
        loading: true,
      };

    case NotesActionTypes.fetchNotesSuccess:
      return {
        loading: false,
        notes: action.payload,
        error: null,
      };

    case NotesActionTypes.fetchNotesFailure:
      return {
        loading: false,
        notes: [],
        error: action.payload
      };

    default:
      return state;
  }
};