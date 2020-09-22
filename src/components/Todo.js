import React, { useState } from 'react';

const backdrop = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgb(204, 29, 29, .75)'
};

export const Todo = ({ title, completed, completeTodoToggle, deleteTodo }) => {
  const [shiftKey, setShiftKey] = useState(false);

  const todoClassNames = completed
    ? 'list-group-item list-group-item-action list-group-item-success' 
    : 'list-group-item list-group-item-action';

  const mouseOverHandle = ({target}) => target.focus();
  const mouseLeaveHandle = () => setShiftKey(false);
  const keyDownHandle = ({shiftKey}) => setShiftKey(shiftKey);
  const keyUpHandle = () => setShiftKey(false);

  return (
    <button 
      className={todoClassNames}
      onClick={({shiftKey}) => shiftKey ? deleteTodo() : completeTodoToggle()}
      onKeyUp={keyUpHandle}
      onKeyDown={keyDownHandle}
      onMouseOver={mouseOverHandle}
      onMouseLeave={mouseLeaveHandle}
    >
      {title}
      {shiftKey ? <span style={backdrop}>Delete</span> : null}
    </button>
  );
};