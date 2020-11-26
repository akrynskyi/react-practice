import { createReducer } from 'typesafe-actions';
import {
  deleteManyUsers,
  deleteOneUser,
  fetchUsers,
  manualUserUpdate, toggleAutosaveUsers, updateManyUsers,
  updateUser,
  UsersActions
} from '../actions/usersActions';

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
  },
}

export interface UsersState {
  users: User[],
  usersToUpdate: User[],
  error: any,
  autosave: boolean,
}

const initialState: UsersState = {
  users: [],
  usersToUpdate: [],
  error: null,
  autosave: true,
};

const removeItemFromArray = <T extends Array<any>>(
  arr: T, id: string | number) => arr.filter(item => item.id !== id);

const removeManyItemsFromArray = (
  array: Array<any>, ids: Array<number | string>) => array.filter((item) => !ids.includes(item.id));

const updateItemInArray = <TArray extends Array<TItem>, TItem extends User>(
  array: TArray, item: TItem) => array.map((obj) => obj.id !== item.id ? obj : item)

export const usersReducer = createReducer<UsersState, UsersActions>(initialState)
  .handleAction(fetchUsers.success, (state, action) => ({
    ...state,
    users: action.payload
  }))
  .handleAction(fetchUsers.failure, (state, action) => ({
    ...state,
    users: [],
    error: action.payload
  }))
  .handleAction(deleteOneUser, (state, action) => ({
    ...state,
    users: removeItemFromArray<User[]>(state.users, action.payload)
  }))
  .handleAction(deleteManyUsers, (state, action) => ({
    ...state,
    users: removeManyItemsFromArray(state.users, action.payload)
  }))
  .handleAction(updateUser.request, (state, action) => ({
    ...state,
    users: updateItemInArray<User[], User>(state.users, action.payload)
  }))
  .handleAction(updateUser.failure, (state, action) => ({
    ...state,
    error: action.payload
  }))
  .handleAction(manualUserUpdate, (state, action) => ({
    ...state,
    usersToUpdate: [...state.usersToUpdate, action.payload]
  }))
  .handleAction(toggleAutosaveUsers, (state) => ({
    ...state,
    autosave: !state.autosave,
  }))
  .handleAction(updateManyUsers.success, (state) => ({
    ...state,
    usersToUpdate: [],
  }))
  .handleAction(updateManyUsers.failure, (state, action) => ({
    ...state,
    error: action.payload
  }))