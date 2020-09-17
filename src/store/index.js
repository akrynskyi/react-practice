import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { counterReducer } from './counter/counterReducer';
import { todosReducer } from './todos/todosReducer';

const reducers = combineReducers({
  counter: counterReducer,
  todos: todosReducer
});

export const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);