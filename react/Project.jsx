import React from 'react';
var classNames = require('classnames'); // eslint-disable-line

class Project extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			expanded: false,
			scrollPos: 0,
		}
		this.getTags = this.getTags.bind(this);
		this.handleExpandToggle = this.handleExpandToggle.bind(this);
		// this.handleScroll = this.handleScroll.bind(this);
		this.projRef = React.createRef();
	}
	componentDidMount(){
	}
	componentWillUnmount() {
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
		e.stopPropagation();
		// if the close button OR
		// whole project target w/o expanded view OR
		// desktop view and overlay was clicked
		if (e.currentTarget.className === 'projClose' ||
			!this.state.expanded ||
			(window.innerWidth >= 1000 && e.target.id === this.props.titleShort)) {
			this.setState(prevState => ({
				expanded: !prevState.expanded,
			}), () => {
				window.scrollTo(0, this.projRef.current.offsetTop, {behavior:'smooth'})
			});
		}
	}

	// handleScroll() {
	// 	const el = document.scrollingElement || document.documentElement;
	// 	const newScrollPos = el.scrollTop;
	// 	if (!this.state.expanded) {
	// 		this.setState({
	// 			scrollPos: newScrollPos
	// 		});
	// 	}
	// }

	render() {
		const altText = this.props.titleShort + " cover image";
		const imgID = this.props.titleShort + "CoverIMG";
		const projClass = classNames('project', {'expanded': this.state.expanded});
		const tags = this.getTags();

		return (
			<div
				id={this.props.titleShort}
				className={projClass}
				ref={this.projRef}
				onClick={this.handleExpandToggle}>
				<div className="projInfo">
					<div className="projClose"
						onClick={this.handleExpandToggle}>
						<div className="singleToggleLine negFortyFive"></div>
						<div className="singleToggleLine posFortyFive"></div>
					</div>
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
					<a className="projReadMore">Read More</a>
				</div>
			</div>
		);
	}

}

export default Project;