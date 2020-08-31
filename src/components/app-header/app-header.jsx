import React from 'react';
import './app-header.css';

export const AppHeader = ({todosTotal}) => {
  return (
    <>
      <div className="row-wrap">
        <h4>
          <span>Tasks</span>
          <span 
            className="new badge orange darken-1" 
            data-badge-caption="to do"
          >{todosTotal}</span>
        </h4>
        <div>
          <button className="waves-effect waves-light btn light-blue lighten-1">
            All
          </button>
          <button className="waves-effect waves-light btn light-blue lighten-1">
            Complete
          </button>
          <button className="waves-effect waves-light btn light-blue lighten-1">
            Important
          </button>
          <div className="fixed-action-btn">
            <button className="btn-floating btn-large light-blue lighten-1">
              <i className="large material-icons">search</i>
            </button>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </>
  )
}