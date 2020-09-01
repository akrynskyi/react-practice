import React from 'react';
import './app-header.css';

import TodoItemsFilter from '../todo-items-filter';

export const AppHeader = ({todosTotal, completeTotal, onFilter, onSearch}) => {
  return (
    <>
      <div className="row-wrap">
        <h4>
          <span>Tasks</span>
          <span 
            className="new badge orange darken-1" 
            data-badge-caption="to do"
          >{todosTotal - completeTotal}</span>
          <span 
            className="new badge green darken-1" 
            data-badge-caption="complete"
          >{completeTotal}</span>
        </h4>
        <TodoItemsFilter 
          filterItems={onFilter} 
          searchItems={onSearch}
        />
      </div>
      <div className="divider"></div>
    </>
  )
}