import React from 'react';
import FilterManager from './FilterManager.jsx'; // eslint-disable-line
import Gallery from './Gallery.jsx'; // eslint-disable-line
import Project from './Project.jsx'; // eslint-disable-line
var classNames = require('classnames'); // eslint-disable-line

// TODO CHANGE get this from the data
const CATEGORIES = ['Web Development',
										'Optimization',
										'Graphic Design',
										'Interaction Design'];

class ProjectPage extends React.Component {

	constructor(props){
		super(props);
		this.fetchProjects = this.fetchProjects.bind(this)
		this.selectAllCheckboxes = this.selectAllCheckboxes.bind(this);
		this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
		this.selectAll = this.selectAll.bind(this);
		this.clearAll = this.clearAll.bind(this);
		this.handleFiltersToggle = this.handleFiltersToggle.bind(this);

		this.state = {
			"filtersOpen": false,
			"projects": [],
			// set all checkboxes to selected
			checkboxes: CATEGORIES.reduce(
			(options, option) => ({
				...options,
				// concat new key with previous version of 'options'
				[option]: true
				// start accumulator as empty object
			}), {})
		};
	}

	componentDidMount(){
		this.fetchProjects('./static/data/projects.json')
	}

	fetchProjects(fetchURL) {
		fetch(fetchURL, { credentials: 'same-origin' })
		.then((response) => {
			if (!response.ok) throw Error(response.statusText);
				return response.json();
		})
		.then((data) => {
			let projects = [];
			data.projects.forEach((proj) => {
				const newProj = (<Project
					key={proj.titleShort}
					{...proj}
				/>);
				projects.push(newProj);
			});
			this.setState({
				projects: projects,
			});
		})
		.catch(error => console.log(error)); // eslint-disable-line no-console
	}

	selectAllCheckboxes(isSelected) {
		// reset all checkboxes to isSelected value
		Object.keys(this.state.checkboxes).forEach(checkbox => {
			this.setState(prevState => ({
				checkboxes: {
					...prevState.checkboxes,
					[checkbox]: isSelected
				}
			}));
		});
	}

	selectAll() {
		this.selectAllCheckboxes(true);
	}

	clearAll() {
		this.selectAllCheckboxes(false);
	}

	handleCheckboxChange(e) {
		const name = e.target.value;

		this.setState(prevState => ({
			checkboxes: {
				...prevState.checkboxes,
				[name]: !prevState.checkboxes[name]
			}
		}));
	}

	handleFiltersToggle() {
		this.setState(prevState => ({
			filtersOpen: !prevState.filtersOpen
		}));
	}

	render() {
		const projects = this.state.projects;
		const galleryClass = classNames({'pushedDown': this.state.filtersOpen})
		return (
			<div id="ProjectComponent">
				<h3>Projects</h3>
				<FilterManager
					categories={CATEGORIES}
					handleCheckboxChange={this.handleCheckboxChange}
					filters={this.state.checkboxes}
					handleSelectAll={this.selectAll}
					handleClearAll={this.clearAll}
					handleFiltersToggle={this.handleFiltersToggle}/>
				<Gallery
					_className={galleryClass}
					pieces={projects}/>
			</div>
			)
	}

}

export default ProjectPage;