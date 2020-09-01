import React from 'react';
import './search-panel.css';

export const SearchPanel = ({search, closePanel}) => {

  const handleSearch = (e) => search(e.target.value);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    closePanel();
  }
  
  return (
    <div className="overlay">
      <form 
        className="panel container" 
        onSubmit={handleSubmit}
      >
        <div className="input-field search">
            <i 
              className="material-icons prefix teal-text text-lighten-2"
            >search</i>
            <input 
              type="text" 
              placeholder="Search"
              onChange={handleSearch}
            />
        </div>
      </form>
    </div>
  );
}