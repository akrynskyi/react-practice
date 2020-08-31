import React, { Component } from 'react';
import './App.css';

import AppHeader from './components/app-header';
import TodoList from './components/todo-list';
import AddTodo from './components/add-todo';

class App extends Component {

  constructor() {
    super();

    this.state = {
      todos: [
        {id: 1, name: 'Watch video', complete: true, important: false},
        {id: 2, name: 'Have a breakfast', complete: false, important: true},
      ]
    };
  }

  addItem = (item) => {
    this.setState(({todos}) => ({ todos: [...todos, item] }));
  }

  render() {
    return (
      <div className="container view">
        <AppHeader 
          todosTotal={this.state.todos.length}
        />
        <TodoList 
          todos={this.state.todos} 
        />
        <AddTodo 
          onItemAdded={this.addItem}
        />
      </div>
    );
  }
}

export default App;
