import React, { Component } from 'react';
import './App.css';

import AppHeader from './components/app-header';
import TodoList from './components/todo-list';
import AddTodo from './components/add-todo';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  render() {
    return (
      <div className="container">
        <AppHeader />
        <TodoList />
        <AddTodo />
      </div>
    );
  }
}

export default App;
