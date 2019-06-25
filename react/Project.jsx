import React from 'react';
var classNames = require('classnames'); // eslint-disable-line

class Project extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			expanded: false,
		}
		this.getTags = this.getTags.bind(this);
		this.handleExpandToggle = this.handleExpandToggle.bind(this);
	}
	getTags() {
		// return an unorded list of all tags this project is associated with
		let tags = [];
		this.props.tags.forEach((tag) => {
			tags.push(<li key={tag}>{tag}</li>);
		});
		return (
			<ul className="projTags">
				{tags}
			</ul>
		);
	}

	handleExpandToggle(e) {
		e.preventDefault();
		this.setState(prevState => ({
			expanded: !prevState.expanded,
		}));
	}

	render() {
		const altText = this.props.titleShort + " cover image";
		const imgID = this.props.titleShort + "CoverIMG";
		const projClass = classNames('project', {'expanded': this.state.expanded});
		const tags = this.getTags();

		return (
			<div className={projClass} id={this.props.titleShort}>
				<div className="coverPhotoContainer">
					<img
						id={imgID}
						src={this.props.coverIMG}
						alt={altText}
						className="projCoverPhoto"/>
				</div>
				<h4 className="projTitle">{this.props.title}</h4>
				{tags}
				<p className="projDescription">{this.props.description}</p>
				<a
					href="#"
					className="projReadMore"
					onClick={this.handleExpandToggle}>Read More</a>
			</div>
		);
	}

}

export default Project;