import React from 'react';
import FilterManager from './FilterManager.jsx';
import Project from './Project.jsx';

class ProjectPage extends React.Component {

	constructor(props){
		super(props);
		this.fetchProjects = this.fetchProjects.bind(this)
		this.state = {"projects": []};
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

	render() {
		return (
			<div id="ProjectComponent">
				<h3>Projects</h3>
				<FilterManager/>
			</div>
			)
	}

}

export default ProjectPage;