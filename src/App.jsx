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
      ],
      filterOption: 'ALL',
      searchString: null
    };
  }

  calcCompletedTodos() {
    return this.state.todos.reduce((total, todo) => (todo.complete ? total + 1 : total), 0);
  }

  toggleProp(todos, id, propName) {
    const item = todos.find(item => item.id === id);

    return {
      todos: todos.map(it => it.id === id ? {...item, [propName]: !item[propName]} : it)
    };
  }

  addItem = (item) => {
    this.setState(({todos}) => ({ todos: [...todos, item] }));
  }

  markAsImportant = (id) => {
    this.setState(({todos}) => this.toggleProp(todos, id, 'important'));
  }

  markAsDone = (id) => {
    this.setState(({todos}) => this.toggleProp(todos, id, 'complete'));
  }

  deleteItem = (id) => {
    this.setState(({todos}) => ({ todos: todos.filter(item => item.id !== id) }));
  }

  setFilterOption = (filterOption) => this.setState({ filterOption });

  setSearchString = (searchString) => this.setState({ searchString, filterOption: 'SEARCH' });

  filterTodos(todos, option, searchStr) {
    if (option === 'IMPORTANT') {
      return todos.filter(todo => todo.important);
    }

    if (option === 'COMPLETE') {
      return todos.filter(todo => todo.complete);
    }

    if (option === 'SEARCH') {
      return todos.filter(todo => todo.name.toLowerCase().includes(searchStr.toLowerCase()));
    }

    return todos;
  }

  render() {
    return (
      <div className="container view">
        <AppHeader 
          todosTotal={this.state.todos.length}
          completeTotal={this.calcCompletedTodos()}
          onFilter={this.setFilterOption}
          onSearch={this.setSearchString}
        />
        <TodoList 
          todos={this.filterTodos(this.state.todos, this.state.filterOption, this.state.searchString)}
          onImportantMark={this.markAsImportant}
          onCompleteMark={this.markAsDone}
          onItemDeleted={this.deleteItem}
        />
        <AddTodo 
          onItemAdded={this.addItem}
        />
      </div>
    );
  }
}

export default App;
