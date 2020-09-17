import * as todosActionTypes from './todosActionTypes';

const initialState = {
  todos: [],
  loading: false,
  error: null
};

const completeTodo = (todos, id) => {
  return todos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo);
};

const deleteTodo = (todos, id) => todos.filter((todo) => todo.id !== id);

export const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case todosActionTypes.TODOS_LOAD:
      return {
        ...state,
        loading: true
      };

    case todosActionTypes.TODOS_LOADED:
      return {
        ...state,
        todos: action.payload,
        loading: false
      };
    
    case todosActionTypes.TODOS_LOAD_FAILURE:
      return {
        todos: [],
        loading: false,
        error: action.payload
      };

    case todosActionTypes.TODOS_ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };

    case todosActionTypes.TODOS_COMPLETE_TODO:
      return {
        ...state,
        todos: completeTodo(state.todos, action.payload)
      };

    case todosActionTypes.TODOS_DELETE_TODO:
      return {
        ...state,
        todos: deleteTodo(state.todos, action.payload)
      };

    default:
      return state;
  }
};