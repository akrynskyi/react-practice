import React from 'react';
import './todo-list.css';

import TodoListItem from '../todo-list-item';

export const TodoList = ({todos}) => {
  return (
    <ul className="collection list">
      {todos.map(todo => {
        const {id, ...todoData} = todo;

        return (
          <li className="collection-item item" key={id}>
            <TodoListItem {...todoData} />
          </li>
        )
      })}
    </ul>
  );
}