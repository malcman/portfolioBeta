import React from 'react';
import FilterManager from './FilterManager';
import Gallery from './Gallery';
import Project from './Project';

const classNames = require('classnames');

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.fetchProjects = this.fetchProjects.bind(this);
    this.selectAllCheckboxes = this.selectAllCheckboxes.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleFiltersToggle = this.handleFiltersToggle.bind(this);
    this.handleSortToggle = this.handleSortToggle.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.getActiveFilters = this.getActiveFilters.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.clearAll = this.clearAll.bind(this);

    this.state = {
      filtersOpen: false,
      sortsOpen: false,
      searchText: '',
      projects: [],
      // set all checkboxes to selected
      checkboxes: [].reduce(
        (options, option) => ({
          ...options,
          // concat new key with previous version of 'options'
          [option]: true,
        // start accumulator as empty object
        }), {}),

      currentSort: 'recent',
    };
  }

  componentDidMount() {
    this.fetchProjects('./static/data/projects.json');
  }

  fetchProjects(fetchURL) {
    this.categories = [];
    fetch(fetchURL, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        const projects = [];
        data.projects.forEach((proj) => {
          // add new project
          const newProj = (<Project
            key={proj.titleShort}
            {...proj}
          />);
          projects.push(newProj);
          // update list of all categories
          proj.tags.forEach((tag) => {
            if (this.categories.indexOf(tag) === -1) {
              this.categories.push(tag);
            }
          });
        });
        this.setState({
          projects,
          // set all checkboxes to selected
          checkboxes: this.categories.reduce(
            (options, option) => ({
              ...options,
              // concat new key with previous version of 'options'
              [option]: true,
            // start accumulator as empty object
            }), {}),
        });
      })
      .catch(error => console.log(error)); // eslint-disable-line no-console
  }

  selectAllCheckboxes(isSelected) {
    // reset all checkboxes to isSelected value
    Object.keys(this.state.checkboxes).forEach((checkbox) => {
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected,
        },
      }));
    });
  }

  selectAll() {
    this.selectAllCheckboxes(true);
  }

  clearAll() {
    this.selectAllCheckboxes(false);
  }

  handleSearchTextChange(searchText) {
    this.setState({
      searchText,
    });
  }

  handleCheckboxChange(e) {
    const name = e.target.value;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name],
      },
    }));
  }

  handleFiltersToggle() {
    this.setState(prevState => ({
      filtersOpen: !prevState.filtersOpen,
      sortsOpen: false,
    }));
  }

  handleSortToggle() {
    this.setState(prevState => ({
      sortsOpen: !prevState.sortsOpen,
      filtersOpen: false,
    }));
  }

  handleSortChange(currentSort, sortFunc) {
    this.setState({
      currentSort,
      projects: this.state.projects.sort(sortFunc),
    });
  }

  getActiveFilters() {
    const filters = [];
    Object.keys(this.state.checkboxes).forEach((box) => {
      if (this.state.checkboxes[box]) {
        filters.push(box);
      }
    });
    return filters;
  }

  render() {
    const projects = this.state.projects;
    const galleryClass = classNames({ pushedDown: this.state.filtersOpen || this.state.sortsOpen });
    const activeFilters = this.getActiveFilters();
    return (
      <div id="ProjectComponent">
        <h3>Projects</h3>
        <FilterManager
          categories={this.categories}
          filters={this.state.checkboxes}
          currentSort={this.state.currentSort}
          filtersOpen={this.state.filtersOpen}
          sortsOpen={this.state.sortsOpen}
          handleCheckboxChange={this.handleCheckboxChange}
          handleSelectAll={this.selectAll}
          handleClearAll={this.clearAll}
          handleFiltersToggle={this.handleFiltersToggle}
          handleSortToggle={this.handleSortToggle}
          handleSortChange={this.handleSortChange}
          handleSearchTextChange={this.handleSearchTextChange}
        />
        <Gallery
          classsName={galleryClass}
          pieces={projects}
          searchText={this.state.searchText}
          activeFilters={activeFilters}
          maxFilters={Object.keys(this.state.checkboxes).length}
        />
      </div>
    );
  }
}

export default ProjectPage;
