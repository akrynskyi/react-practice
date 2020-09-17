import React from 'react';

export const Todo = ({ title, completed, completeTodoToggle, deleteTodo }) => {
  const todoClassNames = completed
    ? 'list-group-item list-group-item-action list-group-item-success' 
    : 'list-group-item list-group-item-action';

  return (
    <button 
      className={todoClassNames}
      onClick={({shiftKey}) => shiftKey ? deleteTodo() : completeTodoToggle()}
    >{title}</button>
  );
};