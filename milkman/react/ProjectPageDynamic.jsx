import React from 'react';
import FilterManager from './FilterManager';
import Gallery from './Gallery';
import Project from './Project';
import ArtPiece from './ArtPiece';

const classNames = require('classnames');

const sortFunctions = {
  recent: {
    func: (a, b) => {
      const aDate = new Date(a.props.date);
      const bDate = new Date(b.props.date);
      if (aDate > bDate) return -1;
      if (aDate < bDate) return 1;
      return 0;
    },
    displayName: 'Date: Recent',
  },
  oldest: {
    func: (a, b) => {
      const aDate = new Date(a.props.date);
      const bDate = new Date(b.props.date);
      if (aDate < bDate) return -1;
      if (aDate > bDate) return 1;
      return 0;
    },
    displayName: 'Date: Oldest',
  },
  alphaNormal: {
    func: (a, b) => {
      if (a.props.title < b.props.title) return -1;
      if (a.props.title > b.props.title) return 1;
      return 0;
    },
    displayName: 'A - Z',
  },
  alphaReverse: {
    func: (a, b) => {
      if (a.props.title > b.props.title) return -1;
      if (a.props.title < b.props.title) return 1;
      return 0;
    },
    displayName: 'Z - A',
  },
};

class ProjectPageDynamic extends React.Component {
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
    this.fetchProjects(this.props.dataFile);
  }

  fetchProjects(fetchURL) {
    const categories = [];
    const { components: Components } = this.props;

    fetch(fetchURL, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        const projects = [];
        // 'Piece' is dynamically defined component type (in data file),
        // allowing for parent component reuse
        const pieceType = data.head.componentType;
        data.projects.forEach((proj) => {
          // add new project
          const Piece = Components[pieceType];
          const newProj = (<Piece
            key={proj.titleShort}
            {...proj}
          />);
          projects.push(newProj);
          // update list of all categories
          proj.tags.forEach((tag) => {
            if (categories.indexOf(tag) === -1) {
              categories.push(tag);
            }
          });
        });
        // sort the projects now that they're loaded
        const currSort = this.state.currentSort;
        projects.sort(sortFunctions[currSort].func);
        this.setState({
          projects,
          // set all checkboxes to selected
          checkboxes: categories.reduce(
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
        <FilterManager
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

export default ProjectPageDynamic;
