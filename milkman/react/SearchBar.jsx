// SearchBar.js
import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.keyHandler = this.keyHandler.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  keyHandler(e) {
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault();
      this.handleSearchTextChange(e);
    }
  }

  handleSearchTextChange(e) {
    this.props.onSearchTextChange(e.target.value);
  }

  render() {
    const filterText = this.props.filterText;

    return (
      <form id="searchForm" autoComplete="off">
        <input
          id="query"
          type="text"
          placeholder="Search Titles"
          autoComplete="off"
          value={filterText}
          onChange={this.handleSearchTextChange}
          onKeyDown={this.keyHandler}
        />
      </form>
    );
  }
}


export default SearchBar;
