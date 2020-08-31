import React, { Component } from 'react';
import './add-todo.css';

export class AddTodo extends Component {

  constructor() {
    super();

    this.state = {
      name: ''
    }
  }

  handleInputChange = (e) => {
    this.setState({
      name: e.target.value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { onItemAdded } = this.props;

    if (!this.state.name) return;

    onItemAdded({
      id: Date.now(),
      name: this.state.name,
      complete: false,
      important: false
    });

    this.setState({
      name: ''
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="row panel">
          <div className="input-field">
            <i 
              className="material-icons prefix teal-text text-lighten-2"
            >create</i>
            <input 
              type="text" 
              placeholder="Item name"
              onChange={this.handleInputChange}
              value={this.state.name}
            />
          </div>
          <button 
            className="waves-effect waves-light btn"
          >Add</button>
        </div>
      </form>
    );
  }
}