import React from 'react';
import SearchBar from './SearchBar';
import FilterForm from './FilterForm';

const classNames = require('classnames');

class FilterManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
    };
    this.toggleFilterDisplay = this.toggleFilterDisplay.bind(this);
    // this.toggleSortDisplay = this.toggleSortDisplay.bind(this);
    this.getFilterButtonClass = this.getFilterButtonClass.bind(this);
  }

  getFilterButtonClass() {
    // get number of filters applied for visual affordances on filter button
    const numSelected = Object.values(this.props.filters).filter(Boolean).length;
    const numFilters = Object.values(this.props.filters).length;
    const filterClass = classNames({ filtersApplied: numSelected < numFilters });
    return filterClass;
  }

  toggleFilterDisplay(e) {
    e.preventDefault();
    this.props.handleFiltersToggle();
  }

  // toggleSortDisplay() {
  //
  // }

  render() {
    // hide or show the filters based on toggle
    const formDisplay = classNames({ shrinkToHide: !this.props.filtersOpen });

    // style button differently if filters are applied
    const filterClass = this.getFilterButtonClass();
    const sortDisplay = '';


    return (
      <div id="FilterManager">
        <div id="searchBar">
          <SearchBar
            filterText={this.state.filterText}
            onSearchTextChange={this.props.handleSearchTextChange}
          />

        </div>
        <div id="ManagmentButtons">
          <button
            id="FilterToggle"
            className={filterClass}
            onClick={this.toggleFilterDisplay}
          >
            Filter
          </button>
          <button
            id="SortToggle"
            onClick={this.toggleSortDisplay}
          >
            Sort
          </button>
        </div>
        <div className={formDisplay} id="FilterContainer">
          <FilterForm
            categories={this.props.categories}
            handleCheckboxChange={this.props.handleCheckboxChange}
            filters={this.props.filters}
            handleSelectAll={this.props.handleSelectAll}
            handleClearAll={this.props.handleClearAll}
          />
        </div>
        <div className={sortDisplay} id="SortContainer">
        </div>
      </div>
    );
  }
}

export default FilterManager;

