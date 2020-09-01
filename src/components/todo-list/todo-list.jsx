import React from 'react';
import './todo-list.css';

import TodoListItem from '../todo-list-item';

export const TodoList = ({todos, onImportantMark, onCompleteMark, onItemDeleted}) => {

  const onMark = (e, id) => {
    e.stopPropagation(); 
    onImportantMark(id);
  }

  return (
    <>
      {
        todos.length 
        ? <ul className="collection list">
            {todos.map(todo => {
              const {id, ...todoData} = todo;

              return (
                <li 
                  className="collection-item item" 
                  key={id}
                  onClick={() => onCompleteMark(id)}
                >
                  <TodoListItem 
                    {...todoData} 
                    markImportant={(e) => onMark(e, id)}
                    deleteItem={() => onItemDeleted(id)}
                  />
                </li>
              )
            })}
          </ul>
        : <p>No todos...</p>
      }
    </>
  );
}