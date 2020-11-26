import { combineEpics } from 'redux-observable';
import { fetchNotesEpic } from './fetchNotesEpic';
import userEpics from './userEpics';

const epics = combineEpics(
  fetchNotesEpic,
  ...userEpics
);

export default epics;