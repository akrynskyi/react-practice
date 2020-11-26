import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import ActionTypes from '../actions';
import { AppState } from '../reducers';
import DataService from '../../services/DataService';
import { fetchUsers, manualUserUpdate, updateManyUsers, updateUser } from '../actions/usersActions';

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
    filter(isActionOf(updateUser.request)),
    switchMap((action) => {
      const { autosave } = store$.value.users;

      if (autosave) {
        return api.updateUser(action.payload).pipe(
          map(updateUser.success),
          catchError((err) => of(updateUser.failure(err)))
        )
      }

      return of(manualUserUpdate(action.payload));
    })
  );

const updateUsersEpic: Epic<ActionTypes, ActionTypes, AppState, DataService> = (
  action$,store$, api) =>
  action$.pipe(
    filter(isActionOf(updateManyUsers.request)),
    switchMap(() => {
      const { usersToUpdate } = store$.value.users;

      return api.updateManyUsers(usersToUpdate).pipe(
        map(updateManyUsers.success),
        catchError((err) => of(updateManyUsers.failure(err)))
      );
    })
  );

const epicsMap = [fetchUsersEpic, updateUserEpic, updateUsersEpic];

export default epicsMap;