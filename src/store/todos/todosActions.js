import * as todosActionTypes from './todosActionTypes';

const todosLoad = () => ({ type: todosActionTypes.TODOS_LOAD });
const todosLoaded = (payload) => ({ type: todosActionTypes.TODOS_LOADED, payload });
const todosLoadFailure = (payload) => ({ type: todosActionTypes.TODOS_LOAD_FAILURE, payload });

export const todosAddTodo = (payload) => ({ type: todosActionTypes.TODOS_ADD_TODO, payload });
export const todosCompleteTodo = (payload) => ({ type: todosActionTypes.TODOS_COMPLETE_TODO, payload });
export const todosDeleteTodo = (payload) => ({ type: todosActionTypes.TODOS_DELETE_TODO, payload });

export const todosRequest = () => async (dispatch) => {
  try {
    dispatch(todosLoad());
    const resp = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20');
    const todos = await resp.json();
    dispatch(todosLoaded(todos));
  } catch(err) {
    dispatch(todosLoadFailure(err));
  }
};