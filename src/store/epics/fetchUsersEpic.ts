import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import ActionTypes from '../actions';
import { AppState } from '../reducers';
import DataService from '../../services/DataService';
import { fetchUsers, updateUser, userUpdated } from '../actions/usersActions';

const fetchUsersEpic: Epic<ActionTypes, ActionTypes, AppState, DataService> = (
  action$, store$, api) =>
  action$.pipe(
    filter(isActionOf(fetchUsers.request)),
    switchMap(() =>
      api.fetchAllUsers().pipe(
        map(fetchUsers.success),
        catchError(({ message }) => of(fetchUsers.failure(message)))
      )
    )
  );

const updateUserEpic: Epic<ActionTypes, ActionTypes, AppState, DataService> = (
  action$, store$, api) =>
  action$.pipe(
    filter(isActionOf(updateUser)),
    switchMap((action) =>
      api.updateUser(action.payload).pipe(
        map(() => userUpdated())
      )
    )
  );

const epicsMap = [fetchUsersEpic, updateUserEpic];

export default epicsMap;