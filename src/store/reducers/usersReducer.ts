import { createReducer } from 'typesafe-actions';
import { deleteManyUsers, deleteOneUser, fetchUsers, UsersActions } from '../actions/usersActions';

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
  error: any
}

const initialState: UsersState = {
  users: [],
  error: null
};

const removeItemFromArray = <T extends Array<any>>(
  arr: T, id: string | number) => arr.filter(item => item.id !== id);

const removeManyItemsFromArray = (
  array: Array<any>, ids: Array<number | string>) => array.filter((item) => !ids.includes(item.id));

export const usersReducer = createReducer<UsersState, UsersActions>(initialState)
  .handleAction(fetchUsers.success, (state, action) => ({
    ...state,
    users: action.payload
  }))
  .handleAction(fetchUsers.failure, (state, action) => ({
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