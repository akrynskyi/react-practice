import React from 'react';
import './todo-list.css';

export const TodoList = () => {
  return (
    <ul className="collection">
      <li className="collection-item item">
        <span>Apple</span>
        <div>
          <button className="secondary-content btn-icon">
            <i className="material-icons">delete_outline</i>
          </button>
          <button className="secondary-content btn-icon">
            <i className="material-icons">priority_high</i>
          </button>
        </div>
      </li>
    </ul>
  )
}