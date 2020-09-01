import React, { Component } from 'react';
import SearchPanel from '../search-panel';

export class TodoItemsFilter extends Component {
  
  constructor() {
    super();

    this.state = {
      searchPanel: false
    }
  }
  
  render() {
    const { filterItems, searchItems } = this.props;

    return (
      <div>
        <button 
          className="waves-effect waves-light btn light-blue lighten-1"
          onClick={() => filterItems('ALL')}
        >
          All
        </button>
        <button 
          className="waves-effect waves-light btn light-blue lighten-1"
          onClick={() => filterItems('COMPLETE')}
        >
          Complete
        </button>
        <button 
          className="waves-effect waves-light btn light-blue lighten-1"
          onClick={() => filterItems('IMPORTANT')}
        >
          Important
        </button>
        <div className="fixed-action-btn">
          <button 
            className="btn-floating btn-large light-blue lighten-1"
            onClick={() => this.setState(({searchPanel}) => ({ searchPanel: !searchPanel }))}
          >
            <i className="large material-icons">search</i>
          </button>
        </div>
        {
          this.state.searchPanel && <SearchPanel
            search={searchItems}
            closePanel={() => this.setState({ searchPanel: false })}
          />
        }
      </div>
    );
  }
}