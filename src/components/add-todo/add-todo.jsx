import React from 'react';
import './add-todo.css';

export const AddTodo = () => {
  return (
    <div className="row panel z-depth-1">
      <div className="input-field">
        <i className="material-icons prefix teal-text text-lighten-2">create</i>
        <input type="text" placeholder="Item name" />
      </div>
      <button className="waves-effect waves-light btn">Add</button>
    </div>
  );
}