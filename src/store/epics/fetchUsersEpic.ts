import { of } from 'rxjs';
import { Epic } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import { filter, switchMap, map, catchError } from 'rxjs/operators';

import ActionTypes from '../actions';
import { AppState } from '../reducers';
import { User } from '../reducers/usersReducer';
import DataService from '../../services/DataService';
import { fetchUsers } from '../actions/usersActions';

export const fetchUsersEpic: Epic<ActionTypes, ActionTypes, AppState, DataService> = (
  action$, store$, api) =>
  action$.pipe(
    filter(isActionOf(fetchUsers.request)),
    switchMap(() =>
      api.fetchMockData<User[]>().pipe(
        map(fetchUsers.success),
        catchError(({ message }) => of(fetchUsers.failure(message)))
      )
    )
  );