import React from 'react';
import FilterManager from './FilterManager';
import Gallery from './Gallery';

const classNames = require('classnames');

class ArtPage extends React.Component {
  constructor(props) {
    super(props);
    this.fetchProjects = this.fetchProjects.bind(this);
  }

  componentDidMount() {
    this.fetchProjects('./static/data/projects.json');
  }

  fetchProjects(fetchURL) {
    const categories = [];
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

  render() {
    return (
      <div id="ArtContainer">
        <FilterManager />
        <Gallery />
      </div>
    );
  }
}

export default ArtPage;
