import { createAsyncAction, createAction, ActionType } from 'typesafe-actions';
import { User } from '../reducers/usersReducer';

// Todo implement multi user deletion
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

export type UsersActions = ActionType<typeof fetchUsers | typeof deleteOneUser>;