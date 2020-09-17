import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as todosActions from '../store/todos/todosActions';

import { Todo } from './Todo';
import { Loader } from './Loader';

const Todos = ({ todos, loading, todosRequest, todosAddTodo, todosCompleteTodo, todosDeleteTodo }) => {
  const [todoTitle, setTodoTitle] = useState('');

  useEffect(() => {
    todosRequest();
  }, [todosRequest]);

  const addNewTodo = () => {
    if (!todoTitle.trim()) return;
    todosAddTodo({
      id: Date.now(),
      title: todoTitle.trim(),
      completed: false
    });
    setTodoTitle('');
  };

  return (
    <div className="card mt-4">
      <div className="card-header">
        <h5>Todos</h5>
      </div>
      {
        loading
        ? <Loader />
        : <div className="list-group list-group-flush">
            {
              todos.length
              ? todos.map(({id, ...todo}) => (
                  <Todo 
                    key={id} 
                    {...todo}
                    completeTodoToggle={() => todosCompleteTodo(id)}
                    deleteTodo={() => todosDeleteTodo(id)}
                  />
                ))
              : <p className="text-center p-4 m-0">Your todo list is empty...</p>
            }
          </div>
      }
      <div className="card-footer">
        <div className="input-group">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Add todo"
            onChange={({target: { value }}) => setTodoTitle(value)}
            value={todoTitle}
            onKeyDown={({key}) => key === 'Enter' ? addNewTodo() : null}
          />
          <div className="input-group-append">
            <button 
              className="btn btn-outline-primary"
              onClick={addNewTodo}
            >Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({...state.todos});

export default connect(mapStateToProps, todosActions)(Todos);