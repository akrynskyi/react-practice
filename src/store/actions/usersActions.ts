import { createAsyncAction, createAction, ActionType } from 'typesafe-actions';
import { User } from '../reducers/usersReducer';

enum UserActionTypes {
  fetchUsersRequest = '@@users/fetch',
  fetchUsersSuccess = '@@users/success',
  fetchUsersFailure = '@@users/failure',

  deleteOneUser = '@@users/delete-one',
  deleteManyUsers = '@@users/delete-many',

  updateUserRequest = '@@users/update/request',
  updateUserSuccess = '@@users/update/success',
  updateUserFailure = '@@users/update/failure',

  updateManyUsersRequest = '@@users/update-many/request',
  updateManyUsersSuccess = '@@users/update-many/success',
  updateManyUsersFailure = '@@users/update-many/failure',

  manualUserUpdate = '@@users/update/manual',
  toggleAutosaveUsers = '@@users/autosave',
}

export const fetchUsers = createAsyncAction(
  UserActionTypes.fetchUsersRequest,
  UserActionTypes.fetchUsersSuccess,
  UserActionTypes.fetchUsersFailure
)<undefined, User[], any>();

export const updateUser = createAsyncAction(
  UserActionTypes.updateUserRequest,
  UserActionTypes.updateUserSuccess,
  UserActionTypes.updateUserFailure,
)<User, undefined, any>();

export const updateManyUsers = createAsyncAction(
  UserActionTypes.updateManyUsersRequest,
  UserActionTypes.updateManyUsersSuccess,
  UserActionTypes.updateManyUsersFailure
)<undefined, undefined, any>();

export const deleteOneUser = createAction(
  UserActionTypes.deleteOneUser,
  (id: string) => id
)<string>();

export const deleteManyUsers = createAction(
  UserActionTypes.deleteManyUsers,
  (ids: Array<number | string>) => ids
)<Array<number | string>>();

export const manualUserUpdate = createAction(
  UserActionTypes.manualUserUpdate,
  (user: User) => user
)<User>();

export const toggleAutosaveUsers = createAction(UserActionTypes.toggleAutosaveUsers)();

export type UsersActions = ActionType<typeof fetchUsers
  | typeof deleteOneUser
  | typeof deleteManyUsers
  | typeof updateUser
  | typeof manualUserUpdate
  | typeof toggleAutosaveUsers
  | typeof updateManyUsers>;