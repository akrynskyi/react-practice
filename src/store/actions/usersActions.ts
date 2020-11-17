import { createAsyncAction, createAction, ActionType } from 'typesafe-actions';
import { User } from '../reducers/usersReducer';

enum UserActionTypes {
  fetchUsersRequest = '@@users/fetch',
  fetchUsersSuccess = '@@users/success',
  fetchUsersFailure = '@@users/failure',

  deleteOneUser = '@@users/delete-one',
  deleteManyUsers = '@@users/delete-many',
}

export const fetchUsers = createAsyncAction(
  UserActionTypes.fetchUsersRequest,
  UserActionTypes.fetchUsersSuccess,
  UserActionTypes.fetchUsersFailure
)<undefined, User[], any>();

export const deleteOneUser = createAction(
  UserActionTypes.deleteOneUser,
  (id: string) => id
)<string>();

export const deleteManyUsers = createAction(
  UserActionTypes.deleteManyUsers,
  (ids: Array<number | string>) => ids
)<Array<number | string>>();

export type UsersActions = ActionType<typeof fetchUsers
  | typeof deleteOneUser
  | typeof deleteManyUsers>;