import React from 'react';
import FilterManager from './FilterManager.jsx'

class ProjectPage extends React.Component {

	constructor(props){
		super(props);
		this.fetchProjects = this.fetchProjects.bind(this)
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
			console.log(data);
			// loop over each comment
			const newPosts = [];
			data.results.forEach((res) => {
				const newPost = (<Post
					logname={this.props.logname}
					url={res.url}
					key={res.postid}
					postid={res.postid}
				/>);
				newPosts.push(newPost);
			});
			this.setState(prevState => ({
				posts: prevState.posts.concat(newPosts),
			}));
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