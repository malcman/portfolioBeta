import React from 'react';
import FilterManager from './FilterManager';
import Gallery from './Gallery';
import Project from './Project';

const classNames = require('classnames');

// TODO CHANGE get this from the data
const CATEGORIES = [
  'Web Development',
  'Optimization',
  'Graphic Design',
  'Interaction Design',
];

class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.fetchProjects = this.fetchProjects.bind(this);
    this.selectAllCheckboxes = this.selectAllCheckboxes.bind(this);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.clearAll = this.clearAll.bind(this);
    this.handleFiltersToggle = this.handleFiltersToggle.bind(this);

    this.state = {
      filtersOpen: false,
      searchText: '',
      projects: [],
      // set all checkboxes to selected
      checkboxes: CATEGORIES.reduce(
        (options, option) => ({
          ...options,
          // concat new key with previous version of 'options'
          [option]: true,
        // start accumulator as empty object
        }), {}),
    };
  }

  componentDidMount() {
    this.fetchProjects('./static/data/projects.json');
  }

  fetchProjects(fetchURL) {
    fetch(fetchURL, { credentials: 'same-origin' })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((data) => {
        const projects = [];
        data.projects.forEach((proj) => {
          const newProj = (<Project
            key={proj.titleShort}
            {...proj}
          />);
          projects.push(newProj);
        });
        this.setState({
          projects,
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
    }));
  }

  render() {
    const projects = this.state.projects;
    const galleryClass = classNames({ pushedDown: this.state.filtersOpen });
    return (
      <div id="ProjectComponent">
        <h3>Projects</h3>
        <FilterManager
          categories={CATEGORIES}
          filters={this.state.checkboxes}
          filtersOpen={this.state.filtersOpen}
          handleCheckboxChange={this.handleCheckboxChange}
          handleSelectAll={this.selectAll}
          handleClearAll={this.clearAll}
          handleFiltersToggle={this.handleFiltersToggle}
          handleSearchTextChange={this.handleSearchTextChange}
        />
        <Gallery
          classsName={galleryClass}
          pieces={projects}
          searchText={this.state.searchText}
        />
      </div>
    );
  }
}

export default ProjectPage;
