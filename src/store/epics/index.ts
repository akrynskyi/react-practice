import { combineEpics } from 'redux-observable';
import { fetchNotesEpic } from './fetchNotesEpic';
import { fetchUsersEpic } from './fetchUsersEpic';

const epics = combineEpics(
  fetchNotesEpic,
  fetchUsersEpic
);

export default epics;