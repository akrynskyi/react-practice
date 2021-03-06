import React from 'react';
import './todo-list-item.css';

export const TodoListItem = ({name, complete, important, markImportant, deleteItem}) => {
  const completeClass = complete ? 'complete' : '';
  const importantClass = important ? 'important' : '';

  return (
    <>
      <span 
        className={`${completeClass} ${importantClass}`}
      >{name}</span>
      <div>
        <button 
          className="secondary-content btn-icon"
          onClick={deleteItem}
        >
          <i className="material-icons">delete_outline</i>
        </button>
        <button 
          className="secondary-content btn-icon"
          onClick={markImportant}
        >
          <i className="material-icons">priority_high</i>
        </button>
      </div>
    </>
  )
}