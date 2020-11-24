import { combineEpics } from 'redux-observable';
import { fetchNotesEpic } from './fetchNotesEpic';
import userEpics from './fetchUsersEpic';

const epics = combineEpics(
  fetchNotesEpic,
  ...userEpics
);

export default epics;