import React from 'react';
import FilterManager from './FilterManager.jsx';
import Project from './Project.jsx';

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
		this.deSelectAll = this.deSelectAll.bind(this);

		this.state = {
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
					key={proj.title}
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

	deSelectAll() {
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

	render() {
		return (
			<div id="ProjectComponent">
				<h3>Projects</h3>
				<FilterManager
					categories={CATEGORIES}
					handleCheckboxChange={this.handleCheckboxChange}
					filters={this.state.checkboxes}/>
			</div>
			)
	}

}

export default ProjectPage;